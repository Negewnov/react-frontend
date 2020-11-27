import React, { Component } from 'react'
import ColourService from '../services/ColourService'

class ViewColourComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            colour: {}
        }
    }

    componentDidMount(){
        ColourService.getColourById(this.state.id).then( res => {
            this.setState({colour: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Colour Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Colour Name: </label>
                            <div> { this.state.colour.colourName }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewColourComponent
