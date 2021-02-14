import React, { Component } from "react";
import { baseUrl } from "../../url";
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
        if (typeof this.state.isVerify === "number") return <div></div>;
        else if (typeof this.state.isVerify === "boolean") {
            if (this.state.isVerify) {
                return (
                    <div className="signup">
                        <div className="form">
                            <p> SUCCESSFULLY VERIFIED </p>
                        </div>
                    </div>
                );
            } else {
                console.log(this.state.isVerify);
                return (
                    <div className="signup">
                        <div className="form">
                            <p> CANNOT FIND USER </p>
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div className="signup">
                    <div className="form">
                        <p>{this.state.isVerify}!!!!</p>
                    </div>
                </div>
            );
        }
    }
}

export default Confirmation;
