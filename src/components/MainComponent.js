import React, { Component } from 'react'
import {
    Route,
    Switch,
} from 'react-router-dom';
import ListPersonComponent from "./ListPersonComponent";
import CreatePersonComponent from "./CreatePersonComponent";
import ViewPersonComponent from "./ViewPersonComponent";

import TestassetComponent from "./TestassetComponent";

import ListGroupComponent from "./ListGroupComponent";
import CreateGroupComponent from "./CreateGroupComponent";
import ViewGroupComponent from "./ViewGroupComponent";

import ListColourComponent from "./ListColourComponent";
import CreateColourComponent from "./CreateColourComponent";
import ViewColourComponent from "./ViewColourComponent";

import ViewMembershipComponent from "./ViewMembershipComponent";
import CreateMembershipComponent from "./CreateMembershipComponent";
import ListMembershipComponent from "./ListMembershipComponent";

class MainComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render(){
        return(
            <div className="topBarcontainer">

                    <div className="container">
                        <Switch>
                            <Route path = "/" exact component = {ListPersonComponent}></Route>
                            <Route path = "/persons" exact component = {ListPersonComponent}></Route>
                            <Route path = "/add-person/:id" component = {CreatePersonComponent}></Route>
                            <Route path = "/view-person/:id" component = {ViewPersonComponent}></Route>

                            <Route path = "/testassets" exact component = {TestassetComponent}></Route>
                            <Route path = "/testassets/:action" exact component = {TestassetComponent}></Route>
                            <Route path = "/testassets/:action/:id" exact component = {TestassetComponent}></Route>

                            <Route path = "/groups" component = {ListGroupComponent}></Route>
                            <Route path = "/add-group/:id" component = {CreateGroupComponent}></Route>
                            <Route path = "/view-group/:id" component = {ViewGroupComponent}></Route>

                            <Route path = "/memberships" component = {ListMembershipComponent}></Route>
                            <Route path = "/add-membership/:id" component = {CreateMembershipComponent}></Route>
                            <Route path = "/view-membership/:id" component = {ViewMembershipComponent}></Route>

                            <Route path = "/colours" component = {ListColourComponent}></Route>
                            <Route path = "/add-colour/:id" component = {CreateColourComponent}></Route>
                            <Route path = "/view-colour/:id" component = {ViewColourComponent}></Route>

                          {/* <Route path = "/update-person/:id" component = {UpdatePersonComponent}></Route> */}
                        </Switch>
                    </div>

            </div>
        )
    }
}

export default MainComponent
