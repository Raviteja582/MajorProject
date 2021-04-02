import React, { Component } from 'react';
import { getSubjectDetails, getPdf } from '../../redux/ActionCreators';
import Select from "react-select";
import { Button } from 'reactstrap';
//import AllPagesPDFViewer from "./allpages";

class Schema extends Component {
    constructor() {
        super();
        this.state = {
            subjects: [],
            selected: "",
            data:""
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        getSubjectDetails()
            .then((res) => res.json())
            .then((res) => {
                var xs = []
                res.forEach(element => {
                    xs.push({
                        'label': element.subject.name,
                        'value': element.subject.code,
                        'id': element._id,
                        'deptYear': element.subject.department.year,
                        'deptSem': element.subject.department.semester,
                    })
                });
                this.setState({ subjects: xs })
            })
            .catch((err) => alert(err));
    }
    handleInput(e) {
        this.setState({ selected: e });
    }
    handleSubmit(e) {
        getPdf(this.state.selected)
            // // .then((response) => response.json())
            // //.then((response) => response.blob())
            // .then((response) => {
            //     console.log(response);
            //     // const file = new Blob([response.data], {
            //     //     type: 'application/pdf'
            //     // });
            //     // const fileUrl = URL.createObjectURL(file);
            //     // console.log(fileUrl);
            //     // window.open(fileUrl, "_blank");
            // })
            // .catch(error => {
            //     console.log(error);
            // })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Select Subject: </label>
                    <Select options={this.state.subjects}
                        onChange={(e) => this.handleInput(e)}
                    />
                    <Button role="submit" color="primary" style={{ margin: "7px" }} onClick={(e)=>this.handleSubmit(e)}>
                        Submit
					</Button>
                </form>
                {/* <div>
                    <AllPagesPDFViewer pdf={this.state.data} />
                </div> */}
            </div>
        )
    }
}

export default Schema;