import React, { Component } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../url";
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText,Jumbotron } from 'reactstrap';
import { WaveTopBottomLoading } from 'react-loadingg';
import './index.css';


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            phno: "",
            dob: "",
            password: "",
            rewrite: "",
            value: false,
            isLoading: false,
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.Status = this.Status.bind(this);
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password === this.state.rewrite) {
            this.Status(this.state);
            this.setState({ isLoading: true });
        } else {
            this.setState({ password: "", rewrite: "" });
            alert("Both Password Field's should be match");
        }
    }

    Status = async (details) => {
        return fetch(baseUrl + "/teacher/signup", {
            method: "POST",
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((response) => {
                if (response.success) {
                    this.setState({
                        firstname: "",
                        lastname: "",
                        email: "",
                        phno: "",
                        dob: "",
                        password: "",
                        rewrite: "",
                        value: true,
                        isLoading: false
                    });
                } else {
                    alert(response.message);
                    this.setState({
                        firstname: "",
                        lastname: "",
                        email: "",
                        phno: "",
                        dob: "",
                        password: "",
                        rewrite: "",
                        value: false,
                        isLoading: false,
                    })
                }
            });
    };
    render() {
        if (this.state.isLoading) {
            return (
                <WaveTopBottomLoading />
            )
        }
        else if (!this.state.value)
            return (
                <Form onSubmit={this.handleSubmit} style={{ width: "95%", margin: "5px auto",padding:"2%" }}>
                    <h3 style={{ color: "blue", marginLeft: "40%" }}>
                        Sign Up
                        </h3>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="firstname">First Name</Label>
                                <Input type="text"
                                    name="firstname"
                                    value={this.state.firstname}
                                    onChange={this.handleInput}
                                    placeholder="First Name"
                                    autoComplete="off"
                                    required />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="lastname">Last Name</Label>
                                <Input type="text"
                                    con name="lastname"
                                    value={this.state.lastname}
                                    onChange={this.handleInput}
                                    placeholder="Last Name"
                                    autoComplete="off"
                                    required />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInput}
                            placeholder="Email"
                            required
                            autoComplete="off" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phno">Phno Number</Label>
                        <Input type="text"
                            name="phno"
                            value={this.state.phno}
                            onChange={this.handleInput}
                            placeholder="Phone Number"
                            autoComplete="off"
                            required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="date">Date</Label>
                        <Input
                            type="date"
                            name="dob"
                            value={this.state.dob}
                            onChange={this.handleInput}
                            placeholder="Date of Birth"
                            autoComplete="off"
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInput}
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
                            value={this.state.rewrite}
                            onChange={this.handleInput}
                            placeholder="Re-Enter Password"
                            autoComplete="off"
                            required
                        />
                        <FormText color="muted">
                            Already Have Account?{" "}
                            <Link to="/signin">Login</Link>
                        </FormText>
                    </FormGroup>
                    <Button role="submit" color="primary" style={{margin:"0px 40%"}}>Sign in</Button>
                </Form>
            );
        else
            return (
                <div>
                    <Jumbotron>
                        <h1 className="display-3">QP Generator</h1>
                        <p className="lead">Thank You for Signing up to QP Generator</p>
                        <hr className="my-2" />
                        <p>Please Complete the Sign Up process by verifying the email account, by clicking the link forwarded to your mail given during the Registration process.</p>
                    </Jumbotron>
                </div>
            );
    }
}

export default Signup;
