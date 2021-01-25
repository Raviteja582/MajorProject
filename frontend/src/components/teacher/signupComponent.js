import React, { Component } from 'react';

class SignUp extends Component{
    constructor(){
        super();
        this.state={
            fisrtname: '',
            lastname: '',
            email: '',
            dob: '',
            phno: '',
            username: '',
            password: ''
        }
    }
    render(){
        return(
            <div>
            <form>
                <div>
                    <label htmlFor="firstName">Name: </label>
                    <input type="text" name="firstName"  id="firstName" value={this.state.firstname} onChange={(e) => this.state.firstname: e.value}/>
                </div>
                <div>
          
            </form>

            </div>
          
        );
    }

}
