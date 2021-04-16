import React, { Component } from 'react';
import { getProfile, updateProfile } from './ActionCreators';
import { WaveTopBottomLoading } from 'react-loadingg';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import localStorage from 'local-storage';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                firstname: '',
                lastname: '',
                phno: '',
                dob: '',
                username: ''
            },
            updated: {
                firstname: '',
                lastname: '',
                phno: '',
                dob: '',
                username: '',
                password: '',
                rewrite: ''
            },
            isLoading: false,
            isDisabled: true,
            isUpdate: false,
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    componentDidMount() {
        if (this.state.user.firstname === '') {
            this.setState({ isLoading: true });
            getProfile()
                .then((res) => res.json())
                .then((user) => {
                    this.setState({ user: user, updated: user, isLoading: false });
                })
                .catch((err) => {
                    this.setState({ isLoading: false });
                    alert('Cannot Find Details');
                })
        }
    }

    handleUpdate() {
        this.setState({ isDisabled: !this.state.isDisabled, isUpdate: !this.state.isUpdate });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password === this.state.rewrite) {
            this.setState({ isLoading: true });
            updateProfile(this.state.updated)
                .then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        if (this.state.user.username !== this.state.updated.username) {
                            alert('Logging out....');
                            localStorage.clear();
                            window.location.reload();
                        }
                        this.setState({ user: res.user, updated: res.user, isLoading: false });
                        this.handleUpdate();
                    } else {
                        alert("Please Give valid Email address or else don't change");
                    }
                }).catch((err) => {
                    alert('Failure!!!!');
                    localStorage.clear();
                    window.location.reload();
                })
        } else {
            this.setState({ password: "", rewrite: "" });
            alert("Both Password Field's should be match");
        }
    }

    handleInput(e) {
        this.setState((prev) => ({
            ...prev,
            updated: {
                ...prev.updated,
                [e.target.name]: e.target.value
            }
        }));
    }

    render() {
        if (this.state.isLoading) {
            return (
                <WaveTopBottomLoading />
            )
        }
        else if (this.state.isDisabled) {

            return (
                <Form style={{ width: "95%", margin: "5px auto", padding: "2%" }}>
                    <h3 style={{ color: "blue", marginLeft: "40%" }}>
                        Profile
                        </h3>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="firstname">First Name</Label>
                                <Input type="text"
                                    name="firstname"
                                    value={this.state.user.firstname}
                                    disabled={this.state.isDisabled}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="lastname">Last Name</Label>
                                <Input type="text"
                                    name="lastname"
                                    value={this.state.user.lastname}
                                    disabled={this.state.isDisabled}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email"
                            name="email"
                            value={this.state.user.username}
                            disabled={this.state.isDisabled}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phno">Phno Number</Label>
                        <Input type="text"
                            name="phno"
                            value={this.state.user.phno}
                            disabled={this.state.isDisabled}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input
                            type="date"
                            name="dob"
                            value={this.state.user.dob}
                            disabled={this.state.isDisabled}
                        />
                    </FormGroup>
                    <Button color="primary" style={{ margin: "0px 40%" }} onClick={() => this.handleUpdate()}>Update</Button>
                </Form>
            )
        }
        else {
            return (
                <Form onSubmit={this.handleSubmit} style={{ width: "95%", margin: "5px auto", padding: "2%" }}>
                    <h3 style={{ color: "blue", marginLeft: "40%" }}>
                        Profile
                        </h3>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="firstname">First Name</Label>
                                <Input type="text"
                                    name="firstname"
                                    value={this.state.updated.firstname}
                                    onChange={(e) => this.handleInput(e)}
                                    placeholder="First Name"
                                    autoComplete="off"
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="lastname">Last Name</Label>
                                <Input type="text"
                                    name="lastname"
                                    value={this.state.updated.lastname}
                                    onChange={(e) => this.handleInput(e)}
                                    placeholder="First Name"
                                    autoComplete="off"
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email"
                            name="username"
                            value={this.state.updated.username}
                            onChange={(e) => this.handleInput(e)}
                            placeholder="First Name"
                            autoComplete="off"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phno">Phno Number</Label>
                        <Input type="text"
                            name="phno"
                            value={this.state.updated.phno}
                            onChange={(e) => this.handleInput(e)}
                            placeholder="First Name"
                            autoComplete="off"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input
                            type="date"
                            name="dob"
                            value={this.state.updated.dob}
                            onChange={(e) => this.handleInput(e)}
                            placeholder="First Name"
                            autoComplete="off"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={this.state.updated.password}
                            onChange={(e) => this.handleInput(e)}
                            placeholder="Password"
                            autoComplete="off"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="rewrite">Re-Enter Password</Label>
                        <Input
                            type="password"
                            name="rewrite"
                            value={this.state.updated.rewrite}
                            onChange={(e) => this.handleInput(e)}
                            placeholder="Re-Enter Password"
                            autoComplete="off"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Button role="submit" color="success" style={{ margin: "0px 40%" }}>Update</Button>
                            </Col>
                            <Col>
                                <Button color="white" style={{ margin: "0px 40%", border: "1px solid" }} onClick={() => this.handleUpdate()}>Cancel</Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            )
        }
    }
}

export default Profile;