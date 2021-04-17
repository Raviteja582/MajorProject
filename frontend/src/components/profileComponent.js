import React, { Component } from 'react';
import { getProfile, updateProfile } from './ActionCreators';
import { WaveTopBottomLoading } from 'react-loadingg';
import { Col, Row, Button, Form, FormGroup, Label, Input, UncontrolledTooltip } from 'reactstrap';
import localStorage from 'local-storage';

class Profile extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                name: '',
                phno: '',
                username: ''
            },
            updated: {
                name: '',
                phno: '',
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
        if (this.state.user.name === '') {
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
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text"
                            name="name"
                            value={this.state.user.name}
                            disabled={this.state.isDisabled}
                        />
                    </FormGroup>
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
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text"
                            name="name"
                            value={this.state.updated.lastname}
                            onChange={(e) => this.handleInput(e)}
                            placeholder="Name"
                            autoComplete="off"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email"
                            name="username"
                            id='email'
                            value={this.state.updated.username}
                            onChange={(e) => this.handleInput(e)}
                            placeholder="Email"
                            autoComplete="off"
                            pattern="^[A-Za-z0-9]+(@bvrit\.ac\.in)$"
                            required
                        />
                        <UncontrolledTooltip placement="left" target="email" style={{ width: '500%' }}>
                            Please use College email Id.
                        </UncontrolledTooltip>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phno">Phone Number</Label>
                        <Input type="text"
                            name="phno"
                            id="phno"
                            value={this.state.updated.phno}
                            onChange={(e) => this.handleInput(e)}
                            placeholder="First Name"
                            autoComplete="off"
                            pattern="\+?\d[\d -]{8,12}\d$"
                            required
                        />
                        <UncontrolledTooltip placement="left" target="phno" style={{ width: '500%' }}>
                            Please use valid Mobile number.
                        </UncontrolledTooltip>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={this.state.updated.password}
                            onChange={(e) => this.handleInput(e)}
                            placeholder="Password"
                            autoComplete="off"
                            pattern="[A-Za-z0-9]+.{8,32}$"
                            required
                        />
                        <UncontrolledTooltip placement="left" target="password" style={{ width: '500%' }}>
                            At least 8 characters in length, but no more than 32.
                        </UncontrolledTooltip>
                    </FormGroup>
                    <FormGroup>
                        <Label for="rewrite">Re-Enter Password</Label>
                        <Input
                            type="password"
                            name="rewrite"
                            id="rewrite"
                            value={this.state.updated.rewrite}
                            onChange={(e) => this.handleInput(e)}
                            placeholder="Re-Enter Password"
                            autoComplete="off"
                            pattern="[A-Za-z0-9]+.{8,32}$"
                            required
                        />
                        <UncontrolledTooltip placement="left" target="rewrite" style={{ width: '500%' }}>
                            At least 8 characters in length, but no more than 32.
                        </UncontrolledTooltip>
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