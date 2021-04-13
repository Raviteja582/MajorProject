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
import AdminLoginNav from './navbar/adminNav';
import Alpha from "./insert/alphaComponent";
import Generate from './generate/schemaComponent';
import Options from './edit/optionComponent';
import localStorage from "local-storage";
import Department from './Admin/department';
import Subject from './Admin/subject';
import Question from './Admin/question';
import Teacher from './Admin/teacher';
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

        const PrivateRouteTeacher = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
                localStorage.get('token') && localStorage.get('user').admin
                    ? <Component {...props} />
                    : <Redirect to={{
                        pathname: '/home',
                        state: { from: props.location }
                    }} />
            )} />
        );

        const PrivateRouteQuestion = ({ component: Component, ...rest }) => (
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
                    <PrivateRouteTeacher path="/teacher" component={Teacher} />
                    <PrivateRouteSubject path="/subject" component={Subject} />
                    <PrivateRouteQuestion path="/question" component={Question} />
                    <Redirect to="/home" />
                </Switch>
            }
            else {
                navs = (
                    <LoginNav user={localStorage.get('user')} />
                );
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
                    <PrivateRoute1 exact path="/insert" component={() => <Alpha />} />
                    <PrivateRoute2 exact path="/generate" component={() => <Generate />} />
                    <PrivateRoute3 exact path="/edit" component={() => <Options />} />
                    <Redirect to="/home" />
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
