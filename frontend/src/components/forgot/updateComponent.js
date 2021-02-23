import React, { Component } from "react";
import { baseUrl } from "../../url";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./index.css";
import { Link } from "react-router-dom";

class Update extends Component {
    constructor() {
        super();
        this.state = {
            password: "",
            rewrite: "",
            status: false,
            message: "",
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.update = this.update.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password === this.state.rewrite) this.update();
        else {
            this.setState({
                status: true,
                message: "Password didn't Matched type again !!!",
                password: "",
                rewrite: "",
            });
        }
    }
    toggle() {
        this.setState({ status: false });
    }
    update = async () => {
        return fetch(
            baseUrl + "/teacher/forgot/change/" + this.props.params.userId,
            {
                method: "PUT",
                body: JSON.stringify({ password: this.state.password }),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "same-origin",
            }
        )
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                    status: true,
                    message: "Updated Successfully",
                });
            })
            .catch((err) => {
                this.setState({
                    status: true,
                    message: "Cannot find User!! Unauthorized Action!!",
                });
            });
    };
    render() {
        return (
            <div className="signup">
                <form onSubmit={this.handleSubmit} className="form1">
                    <div className="form-element">
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInput}
                            required
                            autoComplete="off"
                            placeholder="Enter New Password"
                        />
                    </div>
                    <div className="form-element">
                        <input
                            type="password"
                            name="rewrite"
                            value={this.state.rewrite}
                            onChange={this.handleInput}
                            required
                            autoComplete="off"
                            placeholder="Re-enter new password"
                        />
                    </div>
                    <div className="form-element">
                        <button type="submit">Update</button>
                    </div>
                </form>

                <div>
                    <Modal isOpen={this.state.status} toggle={this.toggle}>
                        <ModalHeader toggle={this.toggle}>
                            UpdatePassword
                        </ModalHeader>
                        <ModalBody>{this.state.message}</ModalBody>
                        <ModalFooter>
                            <Button
                                color="secondary"
                                onClick={this.toggle}
                                hidden={
                                    this.state.message ===
                                    "Updated Successfully"
                                }
                            >
                                Cancel
                            </Button>
                            <Link
                                hidden={
                                    this.state.message !==
                                    "Updated Successfully"
                                }
                                to="/signin"
                                className="btn btn-primary"
                            >
                                Sign In
                            </Link>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Update;
