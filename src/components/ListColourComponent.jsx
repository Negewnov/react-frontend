import React, { Component } from 'react'
import ColourService from '../services/ColourService'

class ListColourComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                colours: []
        }
        this.addColour = this.addColour.bind(this);
        this.editColour = this.editColour.bind(this);
        this.deleteColour = this.deleteColour.bind(this);
    }

    deleteColour(id){
        ColourService.deleteColour(id).then( res => {
            this.setState({colours: this.state.colours.filter(colour => colour.id !== id)});
        });
    }
    viewColour(id){
        this.props.history.push(`/view-colour/${id}`);
    }
    editColour(id){
        this.props.history.push(`/add-colour/${id}`);
    }

    componentDidMount(){
        ColourService.getColours().then((res) => {
            this.setState({ colours: res.data});
        });
    }

    addColour(){
        this.props.history.push('/add-colour/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Colours List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addColour}> Add Colour</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Colour Name</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.colours.map(
                                        colour => 
                                        <tr key = {colour.id}>
                                             <td> { colour.colourName} </td>
                                             <td>
                                                 <button onClick={ () => this.editColour(colour.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteColour(colour.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewColour(colour.id)} className="btn btn-info">View </button>
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

export default ListColourComponent
