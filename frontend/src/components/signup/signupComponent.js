import React, { Component } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../url";
import { Button, Form, FormGroup, Label, Input, FormText, Jumbotron, UncontrolledTooltip } from 'reactstrap';
import { WaveTopBottomLoading } from 'react-loadingg';
import './index.css';


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            phno: "",
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
        if (/^[A-Za-z0-9]+(@bvrit\.ac\.in)$/.test(this.state.email)) {
            if (/\+?\d[\d -]{8,12}\d$/.test(this.state.phno)) {
                if (this.state.password === this.state.rewrite) {
                    if (/[A-Za-z0-9]+.{8,32}$/.test(this.state.password)) {
                        this.Status(this.state);
                        this.setState({ isLoading: true });
                    } else {
                        this.setState({ password: "", rewrite: "" });
                        alert("Password should not contain any special symbols.");
                    }
                } else {
                    this.setState({ password: "", rewrite: "" });
                    alert("Both Password Field's should be match");
                }
            } else {
                this.setState({ phno: "" });
                alert('Not a Vaid Phone Number');

            }
        } else {
            this.setState({ email: '' });
            alert('Please use College provided email.');
        }
    }

    Status = async (details) => {
        return fetch(baseUrl + "/teacher/signup", {
            method: "POST",
            body: JSON.stringify(details),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                if (response.success) {
                    this.setState({
                        name: "",
                        email: "",
                        phno: "",
                        password: "",
                        rewrite: "",
                        value: true,
                        isLoading: false
                    });
                } else {
                    alert(response.message);
                    this.setState({
                        name: "",
                        email: "",
                        phno: "",
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
                <Form onSubmit={this.handleSubmit} style={{ width: "95%", margin: "5px auto", padding: "2%" }}>
                    <h3 style={{ color: "blue", marginLeft: "40%" }}>
                        Sign Up
                        </h3>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleInput}
                            placeholder="First Name"
                            autoComplete="off"
                            required />
                    </FormGroup>
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
                        <Label for="phno">Phone Number</Label>
                        <Input type="text"
                            name="phno"
                            value={this.state.phno}
                            onChange={this.handleInput}
                            placeholder="Phone Number"
                            autoComplete="off"
                            required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            id="UncontrolledTooltipExample1"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInput}
                            placeholder="Password"
                            autoComplete="off"
                            required
                        />
                        <UncontrolledTooltip placement="left" target="UncontrolledTooltipExample1" style={{ width: '500%' }}>
                            At least 8 characters in length, but no more than 32.
                        </UncontrolledTooltip>
                    </FormGroup>
                    <FormGroup>
                        <Label for="rewrite">Re-Enter Password</Label>
                        <Input
                            type="password"
                            id="UncontrolledTooltipExample2"
                            name="rewrite"
                            value={this.state.rewrite}
                            onChange={this.handleInput}
                            placeholder="Re-Enter Password"
                            autoComplete="off"
                            required
                        />
                        <UncontrolledTooltip placement="left" target="UncontrolledTooltipExample2" style={{ width: '500%' }}>
                            At least 8 characters in length, but no more than 32.
                        </UncontrolledTooltip>
                        <FormText color="muted">
                            Already Have Account?{" "}
                            <Link to="/signin">Login</Link>
                        </FormText>
                    </FormGroup>
                    <Button role="submit" color="primary" style={{ margin: "0px 40%" }}>Sign up</Button>
                </Form>
            );
        else
            return (
                <div>
                    <Jumbotron>
                        <h1 className="display-3">QP Generator</h1>
                        <p className="lead">Thanks for signing up with QP Generator.</p>
                        <hr className="my-2" />
                        <p>Please complete the signup process by verifying your account using the link sent to your email address.</p>
                    </Jumbotron>
                </div>
            );
    }
}

export default Signup;
