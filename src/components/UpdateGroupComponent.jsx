import React, { Component } from 'react'
import GroupService from '../services/GroupService';

class UpdateGroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            groupName: '',
            groupColour: ''
        }
        this.changeGroupNameHandler = this.changeGroupNameHandler.bind(this);
        this.changeGroupColourHandler = this.changeGroupColourHandler.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
    }

    componentDidMount(){
        GroupService.getGroupById(this.state.id).then( (res) =>{
            let group = res.data;
            this.setState({groupName: group.groupName,
                groupColour: group.groupColour
            });
        });
    }

    updateGroup = (e) => {
        e.preventDefault();
        let group = {groupName: this.state.groupName, groupColour: this.state.groupColour};
        console.log('group => ' + JSON.stringify(group));
        console.log('id => ' + JSON.stringify(this.state.id));
        GroupService.updateGroup(group, this.state.id).then( res => {
            this.props.history.push('/groups');
        });
    }
    
    changeGroupNameHandler= (event) => {
        this.setState({groupName: event.target.value});
    }

    changeGroupColourHandler= (event) => {
        this.setState({groupColour: event.target.value});
    }

    cancel(){
        this.props.history.push('/groups');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Group</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Group Name: </label>
                                            <input placeholder="Group Name" name="groupName" className="form-control"
                                                value={this.state.groupName} onChange={this.changeGroupNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Group Colour: </label>
                                            <input placeholder="Group Colour" name="groupColour" className="form-control"
                                                value={this.state.groupColour} onChange={this.changeGroupColourHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateGroup}>Save</button>
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

export default UpdateGroupComponent
