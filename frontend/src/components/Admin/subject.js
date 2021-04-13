import React, { Component } from 'react';
import { UncontrolledCollapse, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { WaveLoading } from 'react-loadingg';
import { getDepartment, addSubject } from '../ActionCreators';
import localStorage from 'local-storage';
import Select from 'react-select';

class Subject extends Component {
    constructor() {
        super();
        this.state = {
            add: {
                sname: '',
                scode: '',
                year: '',
                semester: '',
                department: ''
            },
            departmentList: [],
            isLoading: false,
            years: [
                { 'label': 'I', value: '1' },
                { 'label': 'II', value: '2' },
                { 'label': 'III', value: '3' },
                { 'label': 'IV', value: '4' }
            ],
            semesters: [
                { 'label': 'I', value: '1' },
                { 'label': 'II', value: '2' },
            ],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSemester = this.handleSemester.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.addSubjects = this.addSubjects.bind(this);
    }

    componentDidMount() {
        if (this.state.departmentList.length !== 0) {
            this.setState({ departmentList: [] })
        }
        else {
            this.setState({ isLoading: true });
            getDepartment()
                .then((resp) => resp.json())
                .then((res) => {
                    if (res.success) {
                        var xs = []
                        res.list.forEach(element => {
                            xs.push({
                                label: element,
                                value: element
                            })
                        });
                        this.setState((prevState) => ({
                            ...prevState,
                            departmentList: xs,
                            isLoading: false
                        }));
                    } else {
                        this.setState({
                            isLoading: false,
                        })
                        alert('Failure');
                    }
                }).catch((err) => {
                    alert('Please Login and Logout');
                    localStorage.clear();
                    window.location.reload();
                })
        }
    }

    handleAdd(e) {
        this.setState((prevState) => ({
            ...prevState,
            add: {
                ...prevState.add,
                [e.target.name]: e.target.value
            }
        }));
    }

    handleYear(e) {
        this.setState((prevState) => ({
            ...prevState,
            add: {
                ...prevState.add,
                year: e
            }
        }));
    }

    handleDepartment(e) {
        this.setState((prevState) => ({
            ...prevState,
            add: {
                ...prevState.add,
                department: e
            }
        }));
    }

    handleSemester(e) {
        this.setState((prevState) => ({
            ...prevState,
            add: {
                ...prevState.add,
                semester: e
            }
        }));
    }

    addSubjects(e) {
        e.preventDefault();
        if (this.state.add.scode === '' ||
            this.state.add.sname === '' ||
            this.state.add.semester === '' ||
            this.state.add.year === '' ||
            this.state.add.department === ''
        )
            alert('Please enter all the details');
        else {
            this.setState({ isLoading: true });
            addSubject(this.state.add)
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        alert('Success');
                        this.setState((prevState) => ({
                            ...prevState,
                            add: {
                                sname: '',
                                scode: '',
                                year: '',
                                semester: '',
                                department: ''
                            },
                            isLoading: false
                        }));
                    } else {
                        this.setState({
                            isLoading: false,
                        })
                        alert('UnAuthorized');
                        localStorage.clear();
                        window.location.reload();
                    }
                }).catch((err) => {
                    alert('Please Login and Logout');
                    localStorage.clear();
                    window.location.reload();
                })
        }
    }


    render() {
        if (this.state.isLoading) {
            return (
                <WaveLoading />
            )
        }
        else
            return (
                <div style={{ width: '50%', margin: '1em auto' }}>
                    <div >
                        <Button block color="success" id="add" style={{ marginBottom: '1rem' }}>
                            Add a new Subject
                        </Button>
                        <UncontrolledCollapse toggler="#add">
                            <Form onSubmit={(e) => this.addSubjects(e)}>
                                <FormGroup>
                                    <Label for="sname">Name</Label>
                                    <Input type="text"
                                        name="sname"
                                        id="sname"
                                        placeholder="Subject Name"
                                        value={this.state.add.sname}
                                        onChange={(e) => this.handleAdd(e)}
                                        required={true}
                                    />
                                    <FormText color="muted">
                                        Eg: Mathematics-I
                                </FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="scode">Code</Label>
                                    <Input type="text"
                                        name="scode"
                                        id="scode"
                                        placeholder="Subject Code"
                                        value={this.state.add.scode}
                                        onChange={(e) => this.handleAdd(e)}
                                        required={true}
                                    />
                                    <FormText color="muted">
                                        Eg: MI
                                    </FormText>
                                </FormGroup>
                                <FormGroup style={{ margin: "3% auto" }}>
                                    <Label>Select Department</Label><br />
                                    <Select options={this.state.departmentList}
                                        onChange={(e) => this.handleDepartment(e)}
                                        placeholder="Select Department"
                                        value={this.state.add.department}
                                        onMenuOpen={() => this.setState((prevState) => ({
                                            ...prevState,
                                            add: {
                                                ...prevState.add,
                                                department: ''
                                            }
                                        })
                                        )}
                                    />
                                </FormGroup>
                                <FormGroup style={{ margin: "3% auto" }}>
                                    <Label>Select Year</Label><br />
                                    <Select options={this.state.years}
                                        onChange={(e) => this.handleYear(e)}
                                        placeholder="Select Year"
                                        value={this.state.add.year}
                                        onMenuOpen={() => this.setState((prevState) => ({
                                            ...prevState,
                                            add: {
                                                ...prevState.add,
                                                year: ''
                                            }
                                        })
                                        )}
                                    />
                                </FormGroup>
                                <FormGroup style={{ margin: "3% auto" }}>
                                    <Label>Select Semester</Label><br />
                                    <Select options={this.state.semesters}
                                        onChange={(e) => this.handleSemester(e)}
                                        placeholder="Select Semester"
                                        value={this.state.add.semester}
                                        onMenuOpen={() => this.setState((prevState) => ({
                                            ...prevState,
                                            add: {
                                                ...prevState.add,
                                                semester: ''
                                            }
                                        })
                                        )
                                        }
                                    />
                                </FormGroup>
                                <Button role="submit" color="primary" style={{ marginLeft: '40%', marginBottom: '20px' }}>Submit</Button>
                            </Form>
                        </UncontrolledCollapse>
                    </div>
                </div>
            );
    }
}

export default Subject;