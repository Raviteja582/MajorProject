import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./signup/signupComponent";
import Confirmation from "./signup/confirmationComponent";
import Login from "./login/loginComponent";
import Home from "./home/homeComponent";
import Landing from './home/landingComponent';
import Forgot from "./forgot/verifyComponent";
import Update from "./forgot/updateComponent";
import SignNav from "./navbar/signNav";
import Profile from './profileComponent';
import LoginNav from "./navbar/loginNav";
import AdminLoginNav from './navbar/adminNav';
import Alpha from "./insert/alphaComponent";
import Generate from './generate/schemaComponent';
import Options from './edit/optionComponent';
import localStorage from "local-storage";
import Department from './Admin/department';
import Subject from './Admin/subject';
import AdminHome from './Admin/adminHome';





class Main extends Component {

    render() {

        const PrivateRouteHome = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.get('token') && localStorage.get('user').admin
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );

        const PrivateRouteDepartment = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.get('token') && localStorage.get('user').admin
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );

        const PrivateRouteSubject = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.get('token') && localStorage.get('user').admin
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );

        const PrivateAdminProfile = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.get('token') && localStorage.get('user').admin
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );


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
        const PrivateRoute4 = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.get('token')
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );
        const PrivateRoute5 = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.get('token')
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );

        const isLogin = localStorage.get('token') || null;
        let navs, routes;
        if (isLogin !== null) {
            if (localStorage.get('user').admin) {
                navs = (
                    <AdminLoginNav user={localStorage.get('user')} />
                );
                routes = <Switch>
                    <PrivateRouteHome path="/home" component={AdminHome} />
                    <PrivateRouteDepartment path="/department" component={Department} />
                    <PrivateRouteSubject path="/subject" component={Subject} />
                    <PrivateAdminProfile path="/profile" component={Profile} />
                    <Redirect to="/home" />
                </Switch>
            }
            else {
                navs = (
                    <LoginNav user={localStorage.get('user')} />
                );
                routes = <Switch>
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
                    <PrivateRoute1 exact path="/insert" component={() => <Alpha />} />
                    <PrivateRoute2 exact path="/generate" component={() => <Generate />} />
                    <PrivateRoute3 exact path="/edit" component={() => <Options />} />
                    <PrivateRoute4 exact path="/profile" component={() => <Profile />} />
                    <PrivateRoute5 exact path="/landing" component={() => <Landing />} />
                    <Redirect to="/landing" />
                </Switch>
            }
        }

        else {
            navs = <SignNav />;
            routes = <Switch>
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
                <Redirect to="/home" />
            </Switch>
        }

        return (
            <div>
                {navs}
                {routes}
            </div>
        );
    }
}

export default Main;
