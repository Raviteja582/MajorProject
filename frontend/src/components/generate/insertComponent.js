import React, { Component } from "react";
import "./style.css";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Input,
	Button
} from "reactstrap";

class Insert extends Component {
	constructor() {
		super();
		this.state = { values: [{ value: null }] };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearAll = this.clearAll.bind(this);
	}

	clearAll() {
		this.setState({ values: [{ value: null }] });
	}

	handleChange(i, event) {
		let values = [...this.state.values];
		values[i].value = event.target.value;
		this.setState({ values });
	}

	addClick() {
		this.setState((prevState) => ({
			values: [...prevState.values, { value: null }],
		}));
	}

	removeClick(i) {
		let values = [...this.state.values];
		values.splice(i, 1);
		this.setState({ values });
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.values);
	}

	render() {
		return (
			<div>
				<form
					onSubmit={this.handleSubmit}
					style={{
						border: "1px solid black",
						margin: "2px",
						padding: "10px 5px",
						backgroundColor: "white",
					}}
				>
					<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
						<label>Code: <input type="text" minLength="5" maxLength="5" style={{ width: "50%", textTransform: "uppercase", paddingLeft: "30px" }} required /></label>
						<label>Unit: <input type="text" maxLength="1" style={{ width: "25%", paddingLeft: "20px" }} pattern="[1-5]+" required /></label>
						<label>Marks: <input type="text" maxLength="2" style={{ width: "25%", paddingLeft: "20px" }} pattern="[1-9]|10" required /></label>
					</div>
					{this.state.values.map((el, i) => (
						<div key={i} style={{ paddingTop: "5px" }}>

							<InputGroup>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>Q: {i + 1}</InputGroupText>
								</InputGroupAddon>
								<Input
									placeholder="Enter the Question"
									value={el.value || ""}
									required
									onChange={(e) => this.handleChange(i, e)}
								/>
								<InputGroupAddon addonType="append">
									<Button
										size="sm"
										onClick={() => this.removeClick(i)}
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
						onClick={() => this.addClick()}
					>
						Add more
				</Button>

					<Button className="addmore" color="primary" style={{ margin: "7px" }} className="addmore" onClick={() => this.clearAll()}> Clear All </Button>
					<Button className="addmore" role="submit" color="primary" style={{ margin: "7px" }}>
						Submit
				</Button>
				</form>
			</div>
		);
	}
}

export default Insert;
