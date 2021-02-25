import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Signup from "./signup/signupComponent";
import Confirmation from "./signup/confirmationComponent";
import Login from "./login/loginComponent";
import Home from "./home/homeComponent";
import Forgot from "./forgot/verifyComponent";
import Update from "./forgot/updateComponent";
import { connect } from "react-redux";
import { postLogin, postLogout } from "../redux/ActionCreators";
import SignNav from "./navbar/signNav";
import LoginNav from "./navbar/loginNav";

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postLogin: (details) => dispatch(postLogin(details)),
    postLogout: () => dispatch(postLogout()),
});

class Main extends Component {
    render() {
        const isLogin = this.props.user.token;
        let navs;
        if (isLogin !== null)
            navs = (
                <LoginNav
                    user={this.props.user.user.username}
                    logout={this.props.postLogout}
                />
            );
        else navs = <SignNav />;

        return (
            <div>
                {navs}
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/signup" component={Signup} />
                    <Route
                        path="/user/:userId"
                        render={({ match }) => <Confirmation {...match} />}
                    />
                    <Route
                        path="/signin"
                        render={({ match }) => (
                            <Login
                                {...match}
                                login={this.props.postLogin}
                                user={this.props.user.type}
                            />
                        )}
                    />
                    <Route
                        path="/forgot/:userId"
                        render={({ match }) => <Update {...match} />}
                    />
                    <Route path="/forgot" component={Forgot} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
