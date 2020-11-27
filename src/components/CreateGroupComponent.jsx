import React, { Component } from 'react'
import GroupService from '../services/GroupService';
import ColourService from '../services/ColourService';

class CreateGroupComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            groupName: '',
            groupColour: '',

            colours: [],
            validationError: ''
        }

        this.changeGroupNameHandler = this.changeGroupNameHandler.bind(this);
        this.changeGroupColourHandler = this.changeGroupColourHandler.bind(this);
        this.saveOrUpdateGroup = this.saveOrUpdateGroup.bind(this);
    }

    // step 3
    componentDidMount(){

        ColourService.getColours().then((res) => {
            this.setState({ colours: res.data});
        });

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            GroupService.getGroupById(this.state.id).then( (res) =>{
                let group = res.data;
                this.setState({groupName: group.groupName,
                    groupColour: group.groupColour
                });
            });
        }

    }
    saveOrUpdateGroup = (e) => {
        e.preventDefault();
        let group = {groupName: this.state.groupName, groupColour: this.state.groupColour};
        console.log('group => ' + JSON.stringify(group));

        // step 5
        if(this.state.id === '_add'){
            GroupService.createGroup(group).then(res =>{
                this.props.history.push('/groups');
            });
        }else{
            GroupService.updateGroup(group, this.state.id).then( res => {
                this.props.history.push('/groups');
            });
        }
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

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Group</h3>
        }else{
            return <h3 className="text-center">Update Group</h3>
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
                                            <label> Group Name: </label>
                                            <input placeholder="Group Name" name="groupName" className="form-control"
                                                value={this.state.groupName} onChange={this.changeGroupNameHandler}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Group Colour: </label>
                                            <div>
                                                <select className="form-control"
                                                        name="groupColour"
                                                        value={this.state.groupColour}
                                                        onChange={this.changeGroupColourHandler}

                                                >
                                                    {this.state.colours.map(
                                                        colour =>
                                                        <option
                                                            key={colour.colourName}
                                                            value={colour.colourName}
                                                        >
                                                            {colour.colourName}
                                                        </option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateGroup}>Save</button>
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

export default CreateGroupComponent
