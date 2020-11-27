import React, { Component } from 'react'
import ColourService from '../services/ColourService';

class UpdateColourComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            colourName: ''
        }
        this.changeColourNameHandler = this.changeColourNameHandler.bind(this);
        this.updateColour = this.updateColour.bind(this);
    }

    componentDidMount(){
        ColourService.getColourById(this.state.id).then( (res) =>{
            let colour = res.data;
            this.setState({colourName: colour.colourName
            });
        });
    }

    updateColour = (e) => {
        e.preventDefault();
        let colour = {colourName: this.state.colourName};
        console.log('colour => ' + JSON.stringify(colour));
        console.log('id => ' + JSON.stringify(this.state.id));
        ColourService.updateColour(colour, this.state.id).then( res => {
            this.props.history.push('/colours');
        });
    }
    
    changeColourNameHandler= (event) => {
        this.setState({colourName: event.target.value});
    }

    cancel(){
        this.props.history.push('/colours');
    }

    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Colour</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Colour Name: </label>
                                            <input placeholder="Colour Name" name="colourName" className="form-control"
                                                value={this.state.colourName} onChange={this.changeColourNameHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateColour}>Save</button>
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

export default UpdateColourComponent
