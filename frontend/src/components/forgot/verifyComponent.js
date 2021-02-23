import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./index.css";
import { baseUrl } from "../../url";
import { Link } from "react-router-dom";

class Forgot extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            status: false,
            message: "",
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
                    });
                } else {
                    this.setState({
                        status: true,
                        message: "Cannot Find Email given !!!!",
                        email: "",
                    });
                }
            });
    };
    render() {
        return (
            <div className="signup">
                <form onSubmit={this.handleSubmit} className="form1">
                    <div className="form-element">
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInput}
                            required
                            placeholder="Enter Registered Email"
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-element">
                        <button type="submit">VerifyEmail</button>
                    </div>
                </form>
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
