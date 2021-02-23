import React, { Component } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../url";
import "./index.css";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            phno: "",
            dob: "",
            username: "",
            password: "",
            rewrite: "",
            value: false,
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
        } else {
            this.setState({ password: "", rewrite: "" });
            alert("Please Enter Same Password in both fields");
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
                return response.json();
            })
            .then((response) => {
                if (response.success) {
                    this.setState({ value: true });
                } else {
                    alert("User Already Present!!!");
                    window.location.reload();
                }
            });
    };
    render() {
        if (!this.state.value)
            return (
                <div className="signup">
                    <form onSubmit={this.handleSubmit} className="form">
                        <h3 style={{ color: "blue", marginLeft: "40%" }}>
                            Sign Up
                        </h3>
                        <div className="names">
                            <input
                                type="text"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleInput}
                                placeholder="First Name"
                                autoComplete="off"
                                required
                            />
                            <input
                                type="text"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleInput}
                                placeholder="Last Name"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form-element">
                            <input
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleInput}
                                placeholder="Email"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-element">
                            <input
                                type="text"
                                name="phno"
                                value={this.state.phno}
                                onChange={this.handleInput}
                                placeholder="Phone Number"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form-element">
                            <input
                                type="date"
                                name="dob"
                                value={this.state.dob}
                                onChange={this.handleInput}
                                placeholder="Date of Birth"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form-element">
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleInput}
                                placeholder="Username"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form-element">
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleInput}
                                placeholder="Password"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="form-element">
                            <input
                                type="password"
                                name="rewrite"
                                value={this.state.rewrite}
                                onChange={this.handleInput}
                                placeholder="Re-Enter Password"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div>
                            Already Have Account? <Link to="/login">Login</Link>
                        </div>
                        <div className="form-element">
                            <button type="submit"> Register </button>
                        </div>
                    </form>
                </div>
            );
        else
            return (
                <div className="signup">
                    <div className="success">
                        <p>Your Successfully Registerd.</p> Please Check your
                        mail.
                    </div>
                </div>
            );
    }
}

export default Signup;
