import React, { Component } from 'react'
import {
    Link
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
                </Link> - <Link to="/memberships" >
                        Memberships
                </Link> - <Link to="/testassets/viewall" >
                        Testassets
                </Link> - <Link to="/testassets/add/_add" >
                        Add Testasset
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
