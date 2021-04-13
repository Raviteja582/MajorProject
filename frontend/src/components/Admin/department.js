import React, { Component } from 'react';
import { UncontrolledCollapse, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';
import { WaveLoading } from 'react-loadingg';
import { addDepartment, removeDepartment, getDepartment } from '../ActionCreators';
import localStorage from 'local-storage';

class Department extends Component {
    constructor() {
        super();
        this.state = {
            add: {
                dname: '',
                dvalue: '',
            },
            remove: {
                dname: '',
                dvalue: ''
            },
            departmentList: [],
            isLoading: false,
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.addDepartments = this.addDepartments.bind(this);
        this.removeDeparments = this.removeDeparments.bind(this);
        this.getDepartments = this.getDepartments.bind(this);
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
    handleRemove(e) {
        this.setState((prevState) => ({
            ...prevState,
            remove: {
                ...prevState.remove,
                [e.target.name]: e.target.value
            }
        }));
    }

    addDepartments(e) {
        e.preventDefault();
        var xs = []
        for (var i = 1; i <= 4; i++) {
            for (var j = 1; j <= 2; j++) {
                xs.push({
                    'name': this.state.add.dname,
                    'value': this.state.add.dvalue,
                    'year': i,
                    'semester': j,
                })
            }
        }
        this.setState({ isLoading: true });
        addDepartment(xs)
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    alert('Success');
                    this.setState((prevState) => ({
                        ...prevState,
                        add: {
                            dname: '',
                            dvalue: ''
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

    removeDeparments(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        removeDepartment(this.state.remove)
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    alert('Success');
                    this.setState((prevState) => ({
                        ...prevState,
                        remove: {
                            dname: '',
                            dvalue: ''
                        },
                        isLoading: false
                    }));
                } else {
                    this.setState({
                        isLoading: false,
                    })
                    alert('Cannot Find The Department with name and Value');
                }
            }).catch((err) => {
                alert('Please Login and Logout');
                localStorage.clear();
                window.location.reload();
            })
    }

    getDepartments(e) {
        e.preventDefault();
        if (this.state.departmentList.length !== 0) {
            this.setState({ departmentList: [] })
        }
        else {
            this.setState({ isLoading: true });
            getDepartment()
                .then((resp) => resp.json())
                .then((res) => {
                    if (res.success) {
                        this.setState((prevState) => ({
                            ...prevState,
                            departmentList: res.list,
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
                            Add a new Department
                    </Button>
                        <UncontrolledCollapse toggler="#add">
                            <Form onSubmit={(e) => this.addDepartments(e)}>
                                <FormGroup>
                                    <Label for="dname">Name</Label>
                                    <Input type="text"
                                        name="dname"
                                        id="dvalue"
                                        placeholder="Department Name"
                                        value={this.state.add.dname}
                                        onChange={(e) => this.handleAdd(e)}
                                        required={true}
                                    />
                                    <FormText color="muted">
                                        Eg: Computer Science and Engineering
                                </FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dvalue">Code</Label>
                                    <Input type="text"
                                        name="dvalue"
                                        id="dvalue"
                                        placeholder="Department Code"
                                        value={this.state.add.dvalue}
                                        onChange={(e) => this.handleAdd(e)}
                                        required={true}
                                    />
                                    <FormText color="muted">
                                        Eg: CSE
                                </FormText>
                                </FormGroup>
                                <Button role="submit" color="primary" style={{ marginLeft: '40%', marginBottom: '20px' }}>Submit</Button>
                            </Form>
                        </UncontrolledCollapse>
                    </div>
                    <div >
                        <Button block id="remove" color="danger" style={{ marginBottom: '1rem' }}>
                            Remove a Department
                    </Button>
                        <UncontrolledCollapse toggler="#remove">
                            <Form onSubmit={(e) => this.removeDeparments(e)}>
                                <FormGroup>
                                    <Label for="dname">Name</Label>
                                    <Input type="text"
                                        name="dname"
                                        id="dvalue"
                                        placeholder="Department Name"
                                        value={this.state.remove.dname}
                                        onChange={(e) => this.handleRemove(e)}
                                        required={true}
                                    />
                                    <FormText color="muted">
                                        Eg: Computer Science and Engineering
                                </FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dvalue">Code</Label>
                                    <Input type="text"
                                        name="dvalue"
                                        id="dvalue"
                                        placeholder="Department Code"
                                        value={this.state.remove.dvalue}
                                        onChange={(e) => this.handleRemove(e)}
                                        required={true}
                                    />
                                    <FormText color="muted">
                                        Eg: CSE
                                </FormText>
                                </FormGroup>
                                <Button role="submit" color="danger" style={{ marginLeft: '40%', marginBottom: '20px' }}>Remove</Button>
                            </Form>
                        </UncontrolledCollapse>
                    </div>
                    <div >
                        <Button block color="info" style={{ marginBottom: '1rem' }} onClick={(e) => this.getDepartments(e)}>
                            List all the Departments
                        </Button>
                        <ListGroup >
                            {
                                this.state.departmentList.map((ele, ind) => {
                                    return (
                                        <ListGroupItem key={ind}>{ele}</ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>
                    </div>
                </div >
            );
    }
}

export default Department;