import React, { Component } from 'react'
import TestassetService from '../services/TestassetService';

class TestassetComponent extends Component {
    constructor(props) {
        super(props)

        console.log('I was triggered during constructor' + this.props.match.params.action);

        this.state = {
            action: this.props.match.params.action,
            id: this.props.match.params.id,
            testassets: [],
            testasset: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            emailId: ''

        }
        this.addTestasset = this.addTestasset.bind(this);
        this.editTestasset = this.editTestasset.bind(this);
        this.deleteTestasset = this.deleteTestasset.bind(this);
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveOrUpdateTestasset= this.saveOrUpdateTestasset.bind(this);
    }

    saveOrUpdateTestasset = (e) => {
        e.preventDefault();
        let testasset = {firstName: this.state.firstName, lastName: this.state.lastName, phoneNumber: this.state.phoneNumber, emailId: this.state.emailId};
        console.log('testasset => ' + JSON.stringify(testasset));

        // step 5
        if(this.state.id === '_add'){
            TestassetService.createTestasset(testasset).then(res =>{
                this.props.history.push('/testassets/viewall');
            });
        }else{
            TestassetService.updateTestasset(testasset, this.state.id).then( res => {
                this.props.history.push('/testassets/viewall');
            });
        }
    }
    
    deleteTestasset(id){
        TestassetService.deleteTestasset(id).then( res => {
            this.setState({testassets: this.state.testassets.filter(testasset => testasset.id !== id)});
        });
    }
    viewTestasset(id){
        this.props.history.push(`/testassets/view/${id}`);
    }

    editTestasset(id){
        this.props.history.push(`/testassets/add/${id}`);
    }

    addTestasset(){
        console.log('I was triggered during add' + this.state.action);
        this.props.history.push('/testassets/add/_add');
    }

    changeFirstNameHandler= (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler= (event) => {
        this.setState({lastName: event.target.value});
    }

    changePhoneNumberHandler= (event) => {
        this.setState({phoneNumber: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/testassets/viewall');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Testasset</h3>
        }else{
            return <h3 className="text-center">Update Testasset</h3>
        }
    }
    componentDidMount(){
        console.log('I was triggered during componentDidMount' + this.state.action)
        console.log('I was triggered during componentDidMount' + this.props.match.params.action)
        console.log('I was triggered during componentDidMount id: ' + this.props.match.params.id)
        console.log('I was triggered during componentDidMount id: ' + this.state.id)

        if (this.state.action === 'view') {
            TestassetService.getTestassetById(this.state.id).then( res => {
                this.setState({ testasset: res.data});
            })
        } else if(this.state.action === 'add' && this.state.id === '_add'){
            return
        } else if(this.state.action === 'add'){
            TestassetService.getTestassetById(this.state.id).then( (res) =>{
                let testasset = res.data;
                this.setState({firstName: testasset.firstName,
                    lastName: testasset.lastName,
                    phoneNumber: testasset.phoneNumber,
                    emailId : testasset.emailId
                });
            });
        } else {
            TestassetService.getTestassets().then((res) => {
                this.setState({ testassets: res.data});
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        console.log('I was triggered during componentDidUpdate' + this.state.action);
        console.log('I was triggered during componentDidUpdate' + this.props.location.pathname);
        console.log('I was triggered during componentDidUpdate' + prevProps.location.pathname);
        console.log('I was triggered during componentDidUpdate ACTION ' + this.props.match.params.action);
        console.log('I was triggered during componentDidUpdate ID ' + this.props.match.params.id);
        let x = this.props.location.pathname;
        if(prevProps.location.pathname !== x) {
            this.state = {
                action: this.props.match.params.action,
                id: this.props.match.params.id
            }
        }
    }

    render() {
        let content;
        if (this.state.action === 'viewall') {
            content=
                <div>
                <h2 className="text-center">Testassets List {this.state.action}</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addTestasset}> Add Testasset</button>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                        <tr>
                            <th> Testasset First Name</th>
                            <th> Testasset Last Name</th>
                            <th> Testasset Phone Number</th>
                            <th> Testasset Email Id</th>
                            <th> Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.testassets.map(
                                testasset =>
                                    <tr key={testasset.id}>
                                        <td> {testasset.firstName} </td>
                                        <td> {testasset.phoneNumber}</td>
                                        <td> {testasset.emailId}</td>
                                        <td>
                                            <button onClick={() => this.editTestasset(testasset.id)}
                                                    className="btn btn-info">Update
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.deleteTestasset(testasset.id)}
                                                    className="btn btn-danger">Delete
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.viewTestasset(testasset.id)}
                                                    className="btn btn-info">View
                                            </button>
                                            <button style={{marginLeft: "10px"}}
                                                    onClick={() => this.viewMemberships(testasset.id)}
                                                    className="btn btn-info">Member
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        } else if (this.state.action === 'view')
        {
            content =
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Testasset Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Testasset First Name: </label>
                            <div> { this.state.testasset.firstName }</div>
                        </div>
                        <div className = "row">
                            <label> Testasset Last Name: </label>
                            <div> { this.state.testasset.lastName }</div>
                        </div>
                        <div className = "row">
                            <label> Testasset Phone Number: </label>
                            <div> { this.state.testasset.phoneNumber }</div>
                        </div>
                        <div className = "row">
                            <label> Testasset Email ID: </label>
                            <div> { this.state.testasset.emailId }</div>
                        </div>
                    </div>
                </div>
            </div>
        } else if (this.state.action === 'add')
        {
            content =
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
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                               value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                               value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Phone Number: </label>
                                        <input placeholder="Phone Number" name="phoneNumber" className="form-control"
                                               value={this.state.phoneNumber} onChange={this.changePhoneNumberHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                               value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateTestasset}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>   
        }


        return (
            <div>
                {content}
            </div>
        )
    }
}

export default TestassetComponent
