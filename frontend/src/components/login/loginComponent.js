import React, { Component } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  UncontrolledAlert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from "reactstrap";
import { baseUrl } from "../../url";
import localStorage from "local-storage";
import { WaveTopBottomLoading } from "react-loadingg";

const ModalExample = (props) => {
  const history = useHistory();
  history.push("/");
  return <div></div>;
};

class Login extends Component {
  constructor() {
    super();
    this.state = {
      cred: {
        username: "",
        password: "",
      },
      success: localStorage.get("token") || false,
      failure: false,
      err: "",
      isLoading: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e) {
    this.setState((prev) => ({
      ...prev,
      cred: {
        ...prev.cred,
        [e.target.name]: e.target.value,
      },
    }));
  }
  async handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    const response = await fetch(baseUrl + "/teacher/login", {
      method: "POST",
      body: JSON.stringify(this.state.cred),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response_1 = await response.json();
    if (response_1.status === "VERIFY") {
      this.setState({ verify: true, isLoading: false });
    } else if (response_1.status) {
      localStorage.set("token", response_1.token);
      localStorage.set("user", response_1.user);
      this.setState({ success: true, isLoading: false });
      window.location.reload();
    } else {
      this.setState({ failure: true, err: response_1.err, isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <WaveTopBottomLoading />;
    } else if (this.state.success) return <ModalExample />;
    else {
      let block = <div></div>;
      if (this.state.verify) {
        block = (
          <UncontrolledAlert>
            Please Complete verification Process as mentioned in mail forwarded
            to you during sign up.
          </UncontrolledAlert>
        );
      } else if (this.state.failure) {
        block = (
          <UncontrolledAlert color="danger">{this.state.err}</UncontrolledAlert>
        );
      }
      return (
        <Row
          style={{
            justifyContent: "center",
            marginLeft: "12%",
            marginTop: "5%",
            marginRight: "10%",
            marginBottom: "1%",
            padding: "2%",
          }}
        >
          <Col xs={12} md={2} style={{ padding: "1em" }}>
            <img src="/back.jpeg" alt="vishu logo" width="200em" />
          </Col>
          <Col xs={12} md={10} style={{ paddingLeft: "10%" }}>
            <Form onSubmit={this.handleSubmit}>
              {block}
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="text"
                  name="username"
                  value={this.state.cred.username}
                  onChange={this.handleInput}
                  placeholder="Email"
                  autoComplete="off"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={this.state.cred.password}
                  onChange={this.handleInput}
                  placeholder="Password"
                  required
                />
                <FormText color="muted">
                  Forget Username/Password?{" "}
                  <Link to="/forgot" style={{ textDecoration: "underline" }}>
                    Click here
                  </Link>
                </FormText>
              </FormGroup>
              <Button
                role="submit"
                color="info"
                size="md"
                outline
                style={{ marginLeft: "25%" }}
              >
                Sign in
              </Button>
            </Form>
          </Col>
        </Row>
      );
    }
  }
}

export default Login;
