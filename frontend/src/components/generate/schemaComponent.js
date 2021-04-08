import React, { Component } from 'react';
import { getSubjectDetails } from '../ActionCreators';
import Select from "react-select";
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import { WaveTopBottomLoading } from 'react-loadingg';
import localStorage from "local-storage";
import axios from 'axios';
import { saveAs } from 'file-saver';
import { baseUrl } from "../../url";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class Schema extends Component {
    constructor() {
        super();
        this.state = {
            subjects: [],
            isloading: false,
            selected: "",
            data: "",
            examtype: "sem",
            dummyExamType: "",
            examOptions: [
                {
                    label: 'Semester',
                    value: 'sem'
                }, {
                    label: 'Mid 1',
                    value: 'mid1'
                }, {
                    label: 'Mid 2',
                    value: 'mid2'
                }
            ],
            month: [
                'January'
            ]
        }
        this.handleType = this.handleType.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleMonth = this.handleMonth.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleEnd = this.handleEnd.bind(this);
        this.getMid1 = this.getMid1.bind(this);
        this.getMid2 = this.getMid2.bind(this);
        this.getPdf = this.getPdf.bind(this);
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
                .catch((err) => alert('Please Logout and Login once again'));
        }
    }
    handleType(e) {
        this.setState({ examtype: e.value, dummyExamType: e });
    }
    handleSubject(e) {
        this.setState({ selected: e })
    }
    handleSubmit1() {
        if (Object.keys(this.state.selected).length === 0) alert('Please Enter Required Details');
        this.getPdf(this.state.selected)
        this.setState({
            selected: "",
            dummyExamType: "",
            data: "",
            examtype: "sem",
        })
    }
    handleSubmit2() {
        var xs = { ...this.state.selected };
        // console.log(xs);
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        try {

            xs.year = xs.month.getFullYear();
            xs.month = months[xs.month.getMonth()];
            var dat = xs.date.getDate() < 10 ? '0' + xs.date.getDate() : xs.date.getDate();
            var mon = xs.date.getMonth() < 10 ? '0' + xs.date.getMonth() : xs.date.getMonth();
            xs.date = dat + '/' + mon + '/' + xs.date.getFullYear();


            var sm = xs.starttime.split(':')
            var mer1 = Number(sm[0]) >= 12 ? 'PM' : 'AM'
            var hour1 = Number(sm[0]) >= 12 ? (Number(sm[0]) % 12 || 12) : Number(sm[0]);
            hour1 = hour1 < 10 ? '0' + hour1 : hour1;
            xs.starttime = hour1 + ':' + sm[1] + ' ' + mer1;

            sm = xs.endtime.split(':');
            mer1 = Number(sm[0]) >= 12 ? 'PM' : 'AM';
            hour1 = Number(sm[0]) >= 12 ? (Number(sm[0]) % 12 || 12) : sm[0];
            hour1 = hour1 < 10 ? '0' + hour1 : hour1;
            xs.endtime = hour1 + ':' + sm[1] + ' ' + mer1;

            if (this.state.examtype === 'mid1') 
                this.getMid1(xs);
            else
                this.getMid2(xs);
            
            this.setState({
                selected: "",
                dummyExamType: "",
                data: "",
                examtype: "sem",
            })
        } catch (err) {
            alert(err);
        }
    }

    // Mid Details
    handleMonth(e) {
        this.setState({ selected: { ...this.state.selected, month: e } })
    }
    handleDate(e) {
        this.setState({ selected: { ...this.state.selected, date: e } });
    }
    handleStart(e) {
        this.setState({ selected: { ...this.state.selected, starttime: e.target.value } });
    }
    handleEnd(e) {
        this.setState({ selected: { ...this.state.selected, endtime: e.target.value } });
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
                this.setState({ isloading: false });
            })
            .catch((err) => alert('Cannot Generate, not enough Questions'));
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
                this.setState({ isloading: false });
            })
            .catch((err) => {
                alert('Cannot Generate, not enough Questions')
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
                this.setState({ isloading: false });
            })
            .catch((err) => alert('Cannot Generate, not enough Questions'));
    }


    render() {
        if (this.state.isloading) {
            return (
                <WaveTopBottomLoading />
            )
        }
        else {
            var value = "";
            if (this.state.examtype === 'sem') {
                value = <Button role="submit" color="primary" style={{ margin: "7px" }} onClick={() => this.handleSubmit1()}>
                    Submit
                        </Button>;
            }
            else {
                value =
                    <div style={{ margin: "30px" }}>
                        <Form onSubmit={() => this.handleSubmit2()}>
                            <FormGroup>
                                <Label for="exampleEmail">Select Month and Year of Semester</Label><br />
                                <DatePicker
                                    required
                                    selected={this.state.selected.month}
                                    onChange={date => this.handleMonth(date)}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleAddress">Date of Exam</Label><br />
                                <DatePicker required selected={this.state.selected.date} onChange={date => this.handleDate(date)} />
                            </FormGroup>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="exampleEmail">Start Time</Label><br />
                                        <Input
                                            type="time"
                                            name="time"
                                            id="exampleTime"
                                            placeholder="time placeholder"
                                            onChange={(e) => this.handleStart(e)}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="examplePassword">End time</Label><br />
                                        <Input
                                            type="time"
                                            name="time"
                                            id="exampleTime"
                                            placeholder="time placeholder"
                                            onChange={(e) => this.handleEnd(e)}
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
                <div style={{ width: "80%", margin: "20px auto" }}>
                    <label> Select Exam Type</label>
                    <Select name="exam" options={this.state.examOptions}
                        onChange={(e) => this.handleType(e)} required
                        value={this.state.dummyExamType}
                        onMenuOpen={() => this.setState({
                            dummyExamType: ""
                        })}
                    />
                    <label>Select Subject</label>
                    <Select name="subject" options={this.state.subjects}
                        onChange={(e) => this.handleSubject(e)} required
                        value={this.state.selected}
                        onMenuOpen={() => this.setState({ selected: "" })}
                    />
                    {value}
                </div>
            )
        }
    }
}

export default Schema;