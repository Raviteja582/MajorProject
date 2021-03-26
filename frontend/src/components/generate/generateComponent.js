import React, { Component, useCallback } from "react";
import Select from "react-select";
import "./style.css";
import { connect } from "react-redux";
import { fetchSubjects } from "../../redux/ActionCreators";
import { withRouter } from "react-router";
import { Table } from "reactstrap";

const mapStateToProps = (state) => {
	return {
		subjects: state.subjects,
	};
};

const mapDispatchToProps = (dispatch) => ({
	fetchSubjects: () => dispatch(fetchSubjects()),
});

class Generate extends Component {
	constructor() {
		super();
		this.state = {
			ans: {},
			options: "",
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	async componentDidMount() {
		await this.props.fetchSubjects();
		this.setState({ options: this.props.subjects.subjects });
	}
	handleSubmit(e) {
		console.log(e);
		this.setState({
			ans: {
				...this.state.ans,
				Name: e.label,
				Code: e.value,
				Department: e.depName,
				Year: e.year,
				Semester: e.semester,
			},
		});
	}
	render() {
		return (
			<div className="container">
				<div className="list1">
					<Select
						options={this.state.options}
						value={this.state.ans}
						onChange={this.handleSubmit}
						placeholder="enter the code"
						isSearchable
						onMenuOpen={() => this.setState({ ans: "" })}
					/>
					<Table hover className="tables" size="sm" bordered>
						<thead>
							<tr>
								<th>Subject</th>
								<th>Details</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row"> Name </th>
								<td> {this.state.ans.Name}</td>
							</tr>
							<tr>
								<th scope="row"> Code </th>
								<td> {this.state.ans.Code}</td>
							</tr>
							<tr>
								<th scope="row"> Department</th>
								<td> {this.state.ans.Department}</td>
							</tr>
							<tr>
								<th scope="row"> Year </th>
								<td> {this.state.ans.Year}</td>
							</tr>
							<tr>
								<th scope="row"> Semester </th>
								<td> {this.state.ans.Semester}</td>
							</tr>
						</tbody>
					</Table>
				</div>
				<div className="list2">
                    

            </div>
				<div className="list1">
					<h4>Number of Units for the Subject</h4>
					<ul style={{ paddingLeft: "10em" }}>
						<li>1</li>
						<li>2</li>
						<li>3</li>
						<li>4</li>
						<li>5</li>
					</ul>
            
					<h4> Types of Marks for Each Question </h4>
					<Table hover bordered size="sm" className="tables">

						<thead>
							<tr>
								<th>Diffculty</th>
								<th>Min Marks</th>
								<th>Max Marks</th>
							</tr>
						</thead>
							<tbody>
								<tr>
									<th scope="row">Easy</th>
									<td>1</td>
									<td>3</td>
								</tr>
							<tr>
								<th scope="row">Medium</th>
								<td>3</td>
								<td>5</td>
							</tr>
            
							</tbody>
						<tr>
							<th scope="row">Hard</th>
							<td>7</td>
							<td>10</td>
						</tr>
					</Table>
				</div>
			</div>
		);
	}
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Generate)
);
