import React, { Component } from "react";
import "./style.css";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	Button,
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
						<label>
							Code:{" "}
							<input
								type="text"
								minLength="5"
								maxLength="5"
								name="code"
								value={this.props.formd.code}
								onChange={(e) => this.props.handleInput(this.props.index, -1, e)}
								style={{
									width: "50%",
									textTransform: "uppercase",
									paddingLeft: "30px",
								}}
								required
							/>
						</label>
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
								required
							/>
						</label>
						<label>
							Marks:{" "}
							<input
								type="text"
								maxLength="2"
								name="marks"
								value={this.props.formd.marks}
								onChange={(e) => this.props.handleInput(this.props.index, -1, e)}
								style={{ width: "25%", paddingLeft: "20px" }}
								pattern="[1-9]|10"
								required
							/>
						</label>
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
				</div>
			</div>
		);
	}
}

export default Insert;
