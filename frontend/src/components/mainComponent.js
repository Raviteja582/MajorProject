import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Signup from "./signup/signupComponent";
import Confirmation from "./signup/confirmationComponent";

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
                    <Redirect to="/signup" />
                </Switch>
            </div>
        );
    }
}

export default Main;
