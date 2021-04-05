import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
    Form,
} from "reactstrap";

class Edit extends Component {

    render() {
        if (this.props.isLoading)
            return (
                <div style={{width: "100vw"}}>
                    <ReactLoading type={"balls"} color={"red"} height="30%" width="40%" />
                </div>
            )
        else if (this.props.isEmpty)
            return (
                <h1>
                    Please Fill the Details Above
                </h1>
            )
        else if (this.props.questions.length === 0) {
            return (
                <div>
                    No Questions to display
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