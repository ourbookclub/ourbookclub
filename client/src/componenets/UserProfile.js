import React, { Component, Fragment } from 'react';
import { withAuthorization } from './Session';
import PasswordChangeForm from './PasswordChange';
import axios from 'axios';

const inputStyle = {
    width: '25%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

class UserProfile extends Component {
    constructor(props) {
        super(props)

        //Listed twice as to not change the info on the profile when they begin updating it
        this.state = {
            dbUsername: '',
            dbEmail: '',
            dbFirstname: '',
            dbLastname: '',
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            isCurrentUser: false
        };
    };

    componentDidMount() {
        const userID = this.props.match.params.userID;
        this.getUserData(userID);
        this.checkCurrentUser(userID);
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.userID !== prevProps.match.params.userID || this.props.userID !== prevProps.userID) {
            const userID = this.props.match.params.userID;
            this.getUserData(userID);
            this.checkCurrentUser(userID);
        };
    };

    checkCurrentUser = (userIDFromURL) => {
        if (this.props.userID === userIDFromURL) {
            this.setState({
                isCurrentUser: true
            })
        };
    };

    getUserData = async (userID) => {
        const dbResponse = await axios.get(`/api/getuserbyid/${userID}`);
        if (dbResponse.status === 200) {
            this.setState({
                dbUsername: dbResponse.data.local.username,
                dbEmail: dbResponse.data.local.email,
                dbFirstname: dbResponse.data.local.firstname,
                dbLastname: dbResponse.data.local.lastname,
            });
        };
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {

    }

    render() {
        const { username, email, firstname, lastname, isCurrentUser } = this.state;

        return (
            <div>
                <h1>{this.state.dbUsername}'s Profile</h1>
                <div>Username: {this.state.dbUsername}</div>
                <div>Email: {this.state.dbEmail}</div>
                <div>Firstname: {this.state.dbFirstname}</div>
                <div>Lastname: {this.state.dbLastname}</div>
                {isCurrentUser &&
                    <Fragment>
                        <UpdateInformationForm username={username} email={email} firstname={firstname} lastname={lastname} handleChange={this.handleChange} />
                        <br />
                        <PasswordChangeForm />
                    </Fragment>
                }
            </div>
        );
    };
};

const UpdateInformationForm = props => {
    return (
        <div className='form-group'>
            <label style={labelStyle}>Username:</label>
            <input className='form-input'
                style={inputStyle}
                type='text'
                name='username'
                placeholder='Update Username'
                value={props.username}
                onChange={props.handleChange}></input>
            <button className='btn btn-primary'>Update Username</button>
            <br />
            <label style={labelStyle}>Email:</label>
            <input className='form-input'
                style={inputStyle}
                type='text'
                name='email'
                placeholder='Update Email'
                value={props.email}
                onChange={props.handleChange}></input>
            <button className='btn btn-primary'>Update Email</button>
            <br />
            <label style={labelStyle}>First Name:</label>
            <input className='form-input'
                style={inputStyle}
                type='text'
                name='firstname'
                placeholder='Update Firstname'
                value={props.firstname}
                onChange={props.handleChange}></input>
            <button className='btn btn-primary'>Update Firstname</button>
            <br />
            <label style={labelStyle}>Last Name:</label>
            <input className='form-input'
                style={inputStyle}
                type='text'
                name='lastname'
                placeholder='Update Lastname'
                value={props.lastname}
                onChange={props.handleChange}></input>
            <button className='btn btn-primary'>Update Lastname</button>
            <br />
        </div>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserProfile);