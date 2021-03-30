import React, { Component } from 'react';
import { Table } from 'reactstrap';

class Details extends Component {
    render() {
        return (
            <div>
                <h4>Number of Units for the Subject</h4>
                <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", margin: "2px" }}>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                </div>
                <h4> Types of Marks for Each Question </h4>
                <Table hover bordered size="sm" className="tables">
                    <thead>
                        <tr>
                            <th>Diffculty</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">Easy</th>
                            <td>2</td>
                        </tr>
                        <tr>
                            <th scope="row">Medium</th>
                            <td>5</td>
                        </tr>
                        <tr>
                            <th scope="row">Hard</th>
                            <td>10</td>
                        </tr>
                    </tbody>

                </Table>
            </div>
        )
    }
}

export default Details;