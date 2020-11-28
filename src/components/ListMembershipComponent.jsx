import React, { Component } from 'react'
import MembershipService from '../services/MembershipService'

class ListMembershipComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                memberships: []
        }
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
        MembershipService.getMemberships().then((res) => {
            this.setState({ memberships: res.data});
        });
    }

    addMembership(){
        this.props.history.push('/add-membership/_add');
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
                                    <th> Person ID</th>
                                    <th> Group ID</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.memberships.map(
                                        membership => 
                                        <tr key = {membership.id}>
                                             <td> { membership.membershipName} </td>
                                             <td> { membership.personId} </td>
                                             <td> { membership.groupId} </td>
                                             <td>
                                                 <button onClick={ () => this.editMembership(membership.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteMembership(membership.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewMembership(membership.id)} className="btn btn-info">View </button>
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
