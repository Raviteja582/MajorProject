import React, { Component } from 'react';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    Form,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from "reactstrap";

class Edit extends Component {

    render() {
        if (this.props.isEmpty)
            return (
                <div>
                    <Card>
                        <CardImg top width="10%" height="615em" src="/demo.jpg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">Fill The Details</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">See Your Questions which was Inserted.</CardSubtitle>
                            <CardText>Select the Subject, Unit and Diffcutly Level to Access, Modify the statements and Update the Questions.</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        else if (this.props.questions.length === 0) {
            return (
                <div>
                    <Card>
                        <CardImg top width="10%" height="655em" src="/noquestion.png" alt="Card image cap" />
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
                                    />
                                    <InputGroupAddon addonType="append">
                                        <Button
                                            size="sm"
                                            onClick={() => this.props.removeClick(i)}
                                        >
                                            X
                                      </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        ))
                    }
                    <Button color="primary" role="submit">Submit</Button>
                </Form>
            )
        }
    }
}

export default Edit;