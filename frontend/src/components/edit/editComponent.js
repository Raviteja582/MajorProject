import React, { Component } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    Form,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
    Row,Col
} from "reactstrap";

class Edit extends Component {

    render() {
        if (this.props.isEmpty)
            return (
                <div>
                    <Card>
                        <CardImg top width="10%" height="615em" src="/img/demo.jpg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">Fill in the Details</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">View the questions which are present in the database</CardSubtitle>
                            <CardText>Select Subject, Unit and Difficulty to Access, Modify and Update the Questions as required.</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        else if (this.props.questions.length === 0) {
            return (
                <div>
                    <Card>
                        <CardImg top width="10%" height="655em" src="/img/noquestion.png" alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">No Questions Found</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">Seems Like No question has Inserted in these Section.</CardSubtitle>
                            <CardText>Go to Insert Option from Above Options and Insert the Question.</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (
                <Form onSubmit={(e) => this.props.handleSubmit1(e)}>
                    {
                        this.props.questions.map((el, i) => (
                            <div key={i} style={{ paddingTop: "5px" }}>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>Q: {i + 1}</InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Enter the Question"
                                        value={el.name || ""}
                                        required
                                        onChange={(e) =>
                                            this.props.handleInput(i, e)
                                        }
                                        disabled={this.props.removedQuestions[i]}
                                    />
                                    <InputGroupAddon addonType="append">
                                        {
                                            !this.props.removedQuestions[i] ?
                                                <Button
                                                    size="sm"
                                                    onClick={() => this.props.removeClick(i)}
                                                    color="danger"
                                                >
                                                    Remove
                                                </Button> : <Button
                                                    size="sm"
                                                    onClick={() => this.props.removeClick(i)}
                                                    color="success"
                                                >
                                                    Add
                                                            </Button>
                                        }
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        ))
                    }
                    <Row>
                        <Col>
                            <Button color="primary" role="submit" style={{ margin: '3%', marginLeft: '40%' }}>Submit</Button>
                        </Col>
                        <Col>
                            <Button color="white" style={{ margin: '3%', marginLeft: '40%', border: '1px solid' }} onClick={(e) => this.props.handleCancel(e)}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            )
        }
    }
}

export default Edit;