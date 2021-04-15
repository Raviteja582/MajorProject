import React, { Component } from 'react';
import { UncontrolledCollapse, Button, Form, FormGroup, Label, Input, FormText, Row, Col, Table } from 'reactstrap';
import { WaveLoading } from 'react-loadingg';
import { getDepartment, addSubject, removeSubject, getSubjects } from '../ActionCreators';
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
            removeCode: '',
            departmentList: [],
            subjectList: [],
            ldept: '',
            lyear: '',
            lsem: '',
            lcode: '',
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
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSemester = this.handleSemester.bind(this);
        this.handleYear = this.handleYear.bind(this);
        this.addSubjects = this.addSubjects.bind(this);
        this.ListSubjects = this.ListSubjects.bind(this);
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

    handleRemove(e) {
        this.setState({ removeCode: e.target.value });
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

    handleLDept(e) {
        this.setState({ ldept: e });
    }

    handleLyear(e) {
        this.setState({ lyear: e });
    }

    handleLsem(e) {
        this.setState({ lsem: e });
    }

    handleLcode(e) {
        this.setState({ lcode: e.target.value });
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

    removeSubjects(e) {
        e.preventDefault();
        if (this.state.removeCode === '') alert('Please Input Subject Code');
        else {
            this.setState({ isLoading: true });
            removeSubject({ id: this.state.removeCode })
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        alert('Success');
                        this.setState({
                            isLoading: false,
                            removeCode: ''
                        })
                    }
                    else {
                        this.setState({
                            isLoading: false,
                        })
                        alert('Cannot find the Subject with Given Code.');
                    }
                }).catch((err) => {
                    alert('Please Login and Logout');
                    localStorage.clear();
                    window.location.reload();
                })
        }

    }

    ListSubjects(e) {
        e.preventDefault();
        if (this.state.ldept === '' && this.state.lyear === '' && this.state.lcode === '') alert('Please Enter Department and Year or code');
        else {
            this.setState({ isLoading: true });
            getSubjects({
                name: this.state.ldept.value,
                year: this.state.lyear.value,
                sem: this.state.lsem.value,
                code: this.state.lcode,
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        this.setState({ ldept: '', lsem: '', lyear: '', lcode: '', subjectList: res.list, isLoading: false })
                    }
                    else {
                        alert('Cannot Find Subject With Given Code');
                        this.setState({ isLoading: false, subjectList: [] });
                    }
                }).catch((err) => {
                    console.log(err);
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
                                        Eg: A21AB
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
                    <div >
                        <Button block color="danger" id="remove" style={{ marginBottom: '1rem' }}>
                            Remove a Subject
                        </Button>
                        <UncontrolledCollapse toggler="#remove">
                            <Form onSubmit={(e) => this.removeSubjects(e)}>
                                <FormGroup>
                                    <Label for="scode">Enter Subject Code: </Label>
                                    <Input type="text"
                                        name="scode"
                                        id="scode"
                                        placeholder="Subject Code"
                                        value={this.state.removeCode}
                                        onChange={(e) => this.handleRemove(e)}
                                        required={true}
                                    />
                                    <FormText color="muted">
                                        Eg: A21AB
                                    </FormText>
                                </FormGroup>
                                <Button role="submit" color="danger" style={{ marginLeft: '40%', marginBottom: '20px' }}>Remove</Button>
                            </Form>
                        </UncontrolledCollapse>
                    </div>
                    <div >
                        <Button block color="info" id="list" style={{ marginBottom: '1rem' }}>
                            List all Subjects in Department
                        </Button>
                        <UncontrolledCollapse toggler="#list">
                            <Form onSubmit={(e) => this.ListSubjects(e)}>
                                <Row>
                                    <Col>
                                        <FormGroup style={{ margin: "3% auto" }}>
                                            <Label>Select Department</Label><br />
                                            <Select options={this.state.departmentList}
                                                onChange={(e) => this.handleLDept(e)}
                                                placeholder="Select Department"
                                                value={this.state.ldept}
                                                onMenuOpen={() => this.setState({ ldept: '' })}
                                            />
                                        </FormGroup>

                                    </Col>
                                    <Col>
                                        <FormGroup style={{ margin: "3% auto" }}>
                                            <Label>Select Year</Label><br />
                                            <Select options={this.state.years}
                                                onChange={(e) => this.handleLyear(e)}
                                                placeholder="Select Year"
                                                value={this.state.lyear}
                                                onMenuOpen={() => this.setState({ lyear: '' })}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup style={{ margin: "3% auto" }}>
                                            <Label>Select Semester</Label><br />
                                            <Select options={this.state.semesters}
                                                onChange={(e) => this.handleLsem(e)}
                                                placeholder="Select Semester"
                                                value={this.state.lsem}
                                                onMenuOpen={() => this.setState({ lsem: '' })}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <h3 style={{ marginLeft: '40%', marginBottom: '20px' }}>OR</h3>
                                <FormGroup>
                                    <Label for="scode">Code</Label>
                                    <Input type="text"
                                        name="scode"
                                        id="scode"
                                        placeholder="Subject Code"
                                        value={this.state.lcode}
                                        onChange={(e) => this.handleLcode(e)}

                                    />
                                    <FormText color="muted">
                                        Eg: A21AB
                                    </FormText>
                                </FormGroup>
                                <Button role="submit" color="info" style={{ marginLeft: '40%', marginBottom: '20px' }}>Submit</Button>
                            </Form>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Name</th>
                                        <th>Code</th>
                                        <th>Department</th>
                                        <th>Year</th>
                                        <th>Semester</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.subjectList.map((ele, ind) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{ind + 1}</th>
                                                    <td>{ele.sname}</td>
                                                    <td>{ele.scode}</td>
                                                    <td>{ele.dname}</td>
                                                    <td>{ele.year}</td>
                                                    <td>{ele.sem}</td>
                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </Table>
                        </UncontrolledCollapse>
                    </div>
                </div>
            );
    }
}

export default Subject;