import React, { Component } from 'react';
import { getSubjectDetails } from '../ActionCreators';
import Select from "react-select";
import Custome from './customeComponent';
import { Col, Row, Button, Form, FormGroup, Label} from 'reactstrap';
import DatePicker from 'react-datepicker';
import { WaveTopBottomLoading } from 'react-loadingg';
import localStorage from "local-storage";
import axios from 'axios';
import { saveAs } from 'file-saver';
import { baseUrl } from "../../url";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class Schema extends Component {
    constructor() {
        super();
        this.state = {
            selectedSubject: '',
            selectedType: '',
            subjects: [],
            isloading: false,
            my: '',
            mids: {
                month: new Date(),
                date: new Date(),
                start: '',
                end: ''
            },
            examOptions: [
                {
                    label: 'Mid 1',
                    value: 'mid1'
                }, {
                    label: 'Mid 2',
                    value: 'mid2'
                }, {
                    label: 'Semester',
                    value: 'sem'
                }, {
                    label: 'Custom',
                    value: 'custom'
                }
            ],

        }
        this.handleType = this.handleType.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.handleSchema = this.handleSchema.bind(this);
        this.getMid1 = this.getMid1.bind(this);
        this.getMid2 = this.getMid2.bind(this);
        this.getPdf = this.getPdf.bind(this);
        this.getSchema = this.getSchema.bind(this);

    }
    componentDidMount() {
        if (this.state.subjects.length === 0) {
            this.setState({ isloading: false });
            getSubjectDetails()
                .then((res) => res.json())
                .then((res) => {
                    var xs = []
                    res.forEach(element => {
                        xs.push({
                            'label': element.subject.name,
                            'value': element.subject.code,
                            'id': element._id,
                            'deptYear': element.subject.department.year,
                            'deptSem': element.subject.department.semester,
                        })
                    });
                    this.setState({ subjects: xs, isloading: false })
                })
                .catch((err) => {
                    this.setState({ isloading: false });
                    alert("Cannot Connect to Server!!!, Logging Out...");
                    localStorage.clear();
                    window.location.reload();
                });
        }
    }

    handleType(e) {
        this.setState({ selectedType: e });
    }
    handleSubject(e) {
        this.setState({ selectedSubject: e })
    }
    handleSubmit1(e) {
        e.preventDefault();
        if (this.state.selectedSubject === '' && this.state.selectedType === '') alert('Please Enter Required Details');
        else {
            var xs = { ...this.state.selectedSubject }
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            xs.year = this.state.my.getFullYear();
            xs.month = months[this.state.my.getMonth()];
            this.getPdf(xs)
        }
    }
    handleSubmit2() {
        var xs = { ...this.state.mids, ...this.state.selectedSubject };
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if (this.state.mids.date === '' || this.state.mids.month === '' || this.state.mids.start === '' || this.state.mids.end === '')
            alert('Please fill all the details');
        else {

            xs.year = xs.month.getFullYear();
            xs.month = months[xs.month.getMonth()];
            var dat = xs.date.getDate() < 10 ? '0' + xs.date.getDate() : xs.date.getDate();
            var mon = xs.date.getMonth() < 10 ? '0' + xs.date.getMonth() : xs.date.getMonth();
            xs.date = dat + '/' + mon + '/' + xs.date.getFullYear();


            var sm = xs.start.split(':')
            var mer1 = Number(sm[0]) >= 12 ? 'PM' : 'AM'
            var hour1 = Number(sm[0]) >= 12 ? (Number(sm[0]) % 12 || 12) : Number(sm[0]);
            hour1 = hour1 < 10 ? '0' + hour1 : hour1;
            xs.start = hour1 + ':' + sm[1] + ' ' + mer1;

            sm = xs.end.split(':');
            mer1 = Number(sm[0]) >= 12 ? 'PM' : 'AM';
            hour1 = Number(sm[0]) >= 12 ? (Number(sm[0]) % 12 || 12) : Number(sm[0]);
            hour1 = hour1 < 10 ? '0' + hour1 : hour1;
            xs.end = hour1 + ':' + sm[1] + ' ' + mer1;

            if (this.state.examtype === 'mid1')
                this.getMid1(xs);
            else
                this.getMid2(xs);
        }
    }

    handleSchema(sectionw) {
        var xs = { ...this.state.selectedSubject, ...sectionw };
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        xs.year = xs.my.getFullYear();
        xs.month = months[xs.my.getMonth()];
        this.getSchema(xs);
    }

    // Mid Details
    handleMonth(e) {
        this.setState({ mids: { ...this.state.mids, month: e } })
    }
    handleDate(e) {
        this.setState({ mids: { ...this.state.mids, date: e } });
    }
    handleStart(e) {
        console.log(e);
        this.setState({ mids: { ...this.state.mids, start: e } });
    }
    handleEnd(e) {
        console.log(e);
        this.setState({ mids: { ...this.state.mids, end: e } });
    }


    getMid1 = async (details) => {
        this.setState({ isloading: true });
        const bearer = 'Bearer ' + localStorage.get('token');
        const instance = axios.create({
            baseURL: baseUrl,
            timeout: 5000,
            headers: { 'Authorization': bearer },
            responseType: 'blob'
        });
        instance.post('/teacher/mid1', details)
            .then(response => {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
                let date_ob = new Date();
                var str = details.value + "_" + date_ob.getHours() + "_" + date_ob.getMinutes();
                saveAs(pdfBlob, str + '.pdf');
                this.setState({
                    isloading: false,
                    selectedSubject: "",
                    selectedType: "",
                    mids: {
                        month: '',
                        date: '',
                        start: '',
                        end: ''
                    }
                })
            })
            .catch((err) => {
                this.setState({ isloading: false });
                alert('Cannot Generate Paper, not enough Questions in Subject')
            });
    }

    getMid2 = async (details) => {
        this.setState({ isloading: true });
        const bearer = 'Bearer ' + localStorage.get('token');
        const instance = axios.create({
            baseURL: baseUrl,
            timeout: 5000,
            headers: { 'Authorization': bearer },
            responseType: 'blob'
        });
        instance.post('/teacher/mid2', details)
            .then(response => {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
                let date_ob = new Date();
                var str = details.value + "_" + date_ob.getHours() + "_" + date_ob.getMinutes();
                saveAs(pdfBlob, str + '.pdf');
                this.setState({
                    isloading: false,
                    selectedSubject: "",
                    selectedType: "",
                    mids: {
                        month: '',
                        date: '',
                        start: '',
                        end: ''
                    }
                })
            })
            .catch((err) => {
                this.setState({ isloading: false });
                alert('Cannot Generate Paper, not enough Questions in Subject')
            });
    }

    getPdf = async (details) => {
        this.setState({ isloading: true });
        const bearer = 'Bearer ' + localStorage.get('token');
        const instance = axios.create({
            baseURL: baseUrl,
            timeout: 5000,
            headers: { 'Authorization': bearer },
            responseType: 'blob'
        });
        instance.post('/teacher/semPaper', details)
            .then(response => {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
                let date_ob = new Date();
                var str = details.value + "_" + date_ob.getHours() + "_" + date_ob.getMinutes();
                saveAs(pdfBlob, str + '.pdf');
                this.setState({
                    isloading: false,
                    my: '',
                    selectedSubject: '',
                    selectedType: ''
                });
            })
            .catch((err) => {
                this.setState({ isloading: false });
                alert('Cannot Generate Paper, not enough Questions in Subject')
            }
            );
    }

    getSchema = async (details) => {
        this.setState({ isloading: true });
        const bearer = 'Bearer ' + localStorage.get('token');
        const instance = axios.create({
            baseURL: baseUrl,
            timeout: 10000,
            headers: { 'Authorization': bearer, },
            responseType: 'blob'
        });
        instance.post('/teacher/schema', details)
            .then(response => {
                const pdfBlob = new Blob([response.data], { type: 'application/pdf' })
                let date_ob = new Date();
                var str = details.value + "_" + date_ob.getHours() + "_" + date_ob.getMinutes();
                saveAs(pdfBlob, str + '.pdf');
                this.setState({
                    selectedSubject: "",
                    selectedType: "",
                    isloading: false
                })
            })
            .catch((err) => {
                this.setState({ isloading: false });
                alert('Cannot Generate Paper, not enough Questions in Subject')
            });
    }

    handleMonth1(e) {
        this.setState({ my: e })
    }

    render() {
        if (this.state.isloading) {
            return (
                <WaveTopBottomLoading />
            )
        }
        else {
            var value = <div></div>;
            if (this.state.selectedSubject === '' || this.state.selectedType === '')
                value = <div></div>;
            else if (this.state.selectedType.value === 'sem' && this.state.selectedSubject !== '') {
                value = <div style={{ marginTop: "3%" }}>
                    <Form onSubmit={(e) => this.handleSubmit1(e)}>
                        <FormGroup>
                            <Label for="my">Month and Year:</Label><br />
                            <DatePicker
                                required
                                selected={this.state.my}
                                onChange={date => this.handleMonth1(date)}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                            />
                        </FormGroup>
                        <Button role="submit" color="primary" style={{ margin: "7px" }}>
                            Submit
                        </Button>
                    </Form>
                </div>
            }
            else if (this.state.selectedType.value === 'custom' && this.state.selectedSubject !== '') {
                value = <Custome handleSchema={this.handleSchema} subject={this.state.selectedSubject} />
            }
            else {
                value =
                    <div style={{ margin: "30px" }}>
                        <Form onSubmit={() => this.handleSubmit2()}>
                            <FormGroup>
                                <Label for="exampleEmail">Select Month and Year of Semester</Label><br />
                                <DatePicker
                                    required
                                    selected={this.state.mids.month}
                                    onChange={date => this.handleMonth(date)}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleAddress">Date of Exam</Label><br />
                                <DatePicker
                                    required
                                    selected={this.state.mids.date}
                                    onChange={date => this.handleDate(date)}
                                />
                            </FormGroup>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="starttime">Start Time</Label><br />
                                        <TimePicker
                                            name="starttime"
                                            id="starttime"
                                            onChange={(e) => this.handleStart(e)}
                                            value={this.state.mids.start}
                                            clockIcon={null}
                                            disableClock={true}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="endtime">End time</Label><br />
                                        <TimePicker
                                            name="endtime"
                                            id="endtime"
                                            onChange={(e) => this.handleEnd(e)}
                                            value={this.state.mids.end}
                                            clockIcon={null}
                                            disableClock={true}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button role="submit" color="primary" style={{ margin: "7px" }} onClick={(e) => this.handleSubmit2(e)}>
                                Submit
                        </Button>
                        </Form>
                    </div>
            }
            return (
                <div style={{ width: "80%", margin: "3% auto" }}>
                    <label>Select Subject</label>
                    <Select name="subject" options={this.state.subjects}
                        onChange={(e) => this.handleSubject(e)}
                        value={this.state.selectedSubject}
                        onMenuOpen={() => this.setState({ selectedSubject: "" })}
                    />
                    <label> Select Exam Type</label>
                    <Select name="exam" options={this.state.examOptions}
                        onChange={(e) => this.handleType(e)}
                        value={this.state.selectedType}
                        onMenuOpen={() => this.setState({
                            selectedType: ""
                        })}
                    />
                    {value}
                </div>
            )
        }
    }
}

export default Schema;