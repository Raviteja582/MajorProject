import React, { Component } from "react";
import "./style.css";
import Select from "react-select";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

class Insert extends Component {
	render() {
		return (
			<div>
				<div style={{
					border: "1px solid black",
					margin: "2px",
					padding: "10px 5px",
					backgroundColor: "white",
				}}>

					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
						}}
					>

						<div style={{ width: "40%", marginRight: "30px", marginLeft: "20px" }}>
							<Select
								options={this.props.options}
								onChange={(e) => this.props.handleInput(this.props.index, -2, e)}
								placeholder="Select The subject"
								value={this.props.formd.dummySubject}
								isSearchable
							//onMenuOpen={() => this.setState({ ans: "" })}
							/>
						</div>
						<div>
							<label>
								Unit:{" "}
								<input
									type="text"
									maxLength="1"
									name="unit"
									value={this.props.formd.unit}
									onChange={(e) => this.props.handleInput(this.props.index, -1, e)}
									style={{ width: "25%", paddingLeft: "20px" }}
									pattern="[1-5]+"
									placeholder="Unit"
									required
								/>
							</label>
						</div>
						<div>
							<label>
								Marks:{" "}
								<input
									type="text"
									maxLength="2"
									name="marks"
									value={this.props.formd.marks}
									onChange={(e) => this.props.handleInput(this.props.index, -1, e)}
									style={{ width: "25%", paddingLeft: "20px" }}
									pattern="[25]|10"
									placeholder="Marks"
									required
								/>
							</label>
						</div>
					</div>
					{this.props.formd.values.map((el, i) => (
						<div key={i} style={{ paddingTop: "5px" }}>
							<InputGroup>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>Q: {i + 1}</InputGroupText>
								</InputGroupAddon>
								<Input
									placeholder="Enter the Question"
									value={el.value || ""}
									required
									onChange={(e) =>
										this.props.handleInput(this.props.index, i, e)
									}
								/>
								<InputGroupAddon addonType="append">
									<Button
										size="sm"
										onClick={() => this.props.removeClick(this.props.index, i)}
									>
										X
                  					</Button>
								</InputGroupAddon>
							</InputGroup>
						</div>
					))}
					<Button
						color="primary"
						style={{ margin: "7px" }}
						className="addmore"
						onClick={() => this.props.addFormClick(this.props.index)}
					>
						Add more
          			</Button>

					<Button
						className="addmore"
						color="primary"
						style={{ margin: "7px" }}
						onClick={() => this.props.formClearAll(this.props.index)}
					>
						{" "}
            			Clear All{" "}
					</Button>
					<Button
						className="addmore"
						color="danger"
						style={{ margin: "7px" }}
						onClick={() => this.props.toggleRemove()}
					>
						{" "}
            			Remove{" "}
					</Button>
					<Modal isOpen={this.props.toggler} toggle={() => this.props.toggleRemove()}>
						<ModalHeader toggle={() => this.props.toggleRemove()}>Modal title</ModalHeader>
						<ModalBody>
							Do you want remove the Questions?
        						</ModalBody>
						<ModalFooter>
							<Button color="secondary" onClick={() => this.props.toggleRemove()}>Cancel</Button>{' '}
							<Button color="danger" onClick={() => this.props.removeForm(this.props.index)}>Yes</Button>
						</ModalFooter>
					</Modal>
				</div>
			</div>
		);
	}
}

export default Insert;
