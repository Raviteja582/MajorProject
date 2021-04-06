import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./signup/signupComponent";
import Confirmation from "./signup/confirmationComponent";
import Login from "./login/loginComponent";
import Home from "./home/homeComponent";
import Forgot from "./forgot/verifyComponent";
import Update from "./forgot/updateComponent";
import SignNav from "./navbar/signNav";
import LoginNav from "./navbar/loginNav";
import Alpha from "./insert/alphaComponent";
import Generate from './generate/schemaComponent';
import Options from './edit/optionComponent';
import localStorage from "local-storage";

class Main extends Component {
    render() {
        const isLogin = localStorage.get('token') || null;
        console.log(isLogin);
        let navs;
        if (isLogin !== null)
            navs = (
                <LoginNav user={localStorage.get('user')}/>
            );
        else navs = <SignNav />;

        const PrivateRoute1 = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.get('token')
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );
        const PrivateRoute2 = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.get('token')
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );
        const PrivateRoute3 = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.get('token')
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
                            />
                        )}
                    />
                    <Route
                        path="/forgot/:userId"
                        render={({ match }) => <Update {...match} />}
                    />
                    <Route path="/forgot" component={Forgot} />
                    <PrivateRoute1 exact path="/insert" component={() => <Alpha  />} />
                    <PrivateRoute2 exact path="/generate" component={() => <Generate />} />
                    <PrivateRoute3 exact path="/edit" component={() => <Options />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main;
