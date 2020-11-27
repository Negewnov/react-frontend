import React, { Component } from 'react'
import PersonService from '../services/PersonService'
import ColourService from "../services/ColourService";

class ViewPersonComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            person: {}
        }
    }

    componentDidMount(){
        PersonService.getPersonById(this.state.id).then( res => {
            this.setState({person: res.data});
        })

        ColourService.getColours().then((res) => {
            this.setState({ colours: res.data});
        });

    }

    render() {
        return (
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
        )
    }
}

export default ViewPersonComponent
