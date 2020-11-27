import React, { Component } from 'react'
import ColourService from '../services/ColourService';

class CreateColourComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            colourName: ''
        }
        this.changeColourNameHandler = this.changeColourNameHandler.bind(this);
        this.saveOrUpdateColour = this.saveOrUpdateColour.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            ColourService.getColourById(this.state.id).then( (res) =>{
                let colour = res.data;
                this.setState({colourName: colour.colourName
                });
            });
        }        
    }
    saveOrUpdateColour = (e) => {
        e.preventDefault();
        let colour = {colourName: this.state.colourName};
        console.log('colour => ' + JSON.stringify(colour));

        // step 5
        if(this.state.id === '_add'){
            ColourService.createColour(colour).then(res =>{
                this.props.history.push('/colours');
            });
        }else{
            ColourService.updateColour(colour, this.state.id).then( res => {
                this.props.history.push('/colours');
            });
        }
    }
    
    changeColourNameHandler= (event) => {
        this.setState({colourName: event.target.value});
    }

    cancel(){
        this.props.history.push('/colours');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Colour</h3>
        }else{
            return <h3 className="text-center">Update Colour</h3>
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
                                            <label> Colour Name: </label>
                                            <input placeholder="Colour Name" name="colourName" className="form-control"
                                                value={this.state.colourName} onChange={this.changeColourNameHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateColour}>Save</button>
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

export default CreateColourComponent
