import React, { Component } from 'react';
import { getSubjectDetails, getPdf, getMid1, getMid2 } from '../../redux/ActionCreators';
import Select from "react-select";
import { Col, Row, Button, Form, FormGroup, Label } from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';


class Schema extends Component {
    constructor() {
        super();
        this.state = {
            subjects: [],
            selected: {},
            data: "",
            examtype: "sem",
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
    }
    componentDidMount() {
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
                this.setState({ subjects: xs })
            })
            .catch((err) => alert(err));
    }
    handleType(e) {
        this.setState({ examtype: e.value });
    }
    handleSubject(e) {
        this.setState({ selected: e })
    }
    handleSubmit1() {
        if (Object.keys(this.state.selected).length === 0) alert('Please Enter Required Details');
        getPdf(this.state.selected)
    }
    handleSubmit2() {
        var xs = { ...this.state.selected };
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        try {
            xs.year = xs.month.getFullYear();
            xs.month = months[xs.month.getMonth()];
            xs.date = xs.date.getDate() + '/' + xs.date.getMonth() + '/' + xs.date.getFullYear();
            xs.starttime = xs.starttime.getHours() + ':' + xs.starttime.getMinutes();
            xs.endtime = xs.endtime.getHours() + ':' + xs.endtime.getMinutes();
            console.log(xs);
            if (this.state.examtype === 'mid1') getMid1(xs);
            else getMid2(xs);
            this.setState({
                selected: {},
                data: "",
                examtype: "sem",
            })
        }catch (err) {
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
        this.setState({ selected: { ...this.state.selected, starttime: e } });
    }
    handleEnd(e) {
        this.setState({ selected: { ...this.state.selected, endtime: e } });
    }


    render() {
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
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleEmail">Start Time</Label><br />
                                    <DatePicker
                                        required={true}
                                        selected={this.state.selected.starttime}
                                        onChange={date => this.handleStart(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="examplePassword">End time</Label><br />
                                    <DatePicker
                                        required={true}
                                        selected={this.state.selected.endtime}
                                        onChange={date => this.handleEnd(date)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
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
            <div>
                <label> Select Exam Type</label>
                <Select name="exam" options={this.state.examOptions} 
                    onChange={(e) => this.handleType(e)} required
                />
                <label>Select Subject</label>
                <Select name="subject" options={this.state.subjects}
                    onChange={(e) => this.handleSubject(e)} required 
                />
                {value}
            </div>
        )
    }
}

export default Schema;