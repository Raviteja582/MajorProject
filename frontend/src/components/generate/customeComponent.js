import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  FormText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { WaveTopBottomLoading } from "react-loadingg";
import localStorage from "local-storage";
import DatePicker from "react-datepicker";
import { baseUrl } from "../../url";

class Custome extends Component {
  constructor() {
    super();
    this.state = {
      easy: {
        u1: false,
        u2: false,
        u3: false,
        u4: false,
        u5: false,
      },
      medium: {
        u1: false,
        u2: false,
        u3: false,
        u4: false,
        u5: false,
      },
      hard: {
        u1: false,
        u2: false,
        u3: false,
        u4: false,
        u5: false,
      },
      sections: [
        {
          sname: "",
          marks: "",
          type: "easy",
          u1: "",
          u2: "",
          u3: "",
          u4: "",
          u5: "",
          done: false,
        },
      ],
      tAddModal: false,
      tRemoveModal: false,
      isloading: false,
      my: new Date(),
      duration: "",
      maxMarks: "",
      sublens: {
        easy: {
          u1: 0,
          u2: 0,
          u3: 0,
          u4: 0,
          u5: 0,
        },
        medium: {
          u1: 0,
          u2: 0,
          u3: 0,
          u4: 0,
          u5: 0,
        },
        hard: {
          u1: 0,
          u2: 0,
          u3: 0,
          u4: 0,
          u5: 0,
        },
      },
    };
    this.addhandleToggle = this.addhandleToggle.bind(this);
    this.removehandleToggle = this.removehandleToggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getLengths = this.getLengths.bind(this);
    this.handleMonth = this.handleMonth.bind(this);
    this.handleDet = this.handleDet.bind(this);
  }

  componentDidMount() {
    this.getLengths();
  }

  async getLengths() {
    this.setState({ isloading: true });
    const bearer = "Bearer " + localStorage.get("token");
    return fetch(baseUrl + "/teacher/schema/" + this.props.subject.id, {
      headers: {
        Authorization: bearer,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.setState({ sublens: res.sublens, isloading: false });
      })
      .catch((err) => {
        this.setState({ isloading: false });
        alert("Cannot Connect to Server!!!, Logging Out...");
        localStorage.clear();
        window.location.reload();
      });
  }

  handleInput(ind, e) {
    var xs = [...this.state.sections];
    xs[ind][e.target.name] = e.target.value;
    this.setState({ sections: xs });
  }
  addhandleToggle() {
    var xs = { ...this.state };
    var ind = xs.sections.length - 1;
    if (
      xs.sections[ind].sname === "" ||
      xs.sections[ind].marks === "" ||
      (xs.sections[ind].u1 === "" &&
        xs[xs.sections[ind]["type"]]["u1"] === false) ||
      (xs.sections[ind].u2 === "" &&
        xs[xs.sections[ind]["type"]]["u2"] === false) ||
      (xs.sections[ind].u3 === "" &&
        xs[xs.sections[ind]["type"]]["u3"] === false) ||
      (xs.sections[ind].u4 === "" &&
        xs[xs.sections[ind]["type"]]["u4"] === false)
    )
      alert("Please Enter all details!!!!!");
    else if (
      Number(xs.sections[ind].u1) >
      Number(this.state.sublens[xs.sections[ind]["type"]]["u1"])
    )
      alert("More Questions are requestion from u1");
    else if (
      Number(xs.sections[ind].u2) >
      Number(this.state.sublens[xs.sections[ind]["type"]]["u2"])
    )
      alert("More Questions are requestion from u2");
    else if (
      Number(xs.sections[ind].u3) >
      Number(this.state.sublens[xs.sections[ind]["type"]]["u3"])
    )
      alert("More Questions are requestion from u3");
    else if (
      Number(xs.sections[ind].u4) >
      Number(this.state.sublens[xs.sections[ind]["type"]]["u4"])
    )
      alert("More Questions are requestion from u4");
    else if (
      Number(xs.sections[ind].u5) >
      Number(this.state.sublens[xs.sections[ind]["type"]]["u5"])
    )
      alert("More Questions are requestion from u5");
    else this.setState({ tAddModal: !this.state.tAddModal });
  }
  removehandleToggle() {
    this.setState({ tRemoveModal: !this.state.tRemoveModal });
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(this.state.sections);
    this.props.handleSchema({
      sections: this.state.sections,
      my: this.state.my,
      maxMarks: this.state.maxMarks,
      duration: this.state.duration,
    });
    this.handleRemove();
  }

  handleRemove() {
    this.setState({
      easy: {
        u1: false,
        u2: false,
        u3: false,
        u4: false,
        u5: false,
      },
      medium: {
        u1: false,
        u2: false,
        u3: false,
        u4: false,
        u5: false,
      },
      hard: {
        u1: false,
        u2: false,
        u3: false,
        u4: false,
        u5: false,
      },
      tRemoveModal: false,
      sections: [
        {
          sname: "",
          marks: "",
          type: "easy",
          u1: "",
          u2: "",
          u3: "",
          u4: "",
          u5: "",
          done: false,
        },
      ],
    });
  }

  handleClick() {
    var xs = { ...this.state };
    var ind = xs.sections.length - 1;
    if (!xs[xs.sections[ind]["type"]].u1 && xs.sections[ind].u1 !== "0")
      xs[xs.sections[ind].type].u1 = true;
    else xs.sections[ind].u1 = "";
    if (!xs[xs.sections[ind]["type"]].u2 && xs.sections[ind].u2 !== "0")
      xs[xs.sections[ind].type].u2 = true;
    else xs.sections[ind].u2 = "";
    if (!xs[xs.sections[ind]["type"]].u3 && xs.sections[ind].u3 !== "0")
      xs[xs.sections[ind].type].u3 = true;
    else xs.sections[ind].u3 = "";
    if (!xs[xs.sections[ind]["type"]].u4 && xs.sections[ind].u4 !== "0")
      xs[xs.sections[ind].type].u4 = true;
    else xs.sections[ind].u4 = "";
    if (!xs[xs.sections[ind]["type"]].u5 && xs.sections[ind].u5 !== "0")
      xs[xs.sections[ind].type].u5 = true;
    else xs.sections[ind].u5 = "";
    xs.sections[ind].done = true;
    if (
      this.state.easy.u1 &&
      this.state.easy.u2 &&
      this.state.easy.u3 &&
      this.state.easy.u4 &&
      this.state.easy.u5 &&
      this.state.medium.u1 &&
      this.state.medium.u2 &&
      this.state.medium.u3 &&
      this.state.medium.u4 &&
      this.state.medium.u5 &&
      this.state.hard.u1 &&
      this.state.hard.u2 &&
      this.state.hard.u3 &&
      this.state.hard.u4 &&
      this.state.hard.u5
    )
      alert("No more sections possible");
    else
      xs.sections.push({
        sname: "",
        marks: "",
        type: "easy",
        u1: "",
        u2: "",
        u3: "",
        u4: "",
        u5: "",
        done: false,
      });
    this.setState({ ...xs, tAddModal: !this.state.tAddModal });
  }

  handleMonth(e) {
    this.setState({ my: e });
  }

  handleDet(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.state.isloading) {
      return <WaveTopBottomLoading />;
    } else
      return (
        <div>
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <FormGroup>
              <Row style={{ marginTop: "3%" }} xs={12}>
                <Col md={12} lg={4}>
                  <Label for="my">Month and Year</Label>
                  <DatePicker
                    required
                    selected={this.state.my}
                    onChange={(date) => this.handleMonth(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    minDate={new Date()}
                  />
                </Col>
                <Col md={12} lg={4}>
                  <Label for="maxMarks">Max Marks</Label>
                  <Input
                    type="number"
                    name="maxMarks"
                    value={this.state.maxMarks}
                    onChange={(e) => this.handleDet(e)}
                    min={0}
                    required
                  />
                </Col>
                <Col md={12} lg={4}>
                  <Label for="duration">Duration:</Label>
                  <Input
                    type="number"
                    name="duration"
                    value={this.state.duration}
                    onChange={(e) => this.handleDet(e)}
                    min={0}
                    required
                  />
                </Col>
              </Row>
            </FormGroup>
            {this.state.sections.map((question, ind) => (
              <div key={ind}>
                <div style={{ marginLeft: "20vw", fontSize: "1.3em" }}>
                  Details for Section {ind + 1}
                </div>
                <Row>
                  <Col md={12} lg={8}>
                    <FormGroup>
                      <Label for="name">Name of Section</Label>
                      <Input
                        type="text"
                        name="sname"
                        value={this.state.sections[ind]["sname"]}
                        onChange={(e) => this.handleInput(ind, e)}
                        required
                      />
                      <FormText color="muted">
                        Eg: Answer Any Five of the Following
                      </FormText>
                    </FormGroup>
                  </Col>
                  <Col md={12} lg={4}>
                    <FormGroup>
                      <Label for="marks">Marks</Label>
                      <Input
                        type="number"
                        name="marks"
                        value={this.state.sections[ind]["marks"]}
                        onChange={(e) => this.handleInput(ind, e)}
                        required
                        min={0}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <FormGroup>
                      <Label for="type"> Select Diffculty Level</Label>
                      <Input
                        type="select"
                        name="type"
                        onChange={(e) => this.handleInput(ind, e)}
                        disabled={this.state.sections[ind]["done"]}
                        required
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} lg="auto">
                    <FormGroup>
                      <Label> Questions from Unit-1</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {
                              this.state.sublens[
                                this.state.sections[ind]["type"]
                              ]["u1"]
                            }
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="number"
                          name="u1"
                          onChange={(e) => this.handleInput(ind, e)}
                          value={this.state.sections[ind]["u1"]}
                          disabled={
                            this.state[this.state.sections[ind]["type"]][
                              "u1"
                            ] || this.state.sections[ind]["done"]
                          }
                          max={
                            this.state.sublens[
                              this.state.sections[ind]["type"]
                            ]["u1"]
                          }
                          min={0}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={12} lg="auto">
                    <FormGroup>
                      <Label> Questions from Unit-2</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {
                              this.state.sublens[
                                this.state.sections[ind]["type"]
                              ]["u2"]
                            }
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="number"
                          name="u2"
                          onChange={(e) => this.handleInput(ind, e)}
                          value={this.state.sections[ind]["u2"]}
                          disabled={
                            this.state[this.state.sections[ind]["type"]][
                              "u2"
                            ] || this.state.sections[ind]["done"]
                          }
                          max={
                            this.state.sublens[
                              this.state.sections[ind]["type"]
                            ]["u2"]
                          }
                          min={0}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={12} lg="auto">
                    <FormGroup>
                      <Label> Questions from Unit-3</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {
                              this.state.sublens[
                                this.state.sections[ind]["type"]
                              ]["u3"]
                            }
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="number"
                          name="u3"
                          onChange={(e) => this.handleInput(ind, e)}
                          value={this.state.sections[ind]["u3"]}
                          disabled={
                            this.state[this.state.sections[ind]["type"]][
                              "u3"
                            ] || this.state.sections[ind]["done"]
                          }
                          max={
                            this.state.sublens[
                              this.state.sections[ind]["type"]
                            ]["u3"]
                          }
                          min={0}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={12} lg="auto">
                    <FormGroup>
                      <Label> Questions from Unit-4</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {
                              this.state.sublens[
                                this.state.sections[ind]["type"]
                              ]["u4"]
                            }
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="number"
                          name="u4"
                          onChange={(e) => this.handleInput(ind, e)}
                          value={this.state.sections[ind]["u4"]}
                          disabled={
                            this.state[this.state.sections[ind]["type"]][
                              "u4"
                            ] || this.state.sections[ind]["done"]
                          }
                          max={
                            this.state.sublens[
                              this.state.sections[ind]["type"]
                            ]["u4"]
                          }
                          min={0}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md={12} lg="auto">
                    <FormGroup>
                      <Label> Questions from Unit-5</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            {
                              this.state.sublens[
                                this.state.sections[ind]["type"]
                              ]["u5"]
                            }
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="number"
                          name="u5"
                          onChange={(e) => this.handleInput(ind, e)}
                          value={this.state.sections[ind]["u5"]}
                          disabled={
                            this.state[this.state.sections[ind]["type"]][
                              "u5"
                            ] || this.state.sections[ind]["done"]
                          }
                          max={
                            this.state.sublens[
                              this.state.sections[ind]["type"]
                            ]["u5"]
                          }
                          min={0}
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <FormText color="muted">
                  *If no question required keep 0 <br></br>
                  *Every Diffculty level has limited Questions in particular
                  unit, it will Automatically shows no of questions if you
                  exceed.
                </FormText>
              </div>
            ))}
            <Row style={{ margin: "2%" }}>
              <Col md={4}>
                <Button onClick={(e) => this.addhandleToggle()} color="primary">
                  Add more
                </Button>
              </Col>
              <br />
              <br />
              <Col md={4}>
                <Button role="submit" color="success">
                  Submit
                </Button>
              </Col>
              <br />
              <br />
              <Col md={4}>
                <Button
                  onClick={() => this.removehandleToggle()}
                  color="danger"
                >
                  Remove all
                </Button>
              </Col>
            </Row>
            <div>
              <Modal
                isOpen={this.state.tAddModal}
                toggle={this.addhandleToggle}
              >
                <ModalHeader toggle={this.addhandleToggle}>
                  Adding New Form
                </ModalHeader>
                <ModalBody>
                  Do you Really Want to Add new Form? Selecting Yes, you can't
                  change this section.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => this.handleClick()}>
                    Yes
                  </Button>{" "}
                  <Button
                    color="secondary"
                    onClick={() => this.addhandleToggle()}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
            <div>
              <Modal
                isOpen={this.state.tRemoveModal}
                toggle={this.removehandleToggle}
              >
                <ModalHeader toggle={this.removehandleToggle}>
                  Removing All Forms
                </ModalHeader>
                <ModalBody>
                  Do you Really Want to remove all Forms? Selecting Yes, you
                  can't revert back.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={() => this.handleRemove()}>
                    Yes
                  </Button>{" "}
                  <Button
                    color="secondary"
                    onClick={() => this.removehandleToggle()}
                  >
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </Form>
        </div>
      );
  }
}

export default Custome;
