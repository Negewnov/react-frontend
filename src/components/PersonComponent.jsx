import React, { Component } from 'react'
import PersonService from '../services/PersonService'

class PersonComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            action: this.props.match.params.action,
            id: this.props.match.params.id,
            persons: [],
            person: ''
        }
        this.addPerson = this.addPerson.bind(this);
        this.editPerson = this.editPerson.bind(this);
        this.deletePerson = this.deletePerson.bind(this);
    }

    deletePerson(id){
        PersonService.deletePerson(id).then( res => {
            this.setState({persons: this.state.persons.filter(person => person.id !== id)});
        });
    }
    viewPerson(id){
        this.props.history.push(`/person/view/${id}`);
    }
    viewMemberships(id){
        this.props.history.push(`/memberships/${id}`);
    }
    editPerson(id){
        this.props.history.push(`/person/add/${id}`);
    }

    componentDidMount(){
        console.log('I was triggered during componentDidMount' + this.props.match.params.action)
        PersonService.getPersons().then((res) => {
            this.setState({ persons: res.data});
        });

        console.log('I was triggered during componentDidMount personid: ' + this.props.match.params.id)

        PersonService.getPersonById(this.state.id).then( res => {
            this.setState({ person: res.data});
        })
    }

    addPerson(){
        this.props.history.push('/person/add/_add');
    }



    render() {
        let content;
        if (this.state.action == 'viewall') {
            content=
                <div>
                <h2 className="text-center">Persons List {this.state.action}</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addPerson}> Add Person</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th> Person First Name</th>
                            <th> Person Last Name</th>
                            <th> Person Phone Number</th>
                            <th> Person Email Id</th>
                            <th> Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.persons.map(
                                person =>
                                    <tr key={person.id}>
                                        <td> {person.firstName} </td>
                                        <td> {person.phoneNumber}</td>
                                        <td> {person.emailId}</td>
                                        <td>
                                            <button onClick={() => this.editPerson(person.id)}
                                                    className="btn btn-info">Update
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.deletePerson(person.id)}
                                                    className="btn btn-danger">Delete
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.viewPerson(person.id)}
                                                    className="btn btn-info">View
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.viewMemberships(person.id)}
                                                    className="btn btn-info">Member
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        } else if (this.state.action == 'view')
        {
            content =
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Person Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Person First Name: </label>
                            <div> { this.state.person.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Person Last Name: </label>
                            <div> { this.state.person.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Person Phone Number: </label>
                            <div> { this.state.person.phoneNumber }</div>
                        </div>
                        <div className = "row">
                            <label> Person Email ID: </label>
                            <div> { this.state.person.emailId }</div>
                        </div>
                    </div>
                </div>
            </div>
        }


        return (
            <div>
                {content}
            </div>
        )
    }
}

export default PersonComponent
