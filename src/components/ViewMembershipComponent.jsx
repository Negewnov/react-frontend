import React, { Component } from 'react'
import MembershipService from '../services/MembershipService'

class ViewMembershipComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            membership: {}
        }
    }

    componentDidMount(){
        MembershipService.getMembershipById(this.state.id).then( res => {
            this.setState({membership: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Membership Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Membership Name: </label>
                            <div> { this.state.membership.membershipName }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewMembershipComponent
