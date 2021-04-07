import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import "./index.css";
import { baseUrl } from "../../url";
import { WaveTopBottomLoading } from 'react-loadingg';
import { Link } from "react-router-dom";

class Forgot extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            status: false,
            message: "",
            isloading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.verify = this.verify.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    toggle() {
        this.setState({ status: false });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.verify();
    }
    verify = async () => {
        this.setState({isloading: true})
        return fetch(baseUrl + "/teacher/forgot/check", {
            method: "POST",
            body: JSON.stringify({ email: this.state.email }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    this.setState({
                        status: true,
                        message:
                            "Please Reset Your Password using the link forward to your Mail",
                        email: "",
                        isloading: false
                    });
                } else {
                    this.setState({
                        status: true,
                        message: "Cannot Find Email given !!!!",
                        email: "",
                        isloading: false
                    });
                }
            });
    };
    render() {
        if (this.state.isloading) {
            return (
                <WaveTopBottomLoading />
            )
        }
        return (
            <div>
                <Form onSubmit={this.handleSubmit} style={{width: "50%", margin:"10vh auto"}}>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInput}
                            required
                            placeholder="Enter Registered Email"
                            autoComplete="off" />
                    </FormGroup>
                    <Button role="submit" style={{margin:"10px 40%"}} color='primary' >Submit</Button>
                </Form>
                <div>
                    <Modal isOpen={this.state.status} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            Verification
                        </ModalHeader>
                        <ModalBody>{this.state.message}</ModalBody>
                        <ModalFooter>
                            <Button
                                color="secondary"
                                hidden={
                                    this.state.message !==
                                    "Cannot Find Email given !!!!"
                                }
                                onClick={this.toggle}
                            >
                                Cancel
                            </Button>
                            <Link
                                to="/home"
                                hidden={
                                    this.state.message ===
                                    "Cannot Find Email given !!!!"
                                }
                                className="btn btn-primary"
                            >
                                {" "}
                                Okay{" "}
                            </Link>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Forgot;
