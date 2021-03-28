import React, { Component } from "react";
import "./style.css";
import { Button } from "reactstrap";
import Insert from "./insertComponent";
import Details from "./numberComponent";
import Subject from './subjectComponent';

class Alpha extends Component {
	constructor() {
		super();
		this.state = {
			ques: [
				{
					code: "",
					unit: "",
					marks: "",
					values: [{ value: null }]
				}
			]
		};

		this.handleInput = this.handleInput.bind(this);
		this.removeClick = this.removeClick.bind(this);
		this.addFormClick = this.addFormClick.bind(this);
		this.formClearAll = this.formClearAll.bind(this);
		this.handleSubmit2 = this.handleSubmit2.bind(this);
		this.addClick = this.addClick.bind(this);
	}
	
	addClick() {
		this.setState((prevState) => ({
			ques: [...prevState.ques, { values: [{ value: null }] }],
		}));
	}

	addFormClick(ind) {
		var xs = [...this.state.ques];
		xs[ind].values.push({ value: null });
		this.setState({ ques: xs });
	}

	formClearAll(ind) {
		var xs = [...this.state.ques];
		xs[ind].values = [{ value: null }];
		this.setState({ ques: xs });
	}

	handleInput(ind, i, e) {
		var xs = [...this.state.ques];
		if (i === -1)
			xs[ind] = { ...xs[ind], [e.target.name]: e.target.value }
		else
			xs[ind].values[i].value = e.target.value;
		this.setState({ ques: xs });
	}

	removeClick(ind, i) {
		var xs = [...this.state.ques];
		xs[ind].values.splice(i, 1);
		this.setState({ ques: xs });
	}

	handleSubmit2(e) {
		e.preventDefault();
		console.log(this.state.ques);
		this.setState({ ques: [
			{
				code: "",
				unit: "",
				marks: "",
				values: [{ value: null }]
			}
		]})
	}

	render() {
		return (
			<div className="container">
				<div className="list1">
					<Subject subjects={this.props.subjects} fetchSubjects={()=> this.props.fetchSubjects}/>
					<Details />
				</div>
				<div className="list2">
					<form onSubmit={this.handleSubmit2}>
						{
							this.state.ques.map((el, i) => (
								
								<Insert index={i} formd={el}
									handleInput={this.handleInput}
									removeClick={this.removeClick}
									addFormClick={this.addFormClick}
									formClearAll={this.formClearAll}
								/>
							)
							)
						}
						<Button
							color="primary"
							style={{ margin: "7px" }}
							className="addmore"
							onClick={() => this.addClick()}
						>
							Add more
						</Button>
						<Button className="addmore" role="submit" color="primary" style={{ margin: "7px" }}>
							Submit
						</Button>
					</form>
				</div>
			</div>
		);
	}
}

export default Alpha;
