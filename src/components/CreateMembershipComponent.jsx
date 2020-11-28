import React, { Component } from 'react'
import MembershipService from '../services/MembershipService';

class CreateMembershipComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            membershipName: ''
        }
        this.changeMembershipNameHandler = this.changeMembershipNameHandler.bind(this);
        this.saveOrUpdateMembership = this.saveOrUpdateMembership.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            MembershipService.getMembershipById(this.state.id).then( (res) =>{
                let membership = res.data;
                this.setState({membershipName: membership.membershipName
                });
            });
        }        
    }
    saveOrUpdateMembership = (e) => {
        e.preventDefault();
        let membership = {membershipName: this.state.membershipName};
        console.log('membership => ' + JSON.stringify(membership));

        // step 5
        if(this.state.id === '_add'){
            MembershipService.createMembership(membership).then(res =>{
                this.props.history.push('/memberships');
            });
        }else{
            MembershipService.updateMembership(membership, this.state.id).then( res => {
                this.props.history.push('/memberships');
            });
        }
    }
    
    changeMembershipNameHandler= (event) => {
        this.setState({membershipName: event.target.value});
    }

    cancel(){
        this.props.history.push('/memberships');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Membership</h3>
        }else{
            return <h3 className="text-center">Update Membership</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Membership Name: </label>
                                            <input placeholder="Membership Name" name="membershipName" className="form-control"
                                                value={this.state.membershipName} onChange={this.changeMembershipNameHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateMembership}>Save</button>
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

export default CreateMembershipComponent
