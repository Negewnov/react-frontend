import React, { Component } from 'react'
import PersonService from '../services/PersonService'
import ColourService from "../services/ColourService";
import GroupService from "../services/GroupService";
import MembershipService from "../services/MembershipService";

class ViewPersonComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            person: {},
            memberships: [],
            groups: []
        }

        this.getGroupName = this.getGroupName.bind(this);
        this.deleteMembership = this.deleteMembership.bind(this);
    }

    deleteMembership(id){
        MembershipService.deleteMembership(id).then( res => {
            this.setState({memberships: this.state.memberships.filter(membership => membership.id !== id)});
        });
    }

    getGroupName(groupId) {
        let numberedId = groupId * 1;
        let groups =
            this.state.groups.filter(group => group.id === numberedId).map( group => group.groupName);

        return groups;
    }

    componentDidMount(){
        PersonService.getPersonById(this.state.id).then( res => {
            this.setState({person: res.data});
        })

        GroupService.getGroups().then((res) => {
            this.setState({ groups: res.data});
        });

        MembershipService.getMemberships().then((res) => {
            this.setState({ memberships: res.data});
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
                <h2 className="text-center">Memberships List</h2>
                <br></br>
                <div className = "row">
                    <table className = "table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th> Membership Name</th>
                            <th> Group Name</th>
                            <th> Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.memberships.filter(membership => (membership.personId) === this.state.id.toString()).map(
                                membership =>
                                    <tr key = {membership.id}>
                                        <td> { membership.membershipName} </td>
                                        <td> { this.getGroupName(membership.groupId)} </td>
                                        <td>
                                            <button style={{marginLeft: "10px"}} onClick={ () => this.deleteMembership(membership.id)} className="btn btn-danger">Delete </button>
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

export default ViewPersonComponent
