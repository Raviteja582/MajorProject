import React, { Component } from "react";
import { baseUrl } from "../../url";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import "./index.css";
import { Link } from "react-router-dom";
import { WaveTopBottomLoading } from "react-loadingg";

class Update extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      rewrite: "",
      status: false,
      message: "",
      isloading: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.rewrite) {
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/.test(
          this.state.password
        )
      ) {
        this.setState({ isloading: true });
        this.update();
      } else {
        this.setState({ password: "", rewrite: "", message: "Password should match the pattern",status: true });
      }
    } else {
      this.setState({
        status: true,
        message: "Password didn't Matched type again !!!",
        password: "",
        rewrite: "",
      });
    }
  }
  toggle() {
    this.setState({ status: false });
  }
  update = async () => {
    return fetch(
      baseUrl + "/teacher/forgot/change/" + this.props.params.userId,
      {
        method: "PUT",
        body: JSON.stringify({ password: this.state.password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          status: true,
          message: "Updated Successfully",
          isloading: false,
        });
      })
      .catch((err) => {
        this.setState({
          status: true,
          message: "Cannot find User!! Unauthorized Action!!",
          isloading: false,
        });
      });
  };
  render() {
    if (this.state.isloading) {
      return <WaveTopBottomLoading />;
    }
    return (
      <Row style={{ margin: '3%' }}>
        <Col sm={12} md={8}>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="password">New Password</Label>
              <Input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInput}
                required
                autoComplete="off"
                placeholder="Enter New Password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="rewrite">Re-Enter New Password</Label>
              <Input
                type="password"
                name="rewrite"
                value={this.state.rewrite}
                onChange={this.handleInput}
                required
                autoComplete="off"
                placeholder="Re-enter new password"
              />
            </FormGroup>
            <Button
              role="submit"
              style={{ margin: "20px 40%" }}
              color="primary"
            >
              Submit
            </Button>
          </Form>
        </Col>
        <Col sm={12} md={8}>
          <ol>
            <li>At least one digit [0-9]</li>
            <li>At least one lowercase character [a-z]</li>
            <li>At least one uppercase character [A-Z]</li>
            <li>
              At least one special character [*.!@#$%^&(){}[]:;{"<>"}
              ,.?/~_+-=|\]
            </li>
            <li>At least 8 characters in length, but no more than 32.</li>
          </ol>
        </Col>
        <div>
          <Modal isOpen={this.state.status} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>UpdatePassword</ModalHeader>
            <ModalBody>{this.state.message}</ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={this.toggle}
                hidden={this.state.message === "Updated Successfully"}
              >
                Cancel
              </Button>
              <Link
                hidden={this.state.message !== "Updated Successfully"}
                to="/signin"
                className="btn btn-primary"
              >
                Sign In
              </Link>
            </ModalFooter>
          </Modal>
        </div>
      </Row>
    );
  }
}

export default Update;
