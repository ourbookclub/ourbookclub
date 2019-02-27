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

const initialUpdateState = {
    username: '',
    email: '',
    firstname: '',
    lastname: '',
    emailValid: false,
    usernameValid: false,
    validMessage: ''
};

const initialProfileState = {
    dbUsername: '',
    dbEmail: '',
    dbFirstname: '',
    dbLastname: '',
    isCurrentUser: false
};

class UserProfile extends Component {
    constructor(props) {
        super(props)

        //Listed twice as to not change the info on the profile when they begin updating it
        this.state = { ...initialProfileState };
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

    updatedProfile = () => {
        this.getUserData(this.props.match.params.userID);
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

    render() {
        const { isCurrentUser, dbUsername, dbEmail, dbFirstname, dbLastname } = this.state;

        return (
            <div>
                <h1>{this.state.dbUsername}'s Profile</h1>
                <div>Username: {dbUsername}</div>
                <div>Email: {dbEmail}</div>
                <div>Firstname: {dbFirstname}</div>
                <div>Lastname: {dbLastname}</div>
                {isCurrentUser &&
                    <Fragment>
                        <UpdateInformationForm userID={this.props.userID} updatedProfile={this.updatedProfile} />
                        <br />
                        <PasswordChangeForm />
                    </Fragment>
                }
            </div>
        );
    };
};

class UpdateInformationForm extends Component {
    constructor(props) {
        super(props)

        this.state = { ...initialUpdateState };
    };

    handleSubmit = async (fieldSubmitted) => {

        if (this.checkValidInput(fieldSubmitted)) {
            const value = this.state[fieldSubmitted];
            const userID = this.props.userID;
            const request = fieldSubmitted;

            const dbResponse = await axios.put(`/api/updateuser`, { userID, value, request });

            if (dbResponse.status === 200) {
                this.props.updatedProfile();
                this.setState({ ...initialUpdateState });
            };
        };
    };

    handleChange = event => {
        //Breaking this out due to the input validation
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [event.target.name]: event.target.value },
            () => this.validateForm(name, value));

    };

    validateForm = (fieldName, value) => {
        let validCheck;

        switch (fieldName) {
            case `email`:
                let checkEmail = value.match(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                validCheck = checkEmail ? true : false;
                this.setState({ emailValid: validCheck });
                break;
            case `username`:
                let checkUsername = value.match(/^([a-z0-9-_])+$/i);
                let usernameLength = value.length >= 3 && value.length <= 16;
                validCheck = checkUsername && usernameLength ? true : false;
                this.setState({ usernameValid: validCheck });
                break;
            default:
                break;
        };
    };

    checkValidInput = (fieldSubmitted) => {
        let invalidInputs = 0;

        if (fieldSubmitted === 'email' && !this.state.emailValid) {
            this.setState({ validMessage: `Email entered is invalid` });
            return false
        };

        if (fieldSubmitted === 'username' && !this.state.usernameValid) {
            this.setState({ validMessage: `Please ensure username is at least 3 characters, no more than 16 and only contains letters, numbers, underscores and dashes` });
            return false
        }

        return true;
    };

    render() {
        const { username, email, firstname, lastname, validMessage } = this.state;

        const usernameIsInvalid = username === '';
        const emailIsInvalid = email === '';
        const firstnameIsInvalid = firstname === '';
        const lastnameIsInvalid = lastname === '';

        return (
            <div className='form-group'>
                {validMessage && <p>{validMessage}</p>}
                <br />
                <label style={labelStyle}>Username:</label>
                <input className='form-input'
                    style={inputStyle}
                    type='text'
                    name='username'
                    placeholder='Update Username'
                    value={username}
                    onChange={this.handleChange}></input>
                <button className='btn btn-primary'
                    disabled={usernameIsInvalid}
                    onClick={() => this.handleSubmit('username')}>Update Username</button>

                <br />

                <label style={labelStyle}>Email:</label>
                <input className='form-input'
                    style={inputStyle}
                    type='text'
                    name='email'
                    placeholder='Update Email'
                    value={email}
                    onChange={this.handleChange}></input>
                <button className='btn btn-primary'
                    disabled={emailIsInvalid}
                    onClick={() => this.handleSubmit('email')}>Update Email</button>

                <br />

                <label style={labelStyle}>First Name:</label>
                <input className='form-input'
                    style={inputStyle}
                    type='text'
                    name='firstname'
                    placeholder='Update Firstname'
                    value={firstname}
                    onChange={this.handleChange}></input>
                <button className='btn btn-primary'
                    disabled={firstnameIsInvalid}
                    onClick={() => this.handleSubmit('firstname')}>Update Firstname</button>

                <br />

                <label style={labelStyle}>Last Name:</label>
                <input className='form-input'
                    style={inputStyle}
                    type='text'
                    name='lastname'
                    placeholder='Update Lastname'
                    value={lastname}
                    onChange={this.handleChange}></input>
                <button className='btn btn-primary'
                    disabled={lastnameIsInvalid}
                    onClick={() => this.handleSubmit('lastname')}>Update Lastname</button>
                <br />
            </div >
        );
    };
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UserProfile);