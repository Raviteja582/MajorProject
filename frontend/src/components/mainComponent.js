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
import Alpha from "./insert/alphaComponent";
import Generate from './generate/schemaComponent';
import Options from './edit/optionComponent';

const mapStateToProps = (state) => {
    return {
        user: state.user,
        subjects: state.subjects,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postLogin: (details) => dispatch(postLogin(details)),
    postLogout: () => dispatch(postLogout()),
});

class Main extends Component {
    render() {
        const isLogin = this.props.user.user || null;
        let navs;
        if (isLogin !== null)
            navs = (
                <LoginNav
                    user={this.props.user.user}
                    logout={this.props.postLogout}
                />
            );
        else navs = <SignNav />;

        const PrivateRoute1 = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.user.user
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );
        const PrivateRoute2 = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.user.user
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );
        const PrivateRoute3 = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                this.props.user.user
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );
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
                                user={this.props.user}
                            />
                        )}
                    />
                    <Route
                        path="/forgot/:userId"
                        render={({ match }) => <Update {...match} />}
                    />
                    <Route path="/forgot" component={Forgot} />
                    <PrivateRoute1 exact path="/insert" component={() => <Alpha subjects={this.props.subjects}
                        id={this.props.user.user.id}
                        fetchSubjects={this.props.subjects} />} />
                    <PrivateRoute2 exact path="/generate" component={() => <Generate />} />
                    <PrivateRoute3 exact path="/edit" component={() => <Options />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
