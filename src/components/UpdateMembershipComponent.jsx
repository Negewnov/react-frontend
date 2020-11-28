import React, { Component } from 'react'
import MembershipService from '../services/MembershipService';

class UpdateMembershipComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            membershipName: ''
        }
        this.changeMembershipNameHandler = this.changeMembershipNameHandler.bind(this);
        this.updateMembership = this.updateMembership.bind(this);
    }

    componentDidMount(){
        MembershipService.getMembershipById(this.state.id).then( (res) =>{
            let membership = res.data;
            this.setState({membershipName: membership.membershipName
            });
        });
    }

    updateMembership = (e) => {
        e.preventDefault();
        let membership = {membershipName: this.state.membershipName};
        console.log('membership => ' + JSON.stringify(membership));
        console.log('id => ' + JSON.stringify(this.state.id));
        MembershipService.updateMembership(membership, this.state.id).then( res => {
            this.props.history.push('/memberships');
        });
    }
    
    changeMembershipNameHandler= (event) => {
        this.setState({membershipName: event.target.value});
    }

    cancel(){
        this.props.history.push('/memberships');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Membership</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Membership Name: </label>
                                            <input placeholder="Membership Name" name="membershipName" className="form-control"
                                                value={this.state.membershipName} onChange={this.changeMembershipNameHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateMembership}>Save</button>
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

export default UpdateMembershipComponent
