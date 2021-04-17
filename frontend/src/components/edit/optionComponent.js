import React, { Component } from 'react';
import { getSubjectDetails, getQuestions, editQuestions } from '../ActionCreators';
import { Container, Col, Row, Button, Form, FormGroup } from 'reactstrap';
import Select from 'react-select';
import Edit from './editComponent';
import { WaveTopBottomLoading } from 'react-loadingg';

class Options extends Component {
    constructor() {
        super();
        this.state = {
            subjects: [],
            removedQuestions: [],
            diffcutly: [
                { 'label': 'Easy', value: 'easy' },
                { 'label': 'Medium', value: 'medium' },
                { 'label': 'Hard', value: 'hard' }
            ],
            units: [
                { 'label': 'Unit 1', value: 'u1' },
                { 'label': 'Unit 2', value: 'u2' },
                { 'label': 'Unit 3', value: 'u3' },
                { 'label': 'Unit 4', value: 'u4' },
                { 'label': 'Unit 5', value: 'u5' }
            ],
            selectedSubject: "",
            selectedUnit: "",
            selectedDiffculty: "",
            questions: [],
            isEmpty: true,
            isLoading: false,
        }
        this.handleSubject = this.handleSubject.bind(this);
        this.handleDiffcutly = this.handleDiffcutly.bind(this);
        this.handleUnit = this.handleUnit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);

    }
    componentDidMount() {
        if (this.state.subjects.length === 0) {
            this.setState({ isLoading: true });
            getSubjectDetails()
                .then((res) => res.json())
                .then((res) => {
                    var xs = []
                    res.forEach(element => {
                        xs.push({
                            'label': element.subject.name,
                            'value': element.subject.code,
                            'id': element._id,
                            'deptYear': element.subject.department.year,
                            'deptSem': element.subject.department.semester,
                        })
                    });
                    this.setState({ subjects: xs, isLoading: false });
                })
                .catch((err) => {
                    this.setState({ isLoading: false });
                    alert("Can't Cannot to Server!!!");
                    localStorage.clear();
                    window.location.reload();
                });
        }
    }


    handleInput(i, e) {
        var xs = [...this.state.questions]
        xs[i].name = e.target.value;
        this.setState({ questions: xs });
    }

    removeClick(i) {
        var xs = [...this.state.removedQuestions]
        xs[i] = !xs[i];
        this.setState({ removedQuestions: xs });
    }

    handleCancel(e) {
        this.setState({
            selectedSubject: "",
            selectedUnit: "",
            selectedDiffculty: "",
            questions: [],
            removedQuestions: [],
            isEmpty: true,
            isLoading: false,
        })
    }

    handleSubmit1(e) {
        e.preventDefault();
        var xs = [];
        for (var i = 0; i < this.state.questions.length; i++){
            if (!this.state.removedQuestions[i]) {
                xs.push(this.state.questions[i]);
            }
        }
        this.setState({ isLoading: true });
        editQuestions(xs, this.state.selectedSubject.id, this.state.selectedDiffculty.value, this.state.selectedUnit.value)
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    this.setState({
                        selectedSubject: "",
                        selectedUnit: "",
                        selectedDiffculty: "",
                        questions: [],
                        removedQuestions: [],
                        isEmpty: true,
                        isLoading: false,
                    })
                    alert('Successfully Edited!!!');
                } else {
                    this.setState({ isLoading: false });
                    alert('Fail to Edit');
                }
            }).catch((err) => {
                this.setState({ isLoading: false });
                alert("Can't Connect to Server!!!, Logging Out...");
                localStorage.clear();
                window.location.reload();
            })
    }


    handleSubject(e) {
        this.setState({ selectedSubject: e });
    }
    handleDiffcutly(e) {
        this.setState({ selectedDiffculty: e });
    }
    handleUnit(e) {
        this.setState({ selectedUnit: e });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.selectedSubject === '' || this.state.selectedDiffculty === "" || this.state.selectedUnit === "")
            alert("Please Fill all necessary Details");
        else {
            this.setState({ ...this.state, isEmpty: false, isLoading: true });
            var xs = {
                id: this.state.selectedSubject.id,
                unit: this.state.selectedUnit.value
            }
            getQuestions(xs, this.state.selectedDiffculty.value)
                .then((response) => response.json())
                .then((response) => {
                    var xs = new Array(response.length).fill(false);
                    this.setState({
                        ...this.state,
                        isEmpty: false, isLoading: false, questions: response, removedQuestions: xs
                    });
                }).catch((err) => {
                    this.setState({ isLoading: false });
                    alert("Can't Connect to Server!!!, Logging Out...");
                    localStorage.clear();
                    window.location.reload();
                });
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <WaveTopBottomLoading />
            )
        }
        else
            return (
                <Container>
                    <Row style={{ width: "100vw" }}>
                        <Col xs="4">
                            <Form>
                                <FormGroup style={{ margin: "20% auto" }}>
                                    <Select options={this.state.subjects}
                                        onChange={(e) => this.handleSubject(e)}
                                        placeholder="Select Subject"
                                        value={this.state.selectedSubject}
                                        onMenuOpen={() => { this.setState({ selectedSubject: "" }) }}
                                        isDisabled={this.state.questions.length !== 0}
                                    />
                                </FormGroup>
                                <FormGroup style={{ margin: "20% auto" }}>
                                    <Select options={this.state.diffcutly}
                                        onChange={(e) => this.handleDiffcutly(e)}
                                        placeholder="Select Diffculty"
                                        value={this.state.selectedDiffculty}
                                        onMenuOpen={() => { this.setState({ selectedDiffculty: "" }) }}
                                        isDisabled={this.state.questions.length !== 0}

                                    />
                                </FormGroup>
                                <FormGroup style={{ margin: "20% auto" }}>
                                    <Select options={this.state.units}
                                        onChange={(e) => this.handleUnit(e)}
                                        placeholder="Select Unit"
                                        value={this.state.selectedUnit}
                                        onMenuOpen={() => { this.setState({ selectedUnit: "" }) }}
                                        isDisabled={this.state.questions.length !== 0}

                                    />
                                </FormGroup>
                                <FormGroup style={{ margin: "0px 30%" }}>
                                    <Button color="primary" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col xs="8">
                            <Edit isEmpty={this.state.isEmpty}
                                questions={this.state.questions}
                                handleInput={this.handleInput}
                                removeClick={this.removeClick}
                                handleSubmit1={this.handleSubmit1}
                                removedQuestions={this.state.removedQuestions}
                                handleCancel = {this.handleCancel}
                            />
                        </Col>
                    </Row>
                </Container>
            )
    }
}

export default Options;