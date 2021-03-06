import React, { Component } from 'react'
import MembershipService from '../services/MembershipService'
import PersonService from "../services/PersonService";
import GroupService from "../services/GroupService";

class ListMembershipComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                memberships: [],
                persons: [],
                groups: []
        }
        this.getGroupName = this.getGroupName.bind(this);
        this.getPersonName = this.getPersonName.bind(this);
        this.addMembership = this.addMembership.bind(this);
        this.editMembership = this.editMembership.bind(this);
        this.deleteMembership = this.deleteMembership.bind(this);
    }

    deleteMembership(id){
        MembershipService.deleteMembership(id).then( res => {
            this.setState({memberships: this.state.memberships.filter(membership => membership.id !== id)});
        });
    }
    viewMembership(id){
        this.props.history.push(`/view-membership/${id}`);
    }
    editMembership(id){
        this.props.history.push(`/add-membership/${id}`);
    }

    componentDidMount(){
        PersonService.getPersons().then((res) => {
            this.setState({ persons: res.data});
        });

        GroupService.getGroups().then((res) => {
            this.setState({ groups: res.data});
        });

        MembershipService.getMemberships().then((res) => {
            this.setState({ memberships: res.data});
        });
    }

    addMembership(){
        this.props.history.push('/add-membership/_add');
    }

    getPersonName(personId) {
        let numberedId = personId * 1;
        let persons =
            this.state.persons.filter(person => person.id === numberedId).map( person => ''.concat(person.firstName,' ',person.lastName));

        return persons;
    }

    getGroupName(groupId) {
        let numberedId = groupId * 1;
        let groups =
            this.state.groups.filter(group => group.id === numberedId).map( group => group.groupName);

        return groups;
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Memberships List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addMembership}> Add Membership</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Membership Name</th>
                                    <th> Person Name</th>
                                    <th> Group Name</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.memberships.map(
                                        membership => 
                                        <tr key = {membership.id}>
                                             <td> { membership.membershipName} </td>
                                            <td> { this.getPersonName(membership.personId)} </td>
                                            <td> { this.getGroupName(membership.groupId)} </td>
                                             <td>
                                                 <button onClick={ () => this.editMembership(membership.id)} className="btn btn-info">Update </button>
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

export default ListMembershipComponent
