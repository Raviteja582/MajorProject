import React, { Component } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../url";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Jumbotron,
  Row,
  Col,
} from "reactstrap";
import { WaveTopBottomLoading } from "react-loadingg";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phno: "",
      password: "",
      rewrite: "",
      value: false,
      isLoading: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Status = this.Status.bind(this);
  }
  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value.trimLeft() });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (/^[A-Za-z0-9.]+(@bvrit\.ac\.in)$/.test(this.state.email)) {
      if (/\+?\d[\d -]{8,12}\d$/.test(this.state.phno)) {
        if (this.state.password === this.state.rewrite) {
          if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,32}$/.test(this.state.password)) {
            this.Status(this.state);
            this.setState({ isLoading: true });
          } else {
            this.setState({ password: "", rewrite: "" });
            alert("Password should not contain any special symbols.");
          }
        } else {
          this.setState({ password: "", rewrite: "" });
          alert("Both Password Field's should be match");
        }
      } else {
        this.setState({ phno: "" });
        alert("Not a Vaid Phone Number");
      }
    } else {
      this.setState({ email: "" });
      alert("Please use College provided email.");
    }
  }

  Status = async (details) => {
    return fetch(baseUrl + "/teacher/signup", {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.success) {
          this.setState({
            name: "",
            email: "",
            phno: "",
            password: "",
            rewrite: "",
            value: true,
            isLoading: false,
          });
        } else {
          alert(response.message);
          this.setState({
            name: "",
            email: "",
            phno: "",
            password: "",
            rewrite: "",
            value: false,
            isLoading: false,
          });
        }
      });
  };
  render() {
    if (this.state.isLoading) {
      return <WaveTopBottomLoading />;
    } else if (!this.state.value)
      return (
        <Form
          onSubmit={this.handleSubmit}
          style={{margin: "5px auto", padding: "2%" }}
        >
          <h3 style={{ color: "blue", marginLeft: "30vw" }}>Sign Up</h3>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInput}
              placeholder="Name"
              autoComplete="off"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInput}
              placeholder="Email"
              required
              autoComplete="off"
            />
          </FormGroup>
          <FormGroup>
            <Label for="phno">Phone Number</Label>
            <Input
              type="text"
              name="phno"
              value={this.state.phno}
              onChange={this.handleInput}
              placeholder="Phone Number"
              autoComplete="off"
              required
            />
          </FormGroup>
          <Row>
            <Col sm={8}>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  id="UncontrolledTooltipExample1"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInput}
                  placeholder="Password"
                  autoComplete="off"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="rewrite">Re-Enter Password</Label>
                <Input
                  type="password"
                  id="UncontrolledTooltipExample2"
                  name="rewrite"
                  value={this.state.rewrite}
                  onChange={this.handleInput}
                  placeholder="Re-Enter Password"
                  autoComplete="off"
                  required
                />
              </FormGroup>
            </Col>
            <Col sm={4}>
              <ol>
                <li>At least one digit [0-9]</li>
                <li>At least one lowercase character [a-z]</li>
                <li>
                  At least one uppercase character [A-Z] 
                </li>
                <li>
                At least one special character [*.!@#$%^&(){}[]:;{"<>"},.?/~_+-=|\] 
                </li>
                <li>At least 8 characters in length, but no more than 32.</li>
              </ol>
            </Col>
          </Row>

          <FormText color="muted">
            Already Have Account? <Link to="/signin">Login</Link>
          </FormText>

          <Button role="submit" color="success" size="md" outline style={{ marginLeft: "30vw" }}>
            Sign up
          </Button>
        </Form>
      );
    else
      return (
        <div>
          <Jumbotron>
            <h1 className="display-3">QP Generator</h1>
            <p className="lead">Thanks for signing up with QP Generator.</p>
            <hr className="my-2" />
            <p>
              Please complete the signup process by verifying your account using
              the link sent to your email address.
            </p>
          </Jumbotron>
        </div>
      );
  }
}

export default Signup;
