import React, { Component } from "react";
import { getProfile, updateProfile } from "./ActionCreators";
import { WaveTopBottomLoading } from "react-loadingg";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
} from "reactstrap";
import { postLogout } from "./ActionCreators";
import localStorage from "local-storage";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: "",
        phno: "",
        username: "",
      },
      updated: {
        name: "",
        phno: "",
        username: "",
      },
      isLoading: false,
      isDisabled: true,
      isUpdate: false,
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    console.log(this.state.user);
    if (this.state.user.name === "") {
      this.setState({ isLoading: true });
      getProfile()
        .then((res) => res.json())
        .then((user) => {
          this.setState({ user: user, updated: user, isLoading: false });
        })
        .catch((err) => {
          this.setState({ isLoading: false });
          alert("Cannot Connect to Server!!!,  Logging Out...");
        });
    }
  }

  handleUpdate(e) {
    e.preventDefault();
    this.setState({
      isDisabled: !this.state.isDisabled,
      isUpdate: !this.state.isUpdate,
      updated: this.state.user,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (/^[A-Za-z0-9.]+(@bvrit\.ac\.in)$/.test(this.state.updated.username)) {
      if (/\+?\d[\d -]{8,12}\d$/.test(this.state.updated.phno)) {
        this.setState({ isLoading: true });
        updateProfile(this.state.updated)
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              if (this.state.user.username !== this.state.updated.username) {
                alert("Logging out....");
                localStorage.clear();
                window.location.reload();
              }
              this.setState({
                user: res.user,
                updated: res.user,
                isLoading: false,
              });
              this.handleUpdate();
            } else {
              alert("Please Give valid Email address or else don't change");
            }
          })
          .catch((err) => {
            alert("Failure!!!!");
            localStorage.clear();
            window.location.reload();
          });
      } else {
        this.setState({ updated: { ...this.state.updated, phno: "" } });
        alert("Invalid Phone Number");
      }
    } else {
      this.setState({ updated: { ...this.state.updated, username: "" } });
      alert("Please use college mail ID");
    }
  }

  handleInput(e) {
    this.setState((prev) => ({
      ...prev,
      updated: {
        ...prev.updated,
        [e.target.name]: e.target.value.trimLeft(),
      },
    }));
  }

  render() {
    if (this.state.isLoading) {
      return <WaveTopBottomLoading />;
    } else if (this.state.isDisabled) {
      return (
        <Form style={{ margin: "2% 7%" }}>
          <h3 style={{ color: "blue", marginLeft: "30vw" }}>Profile</h3>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={this.state.user.name}
              disabled={this.state.isDisabled}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={this.state.user.username}
              disabled={this.state.isDisabled}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phno">Phno Number</Label>
            <Input
              type="text"
              name="phno"
              value={this.state.user.phno}
              disabled={this.state.isDisabled}
            />
          </FormGroup>
          <Row style={{ marginLeft: "1.3em" }}>
            <Col xs={6}>
              <Button
                color="primary"
                size="sm"
                onClick={(e) => { this.handleUpdate(e) }}
              >
                Update
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                color="success"
                size="sm"
                onClick={() => postLogout()}
              >
                Logout
              </Button>
            </Col>
          </Row>
        </Form>
      );
    } else {
      return (
        <Form onSubmit={this.handleSubmit} style={{ margin: "5px 7%" }}>
          <h3 style={{ color: "blue", marginLeft: "30vw" }}>Profile</h3>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={this.state.updated.name}
              onChange={(e) => this.handleInput(e)}
              placeholder="Name"
              autoComplete="off"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="username"
              id="email"
              value={this.state.updated.username}
              onChange={(e) => this.handleInput(e)}
              placeholder="Email"
              autoComplete="off"
              pattern="^[A-Za-z0-9]+(@bvrit\.ac\.in)$"
              required
            />
            <UncontrolledTooltip
              placement="left"
              target="email"
              style={{ width: "500%" }}
            >
              Please use College email Id.
            </UncontrolledTooltip>
          </FormGroup>
          <FormGroup>
            <Label for="phno">Phone Number</Label>
            <Input
              type="text"
              name="phno"
              id="phno"
              value={this.state.updated.phno}
              onChange={(e) => this.handleInput(e)}
              placeholder="First Name"
              autoComplete="off"
              pattern="\+?\d[\d -]{8,12}\d$"
              required
            />
            <UncontrolledTooltip
              placement="left"
              target="phno"
              style={{ width: "500%" }}
            >
              Please use valid Mobile number.
            </UncontrolledTooltip>
          </FormGroup>
          <Row style={{ marginLeft: "1.3em" }}>
            <Col xs={6}>
              <Button role="submit" color="success" size="sm">
                Update
              </Button>
            </Col>
            <Col xs={6}>
              <Button
                size="sm"
                color="white"
                style={{ border: "1px solid" }}
                onClick={(e) => this.handleUpdate(e)}
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      );
    }
  }
}

export default Profile;
