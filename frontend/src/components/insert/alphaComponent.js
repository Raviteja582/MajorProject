import React, { Component } from "react";
import "./style.css";
import { Button } from "reactstrap";
import Insert from "./insertComponent";
import Details from "./numberComponent";
import Subject from './subjectComponent';
import { AllFuntions } from '../../redux/ActionCreators';

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
		var xs = { easy: {}, medium: {}, hard: {} }
		var ss = this.state.ques
		var j;
		for (var i = 0; i < this.state.ques.length; i++) {
			// if (!xs[ss[i].code]) xs[ss[i].code] = {
			// 	easy: { u1: [], u2: [], u3: [], u4: [], u5: [] },
			// 	medium: { u1: [], u2: [], u3: [], u4: [], u5: [] },
			// 	hard: { u1: [], u2: [], u3: [], u4: [], u5: [] }
			// }
			if (ss[i].marks === '2') {
				if (!xs.easy[ss[i].code]) xs.easy[ss[i].code] = { u1: [], u2: [], u3: [], u4: [], u5: [] }
				for (j = 0; j < this.state.ques[i].values.length; j++) {
					if (ss[i].unit === '1') xs.easy[ss[i].code].u1.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '2') xs.easy[ss[i].code].u2.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '3') xs.easy[ss[i].code].u3.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '4') xs.easy[ss[i].code].u4.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '5') xs.easy[ss[i].code].u5.push({ name: ss[i].values[j].value, teacher: this.props.id })
				}
			}
			else if (ss[i].marks === '5') {
				if (!xs.medium[ss[i].code]) xs.medium[ss[i].code] = { u1: [], u2: [], u3: [], u4: [], u5: [] }
				for (j = 0; j < this.state.ques[i].values.length; j++) {
					if (ss[i].unit === '1') xs.medium[ss[i].code].u1.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '2') xs.medium[ss[i].code].u2.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '3') xs.medium[ss[i].code].u3.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '4') xs.medium[ss[i].code].u4.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '5') xs.medium[ss[i].code].u5.push({ name: ss[i].values[j].value, teacher: this.props.id })
				}
			}
			else {
				if (!xs.hard[ss[i].code]) xs.hard[ss[i].code] = { u1: [], u2: [], u3: [], u4: [], u5: [] }
				for (j = 0; j < this.state.ques[i].values.length; j++) {
					if (ss[i].unit === '1') xs.hard[ss[i].code].u1.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '2') xs.hard[ss[i].code].u2.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '3') xs.hard[ss[i].code].u3.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '4') xs.hard[ss[i].code].u4.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '5') xs.hard[ss[i].code].u5.push({ name: ss[i].values[j].value, teacher: this.props.id })
				}
			}
		}

		var x = AllFuntions(xs);
		if (x)
			this.setState({
				ques: [
					{
						code: "",
						unit: "",
						marks: "",
						values: [{ value: null }]
					}
				]
			})
		else alert('Failure');
	}

	render() {
		return (
			<div className="container">
				<div className="list1">
					<Subject subjects={this.props.subjects} fetchSubjects={() => this.props.fetchSubjects} />
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
