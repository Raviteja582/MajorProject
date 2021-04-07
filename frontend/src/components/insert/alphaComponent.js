import React, { Component } from "react";
import "./style.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Insert from "./insertComponent";
import Details from "./numberComponent";
import { postQuestion, fetchSubjects } from '../ActionCreators';
import localStorage from 'local-storage';
import { WaveTopBottomLoading } from 'react-loadingg';

class Alpha extends Component {
	constructor() {
		super();
		this.state = {
			options: [],
			isloading: false,
			tRemove: false,
			tRemoveAll: false,
			ques: [
				{
					code: {
						value: "",
						id: ""
					},
					dummySubject: "",
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
		this.removeForm = this.removeForm.bind(this);
		this.addClick = this.addClick.bind(this);
		this.removeAllForm = this.removeAllForm.bind(this);
		this.toggleRemove = this.toggleRemove.bind(this);
		this.toggleRemoveAll = this.toggleRemoveAll.bind(this);

	}

	componentDidMount() {
		this.setState({ isloading: true });
		fetchSubjects()
			.then(response => response.json())
			.then(subjects => {
				var xs = [];
				for (var i = 0; i < subjects.length; i++) {
					xs.push({ id: subjects[i]._id, label: subjects[i].name, value: subjects[i].code, depId: subjects[i].department._id, depName: subjects[i].department.name, year: subjects[i].department.year, semester: subjects[i].department.semester });
				}
				this.setState({ options: xs, isloading: false });
			})
			.catch(error => alert(error));
	}

	addClick() {
		this.setState((prevState) => ({
			ques: [...prevState.ques, {
				code: {
					value: "",
					id: ""
				},
				dummySubject: "",
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
			xs[ind].dummySubject = e;
			xs[ind].code.value = e.value;
			xs[ind].code.id = e.id;
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

	removeForm(ind) {
		var xs = [...this.state.ques];
		if (xs.length === 1) this.setState({ tRemove: !this.state.tRemove });
		else {
			xs.splice(ind, 1);
			this.setState({ ques: xs, tRemove: !this.state.tRemove });
		}
	}

	removeAllForm() {
		this.setState({
			ques: [
				{
					code: {
						value: "",
						id: ""
					},
					unit: "",
					marks: "",
					dummySubject: "",
					values: [{ value: null }]
				}
			],
			tRemoveAll: !this.state.tRemoveAll
		})
	}

	toggleRemoveAll() {
		this.setState({ tRemoveAll: !this.state.tRemoveAll })
	}
	toggleRemove() {
		this.setState({ tRemove: !this.state.tRemove })
	}

	handleSubmit2(e) {
		e.preventDefault();
		var xs = {}
		var ss = this.state.ques
		var j;
		for (var i = 0; i < this.state.ques.length; i++) {
			if (xs[ss[i].code.id] === undefined) xs[ss[i].code.id] = {
				easy: { u1: [], u2: [], u3: [], u4: [], u5: [] },
				medium: { u1: [], u2: [], u3: [], u4: [], u5: [] },
				hard: { u1: [], u2: [], u3: [], u4: [], u5: [] }
			}
			if (ss[i].marks === '2') {
				for (j = 0; j < this.state.ques[i].values.length; j++) {
					if (ss[i].unit === '1') xs[ss[i].code.id].easy.u1.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id });
					else if (ss[i].unit === '2') xs[ss[i].code.id].easy.u2.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id });
					else if (ss[i].unit === '3') xs[ss[i].code.id].easy.u3.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id });
					else if (ss[i].unit === '4') xs[ss[i].code.id].easy.u4.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id });
					else xs[ss[i].code.id].easy.u5.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id });
				}
			}
			else if (ss[i].marks === '5') {
				for (j = 0; j < this.state.ques[i].values.length; j++) {
					if (ss[i].unit === '1') xs[ss[i].code.id].medium.u1.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id })
					else if (ss[i].unit === '2') xs[ss[i].code.id].medium.u2.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id })
					else if (ss[i].unit === '3') xs[ss[i].code.id].medium.u3.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id })
					else if (ss[i].unit === '4') xs[ss[i].code.id].medium.u4.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id })
					else xs[ss[i].code.id].medium.u5.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id })
				}
			}
			else {
				for (j = 0; j < this.state.ques[i].values.length; j++) {
					if (ss[i].unit === '1') xs[ss[i].code.id].hard.u1.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id })
					else if (ss[i].unit === '2') xs[ss[i].code.id].hard.u2.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id })
					else if (ss[i].unit === '3') xs[ss[i].code.id].hard.u3.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id })
					else if (ss[i].unit === '4') xs[ss[i].code.id].hard.u4.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id })
					else xs[ss[i].code.id].hard.u5.push({ name: ss[i].values[j].value, teacher: localStorage.get('user').id })
				}
			}
		}
		this.setState({ isloading: true });
		const x = postQuestion(xs)

		x.then((res) => res.json())
			.then(res => {
				if (res.success) {
					alert('Success');
					this.setState({
						isloading: false,
						ques: [
							{
								code: {
									value: "",
									id: ""
								},
								unit: "",
								marks: "",
								dummySubject: "",
								values: [{ value: null }]
							}
						]
					})
				} else {
					alert('Failed');
					alert('Please Logout and Login Back');
				}
			})
			.catch((err) => alert('Please Logout and Login Back'));
	}

	render() {
		if (this.state.isloading) {
			return (
				<WaveTopBottomLoading />
			)
		}
		else
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
										toggler={this.state.tRemove}
										options={this.state.options}
										handleInput={this.handleInput}
										removeClick={this.removeClick}
										addFormClick={this.addFormClick}
										formClearAll={this.formClearAll}
										removeForm={this.removeForm}
										toggleRemove={this.toggleRemove}
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
							<Button
								color="danger"
								style={{ marginLeft: "65%" }}
								className="addmore"
								onClick={() => this.toggleRemoveAll()}
							>
								Remove All
						</Button>
							<Modal isOpen={this.state.tRemoveAll} toggle={() => this.toggleRemoveAll()}>
								<ModalHeader toggle={() => this.toggleRemoveAll()}>Modal title</ModalHeader>
								<ModalBody>
									Do you want remove all the Questions?
        						</ModalBody>
								<ModalFooter>
									<Button color="secondary" onClick={() => this.toggleRemoveAll()}>Cancel</Button>{' '}
									<Button color="danger" onClick={()=>this.removeAllForm()}>Yes</Button>
								</ModalFooter>
							</Modal>
						</form>
					</div>
				</div>
			);
	}
}

export default Alpha;
