import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Signup from "./signup/signupComponent";
import Confirmation from "./signup/confirmationComponent";
import Login from "./login/loginComponent";
import { connect } from "react-redux";
import { postLogin } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postLogin: (details) => dispatch(postLogin(details)),
});

class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
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
                                user={this.props.user}
                            />
                        )}
                    />
                    <Redirect to="/signup" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
