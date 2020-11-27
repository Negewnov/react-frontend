import React, { Component } from 'react'
import MembershipService from '../services/MembershipService';
import PersonService from "../services/PersonService";
import GroupService from "../services/GroupService";

class MembershipComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                personid: this.props.match.params.id,
                groupid: this.props.match.params.groupid,
                memberships: [],
                groups: []
        }
        this.saveMembership = this.saveMembership.bind(this);
        this.deleteMembership = this.deleteMembership.bind(this);
    }

    deleteMembership(id){
        MembershipService.deleteMembership(id).then( res => {
            this.setState({memberships: this.state.memberships.filter(membership => membership.id !== id)});
        });
    }


    componentDidMount(){
        GroupService.getGroups().then((res) => {
            this.setState({ groups: res.data});
        });

        MembershipService.getMembershipsByPersonId(this.state.personid).then((res) => {
            this.setState({ memberships: res.data});
        });
    }

    //addMembership(){
        //this.props.history.push('/membership/:id');
    //}

    //addMembership= (event) => {
      //  this.setState({groupID: event.target.value});
        //this.props.history.push('/memberships/:id/:groupid');
    //}

    saveMembership = (event) => {
//        e.preventDefault();
        this.setState({groupid: event.target.value});

        MembershipService.createMembership(this.state.personid, this.state.groupid).then(res =>{
              this.props.history.push('/memberships/:id')
    })
    }


    render() {
        return (
            <div>
                 <h2 className="text-center">Memberships List of Person XY</h2>
                <div className = "form-group">
                    <label> Add Group: </label>
                    <div>
                        <select className="form-control"
                                name="groupID"
                                value={this.state.groupid}
                                onChange={this.saveMembership()}

                        >
                            {this.state.groups.map(
                                group =>
                                    <option
                                        key={group.id}
                                        value={group.id}
                                    >
                                        {group.groupName}
                                    </option>
                            )
                            }
                        </select>
                    </div>
                </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Membership Person Name</th>
                                    <th> Membership Group Name</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.memberships.map(
                                        membership => 
                                        <tr key = {membership.id}>
                                             <td> {membership.personID} </td>
                                             <td> {membership.groupID}</td>
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

export default MembershipComponent
