import React, { Component } from 'react'
import GroupService from '../services/GroupService'

class ViewGroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            group: {}
        }
    }

    componentDidMount(){
        GroupService.getGroupById(this.state.id).then( res => {
            this.setState({group: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Group Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Group Name: </label>
                            <div> { this.state.group.groupName }</div>
                        </div>
                        <div className = "row">
                            <label> Group Colour: </label>
                            <div> { this.state.group.groupColour    }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewGroupComponent
