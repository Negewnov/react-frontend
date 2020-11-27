import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <div className="topBarcontainer">

                <Link to="/" >
                        Home
                </Link> - <Link to="/persons" >
                        Persons
                </Link> - <Link to="/groups" >
                        Groups
                </Link> - <Link to="/colours" >
                        Colours
                </Link>

            </div>
        )
    }
}

export default HeaderComponent
