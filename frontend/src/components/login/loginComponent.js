import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Alert } from "reactstrap";
import Home from "../home/homeComponent";
import "./index.css";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state);
    }

    render() {
        const state = this.props.user.type;
        try {
            if (this.props.user.user.id)
                return <Home />
        } catch (error) {
        }
        let block;
        if (state === "LOGIN_SUCCESS") return <Home />;
        else if (state === "LOGIN_FAILURE" || state === "LOGIN_UNSUCCESSFUL")
            block = (
                <Alert color="danger">
                    Username or Password is Incorrect!!!
                </Alert>
            );
        else if (state === "LOGIN_VERIFY")
            block = (
                <Alert color="info">
                    Please Complete Registration process before signin!!!
                </Alert>
            );
        else block = <div></div>;
        return (
            <div className="login">
                {block}
                <form onSubmit={this.handleSubmit} className="form-login">
                    <div>
                        Username:
                        <br />
                        <input
                            className="textInput"
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInput}
                            placeholder="Username"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div>
                        Password:
                        <input
                            className="passwordInput"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInput}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div style={{ marginLeft: "63%" }}>
                        <Link to="/forgot">Forgot Username/password?</Link>
                    </div>
                    <div>
                        <button className="submitButton" type="submit">Sign In </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
