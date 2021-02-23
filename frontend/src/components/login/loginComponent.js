import React, { Component } from "react";
import { Link } from "react-router-dom";
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
    componentDidMount() {
        if (
            this.props.user.type !== null &&
            this.props.user.type !== "LOGIN_SUCCESS"
        )
            alert(this.props.user.err);
    }
    handleInput(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state);
    }
    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit} className="form-login">
                    <div>
                        Username:
                        <br />
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
                    <div>
                        Password:
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInput}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div style={{ marginLeft: "66%" }}>
                        <Link to="/forgot">Forget Username/password</Link>
                    </div>
                    <div>
                        <button type="submit">Sign In </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
