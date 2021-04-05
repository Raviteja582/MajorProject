import React, { Component } from 'react';
import { getSubjectDetails, getQuestions, editQuestions } from '../../redux/ActionCreators';
import { Col, Row, Button, Form, FormGroup } from 'reactstrap';
import Select from 'react-select';
import Edit from './editComponent';

class Options extends Component {
    constructor() {
        super();
        this.state = {
            subjects: [],
            selected: "",
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
            selectedUnit: "",
            selectedDiffculty: "",
            questions: [],
            isEmpty: true,
            isLoading: false,
            i1: "",
            i2: "",
            i3: ""
        }
        this.handleSubject = this.handleSubject.bind(this);
        this.handleDiffcutly = this.handleDiffcutly.bind(this);
        this.handleUnit = this.handleUnit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleInput = this.handleInput.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);

    }
    componentDidMount() {
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
                this.setState({ subjects: xs })
            })
            .catch((err) => alert(err));
    }


    handleInput(i, e) {
        var xs = [...this.state.questions]
        xs[i].name = e.target.value;
        this.setState({ questions: xs });
    }

    removeClick(i) {
        var xs = [...this.state.questions]
        xs.splice(i, 1);
        this.setState({ questions: xs });
    }

    handleSubmit1(e) {
        e.preventDefault();
        this.setState({ questions: [] });
        editQuestions(this.state.questions, this.state.selected.id, this.state.selectedDiffculty, this.state.selectedUnit)
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    this.setState({
                        subjects: [],
                        selected: "",
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
                        selectedUnit: "",
                        selectedDiffculty: "",
                        questions: [],
                        isEmpty: true,
                        isLoading: false,
                        i1: "",
                        i2: "",
                        i3: ""
                    })
                    alert('Success');
                }
                else alert('Failure');

                // window.location.reload();
            }).catch((err) => {
                console.log(err);
                alert('Failure');
            })
    }


    handleSubject(e) {
        this.setState({ ...this.state, selected: e, i3: e });
    }
    handleDiffcutly(e) {
        this.setState({ ...this.state, selectedDiffculty: e.value, i1: e });
    }
    handleUnit(e) {
        this.setState({ ...this.state, selectedUnit: e.value, i2: e });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (Object.keys(this.state.selected).length === 0 || this.state.selectedDiffculty === "" || this.state.selectedUnit === "")
            alert("Please Fill all necessary Details");
        else {
            this.setState({ ...this.state, isEmpty: false, isLoading: true });
            var xs = {
                id: this.state.selected.id,
                unit: this.state.selectedUnit
            }
            getQuestions(xs, this.state.selectedDiffculty)
                .then((response) => response.json())
                .then((response) => {
                    console.log(response);
                    this.setState({
                        ...this.state,
                        isEmpty: false, isLoading: false, questions: response,
                    });
                })
        }
    }
    render() {
        return (
            <div>
                <Form>
                    <Row form>
                        <Col md={3}>
                            <FormGroup>
                                <Select options={this.state.subjects}
                                    onChange={(e) => this.handleSubject(e)}
                                    placeholder="Select Subject"
                                    value={this.state.i3}
                                    onMenuOpen={() => { this.setState({ i3: {} }) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>

                                <Select options={this.state.diffcutly}
                                    onChange={(e) => this.handleDiffcutly(e)}
                                    placeholder="Select Diffculty"
                                    value={this.state.i1}
                                    onMenuOpen={() => { this.setState({ i1: {} }) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Select options={this.state.units}
                                    onChange={(e) => this.handleUnit(e)}
                                    placeholder="Select Unit"
                                    value={this.state.i2}
                                    onMenuOpen={() => { this.setState({ i2: {} }) }}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Button color="primary" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <div>
                    <Edit isEmpty={this.state.isEmpty}
                        isLoading={this.state.isLoading}
                        questions={this.state.questions}
                        handleInput={this.handleInput}
                        removeClick={this.removeClick}
                        handleSubmit1={this.handleSubmit1}
                    />
                </div>
            </div>
        )
    }
}

export default Options;