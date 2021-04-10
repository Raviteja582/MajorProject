import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, FormText, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';

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
                    sname: '',
                    marks: '',
                    type: 'easy',
                    u1: '',
                    u2: '',
                    u3: '',
                    u4: '',
                    u5: '',
                    done: false,

                }
            ],
            tAddModal: false,
            tRemoveModal: false,
        }
        this.addhandleToggle = this.addhandleToggle.bind(this);
        this.removehandleToggle = this.removehandleToggle.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(ind, e) {
        var xs = [...this.state.sections];
        xs[ind][e.target.name] = e.target.value;
        this.setState({ sections: xs })
    }
    addhandleToggle() {
        var xs = { ...this.state };
        var ind = xs.sections.length - 1;
        if (xs.sections[ind].sname === '' || xs.sections[ind].marks === '' ||
            (xs.sections[ind].u1 === '' && xs[xs.sections[ind]['type']]['u1'] === false) ||
            (xs.sections[ind].u2 === '' && xs[xs.sections[ind]['type']]['u2'] === false) ||
            (xs.sections[ind].u3 === '' && xs[xs.sections[ind]['type']]['u3'] === false) ||
            (xs.sections[ind].u4 === '' && xs[xs.sections[ind]['type']]['u4'] === false)) alert('Please Enter all details!!!!!');
        else
            this.setState({ tAddModal: !this.state.tAddModal });
    }
    removehandleToggle() {
        this.setState({ tRemoveModal: !this.state.tRemoveModal });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSchema(this.state.sections);
        this.handleRemove();
    }

    handleRemove() {
        this.setState({
            tRemoveModal: false,
            sections: [
                {
                    sname: '',
                    marks: '',
                    type: 'easy',
                    u1: '',
                    u2: '',
                    u3: '',
                    u4: '',
                    u5: '',
                    done: false,
                }            
            ]
        })
    }

    handleClick() {
        var xs = { ...this.state };
        var ind = xs.sections.length - 1;
        if (xs.sections[ind].u1 !== "0") xs[xs.sections[ind].type].u1 = true;
        else xs.sections[ind].u1="-1"
        if (xs.sections[ind].u2 !== "0") xs[xs.sections[ind].type].u2 = true;
        else xs.sections[ind].u2="-1"
        if (xs.sections[ind].u3 !== "0") xs[xs.sections[ind].type].u3 = true;
        else xs.sections[ind].u3="-1"
        if (xs.sections[ind].u4 !== "0") xs[xs.sections[ind].type].u4 = true;
        else xs.sections[ind].u4="-1"
        if (xs.sections[ind].u5 !== "0") xs[xs.sections[ind].type].u5 = true;
        else xs.sections[ind].u5 = "-1"
        xs.sections[ind].done = true;
        xs.sections.push({
            sname: '',
            marks: '',
            type: 'easy',
            u1: '',
            u2: '',
            u3: '',
            u4: '',
            u5: '',
            done: false,
        });
        this.setState({ ...xs, tAddModal: !this.state.tAddModal });
    }
    render() {
        return (
            <div>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    {
                        this.state.sections.map((question, ind) => (
                            <div key={ind}>
                                <h3 style={{ margin: "10px", paddingLeft: "30%" }}>
                                    Details for Section {ind + 1}
                                </h3>
                                <Row>
                                    <Col sm={8}>
                                        <FormGroup>
                                            <Label for="name">Name of Section</Label>                                                
                                            <Input type="text"
                                                name="sname"
                                                value={this.state.sections[ind]['sname']}
                                                onChange={(e) => this.handleInput(ind, e)}
                                                required
                                            />
                                            <FormText color="muted">Eg: Answer Any Five of the Following</FormText>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <FormGroup>
                                            <Label for="marks">Marks
                                            </Label>
                                            <Input type="number"
                                                name="marks"
                                                value={this.state.sections[ind]['marks']}
                                                onChange={(e) => this.handleInput(ind, e)}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <FormGroup>
                                        <Label for="type"> Select Diffculty Level
                                        </Label>
                                        <Input type="select" name="type"
                                            onChange={(e) => this.handleInput(ind, e)}
                                            disabled={this.state.sections[ind]['done']} required >
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="hard">Hard</option>
                                        </Input>
                                    </FormGroup>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label> Questions from Unit-1
                                            </Label>
                                            <Input type="number"
                                                name="u1"
                                                onChange={(e) => this.handleInput(ind, e)}
                                                value={this.state.sections[ind]['u1']}
                                                disabled={(this.state[this.state.sections[ind]['type']]['u1'] && this.state.sections[ind]['u1'] === '') || this.state.sections[ind]['u1'] === "-1"}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label> Questions from Unit-2
                                            </Label>
                                            <Input type="number"
                                                name="u2"
                                                onChange={(e) => this.handleInput(ind, e)}
                                                value={this.state.sections[ind]['u2']}
                                                disabled={(this.state[this.state.sections[ind]['type']]['u2'] && this.state.sections[ind]['u2'] === '') || this.state.sections[ind]['u2'] === "-1"}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label> Questions from Unit-3
                                            </Label>
                                            <Input type="number"
                                                name="u3"
                                                onChange={(e) => this.handleInput(ind, e)}
                                                value={this.state.sections[ind]['u3']}
                                                disabled={(this.state[this.state.sections[ind]['type']]['u3'] && this.state.sections[ind]['u3'] === '') || this.state.sections[ind]['u3'] === "-1"}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label> Questions from Unit-4
                                            </Label>
                                            <Input type="number"
                                                name="u4"
                                                onChange={(e) => this.handleInput(ind, e)}
                                                value={this.state.sections[ind]['u4']}
                                                disabled={(this.state[this.state.sections[ind]['type']]['u4'] && this.state.sections[ind]['u4'] === '') || this.state.sections[ind]['u4'] === "-1"}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label> Questions from Unit-5
                                            </Label>
                                            <Input type="number"
                                                name="u5"
                                                onChange={(e) => this.handleInput(ind, e)}
                                                value={this.state.sections[ind]['u5']}
                                                disabled={(this.state[this.state.sections[ind]['type']]['u5'] && this.state.sections[ind]['u5'] === '') || this.state.sections[ind]['u5'] === "-1"}
                                                required
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormText color="muted">
                                    *If no question required keep 0
                                </FormText>
                            </div>
                        ))
                    }
                    <Row style={{ margin: "2%" }}>
                        <Col sm={4}>
                            <Button onClick={(e) => this.addhandleToggle()} color="primary" >
                                Add more
                        </Button>
                        </Col>
                        <Col sm={4}>
                            <Button role="submit" color="success" >
                                Submit
                        </Button>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={() => this.removehandleToggle()} color="danger" >
                                Remove All
                        </Button>
                        </Col>
                    </Row>
                    <div>
                        <Modal isOpen={this.state.tAddModal} toggle={this.addhandleToggle}>
                            <ModalHeader toggle={this.addhandleToggle}>Adding New Form</ModalHeader>
                            <ModalBody>
                                Do you Really Want to Add new Form? Selecting Yes, you can't change this section.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.handleClick()}>Yes</Button>{' '}
                                <Button color="secondary" onClick={() => this.addhandleToggle()}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        <Modal isOpen={this.state.tRemoveModal} toggle={this.removehandleToggle}>
                            <ModalHeader toggle={this.removehandleToggle}>Removing All Forms</ModalHeader>
                            <ModalBody>
                                Do you Really Want to remove all Forms? Selecting Yes, you can't revert back.
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => this.handleRemove()}>Yes</Button>{' '}
                                <Button color="secondary" onClick={() => this.removehandleToggle()}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </Form>
            </div>
        )
    }
}

export default Custome;