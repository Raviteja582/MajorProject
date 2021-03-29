import React, { Component } from 'react';
import Select from "react-select";
import { Table } from 'reactstrap';
import './style.css';

class Subject extends Component{
    constructor() {
        super();
        this.state = {
            ans: {},
			options: ""
        }
        this.handleSubmit1 = this.handleSubmit1.bind(this);
	}
	componentDidMount() {
		this.setState({ options: this.props.subjects.subjects });
	}
    handleSubmit1(e) {
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
            <div>
                <Select
						options={this.state.options}
						value={this.state.ans}
						onChange={this.handleSubmit1}
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
        )
    }
}

export default Subject;