import React, { Component } from "react";
import Select from "react-select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Label,
} from "reactstrap";

class Insert extends Component {
  render() {
    return (
      <div style={{ border: "1px solid" }}>
        <Row xs={12} style={{ margin: "1em" }}>
          <Col md={12} lg={4}>
            <Label>Subject: </Label>
            <Select
              options={this.props.options}
              onChange={(e) => this.props.handleInput(this.props.index, -2, e)}
              placeholder="Select subject"
              value={this.props.formd.dummySubject}
              isSearchable
            />
          </Col>
          <Col md={12} lg={4}>
            <Label>
              Unit: <br />
              <Input
                type="text"
                maxLength="1"
                name="unit"
                value={this.props.formd.unit}
                onChange={(e) =>
                  this.props.handleInput(this.props.index, -1, e)
                }
                pattern="[1-5]+"
                placeholder="Unit"
                required
              />
            </Label>
          </Col>
          <Col md={12} lg={4}>
            <Label>
              Marks: <br />
              <Input
                type="text"
                maxLength="2"
                name="marks"
                value={this.props.formd.marks}
                onChange={(e) =>
                  this.props.handleInput(this.props.index, -1, e)
                }
                pattern="[25]|10"
                placeholder="Marks"
                required
              />
            </Label>
          </Col>
        </Row>
        {this.props.formd.values.map((el, i) => (
          <Row xs={12} style={{ margin: "0.5em" }}>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{i + 1}</InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Enter the Question"
                value={el.value || ""}
                required
                onChange={(e) => this.props.handleInput(this.props.index, i, e)}
              />
              <InputGroupAddon addonType="append">
                <Button
                  onClick={() => this.props.removeClick(this.props.index, i)}
                >
                  X
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Row>
        ))}
        <Row xs={12} style={{ margin: "1em" }} justifyContent="space-around">
          <Col sm={12} md={4}>
            <Button
              color="primary"
              onClick={() => this.props.addFormClick(this.props.index)}
            >
              Add more
            </Button>
          </Col>
          <br />
          <br />
          <Col sm={12} md={4}>
            <Button
              color="primary"
              onClick={() => this.props.formClearAll(this.props.index)}
            >
              {" "}
              Clear All{" "}
            </Button>
          </Col>
          <br />
          <br />
          <Col sm={12} md={4}>
            <Button color="danger" onClick={() => this.props.toggleRemove()}>
              {" "}
              Remove{" "}
            </Button>
          </Col>
        </Row>
        <Modal
          isOpen={this.props.toggler}
          toggle={() => this.props.toggleRemove()}
        >
          <ModalHeader toggle={() => this.props.toggleRemove()}>
            Modal title
          </ModalHeader>
          <ModalBody>Do you want remove the Questions?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => this.props.toggleRemove()}>
              Cancel
            </Button>{" "}
            <Button
              color="danger"
              onClick={() => this.props.removeForm(this.props.index)}
            >
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Insert;
