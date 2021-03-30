import React, { Component } from "react";
import "./style.css";
import { Button } from "reactstrap";
import Insert from "./insertComponent";
import Details from "./numberComponent";
import { postQuestion } from '../../redux/ActionCreators';

class Alpha extends Component {
	constructor() {
		super();
		this.state = {
			options: [],
			ques: [
				{
					code: {
						value: "",
						id: ""
					},
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

	componentDidMount() {
		this.setState({ options: this.props.subjects.subjects });
	}

	addClick() {
		this.setState((prevState) => ({
			ques: [...prevState.ques, {
				code: {
					value: "",
					id: ""
				},
				unit: "",
				marks: "", values: [{ value: null }]
			}],
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
		if (i === -2) {
			xs[ind].code.value = e.value;
			xs[ind].code.id = e.id;
			console.log(xs[ind].code)
		}
		else if (i === -1)
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
		var xs = {}
		var ss = this.state.ques
		var j;
		for (var i = 0; i < this.state.ques.length; i++) {
			if (!xs[ss[i].code.id]) xs[ss[i].code.id] = {
				easy: { u1: [], u2: [], u3: [], u4: [], u5: [] },
				medium: { u1: [], u2: [], u3: [], u4: [], u5: [] },
				hard: { u1: [], u2: [], u3: [], u4: [], u5: [] }
			}
			if (ss[i].marks === '2') {
				for (j = 0; j < this.state.ques[i].values.length; j++) {
					if (ss[i].unit === '1') xs[ss[i].code.id].easy.u1.push({ name: ss[i].values[j].value, teacher: this.props.id });
					else if (ss[i].unit === '2') xs[ss[i].code.id].easy.u2.push({ name: ss[i].values[j].value, teacher: this.props.id });
					else if (ss[i].unit === '3') xs[ss[i].code.id].easy.u3.push({ name: ss[i].values[j].value, teacher: this.props.id });
					else if (ss[i].unit === '4') xs[ss[i].code.id].easy.u4.push({ name: ss[i].values[j].value, teacher: this.props.id });
					else xs[ss[i].code.id].easy.u5.push({ name: ss[i].values[j].value, teacher: this.props.id });
				}
			}
			else if (ss[i].marks === '5') {
				for (j = 0; j < this.state.ques[i].values.length; j++) {
					if (ss[i].unit === '1') xs[ss[i].code.id].medium.u1.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '2') xs[ss[i].code.id].medium.u2.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '3') xs[ss[i].code.id].medium.u3.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '4') xs[ss[i].code.id].medium.u4.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else xs[ss[i].code.id].medium.u5.push({ name: ss[i].values[j].value, teacher: this.props.id })
				}
			}
			else {
				for (j = 0; j < this.state.ques[i].values.length; j++) {
					if (ss[i].unit === '1') xs[ss[i].code.id].hard.u1.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '2') xs[ss[i].code.id].hard.u2.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '3') xs[ss[i].code.id].hard.u3.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else if (ss[i].unit === '4') xs[ss[i].code.id].hard.u4.push({ name: ss[i].values[j].value, teacher: this.props.id })
					else xs[ss[i].code.id].hard.u5.push({ name: ss[i].values[j].value, teacher: this.props.id })
				}
			}
		}
		const x = postQuestion(xs);
		x.then(() => {
			alert("successfully inserted");
			this.setState({
				options: [],
				ques: [
					{
						code: {
							value: "",
							id: ""
						},
						unit: "",
						marks: "",
						values: [{ value: null }]
					}
				]
			})
		}, () => {
			alert('Failed');
		});
	}

	render() {
		return (
			<div className="container">
				<div className="list1">
					<Details />
				</div>
				<div className="list2">
					<form onSubmit={this.handleSubmit2}>
						{
							this.state.ques.map((el, i) => (

								<Insert index={i} formd={el}
									options={this.state.options}
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
