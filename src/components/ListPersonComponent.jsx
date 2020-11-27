import React, { Component } from 'react'
import PersonService from '../services/PersonService'

class ListPersonComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                persons: []
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
        this.props.history.push(`/view-person/${id}`);
    }

    editPerson(id){
        this.props.history.push(`/add-person/${id}`);
    }

    componentDidMount(){
        PersonService.getPersons().then((res) => {
            this.setState({ persons: res.data});
        });
    }

    addPerson(){
        this.props.history.push('/add-person/_add');
    }

    render() {
        return (

            <div>
                 <h2 className="text-center">Persons List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addPerson}> Add Person</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

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
                                        <tr key = {person.id}>
                                             <td> { person.firstName} </td>
                                             <td> {person.lastName}</td>
                                             <td> {person.phoneNumber}</td>
                                             <td> {person.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editPerson(person.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deletePerson(person.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewPerson(person.id)} className="btn btn-info">View </button>
                                               </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListPersonComponent
