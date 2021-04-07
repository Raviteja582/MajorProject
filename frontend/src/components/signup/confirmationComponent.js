import React, { Component } from "react";
import { baseUrl } from "../../url";
import { Jumbotron } from 'reactstrap';
import { WaveTopBottomLoading } from 'react-loadingg';


class Confirmation extends Component {
    constructor() {
        super();
        this.state = {
            isVerify: 0,
        };
        this.check = this.check.bind(this);
    }

    check = async () => {
        // this.props.params.userId,this.props.url
        return fetch(baseUrl + this.props.url)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                if (response.sucess) {
                    this.setState({ isVerify: true });
                } else {
                    this.setState({ isVerify: false });
                }
            })
            .catch((err) => {
                this.setState({ isVerify: "Error Occured" });
            });
    };

    componentDidMount() {
        this.check();
    }
    render() {
        if (typeof this.state.isVerify === "number") return (
            <WaveTopBottomLoading />
        );
        else if (typeof this.state.isVerify === "boolean") {
            if (this.state.isVerify) {
                return (
                    <Jumbotron>
                        <h1 className="display-3">QP Generator</h1>
                        <p className="lead">SUCCESSFULLY VERIFIED</p>
                        <hr className="lead" />
                        <p> You can Continue using the app for generating papers, by login for next time.</p>
                    </Jumbotron>
                );
            } else {
                return (
                    <Jumbotron>
                        <h1 className="display-3">QP Generator</h1>
                        <p className="lead">Incorrect Verification.</p>
                        <hr className="lead" />
                        <p> Use the mail which is given during Registration Process</p>
                    </Jumbotron>
                );
            }
        } else {
            return (
                <Jumbotron>
                        <h1 className="display-3">QP Generator</h1>
                        <p className="lead">An Error Occured.</p>
                        <hr className="lead" />
                        <p> Please Report this to the site Owners. </p>
                    </Jumbotron>
            );
        }
    }
}

export default Confirmation;
