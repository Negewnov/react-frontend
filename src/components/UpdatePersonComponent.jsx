import React, { Component } from 'react'
import PersonService from '../services/PersonService';

class UpdatePersonComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            emailId: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.updatePerson = this.updatePerson.bind(this);
    }

    componentDidMount(){
        PersonService.getPersonById(this.state.id).then( (res) =>{
            let person = res.data;
            this.setState({firstName: person.firstName,
                lastName: person.lastName,
                phoneNumber: person.phoneNumber,
                emailId : person.emailId
            });
        });
    }

    updatePerson = (e) => {
        e.preventDefault();
        let person = {firstName: this.state.firstName, lastName: this.state.lastName, phoneNumber: this.state.phoneNumber, emailId: this.state.emailId};
        console.log('person => ' + JSON.stringify(person));
        console.log('id => ' + JSON.stringify(this.state.id));
        PersonService.updatePerson(person, this.state.id).then( res => {
            this.props.history.push('/persons');
        });
    }
    
    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changePhoneNumberHandler= (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/persons');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Person</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> First Name: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Last Name: </label>
                                            <input placeholder="Last Name" name="lastName" className="form-control" 
                                                value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Phone Number: </label>
                                            <input placeholder="Phone Number" name="phoneNumber" className="form-control"
                                                value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updatePerson}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default UpdatePersonComponent
