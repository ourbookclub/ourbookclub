import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from './Firebase';
import { compose } from 'recompose';
import axios from 'axios';
import { Row, Col } from "reactstrap";

import * as Routes from '../constants/routes';
import { SignInLink } from './SignIn';


const inputStyle = {
    width: '50%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}
const form = {
    display: 'block',
    marginLeft: '50px',
    marginRight: 'auto',
}

const about = {
fontSize: '17px',
textAlign: 'center',
}

const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstname: '',
    lastname: '',
    redirectTo: null,
    error: null,
    emailValid: false,
    passwordValid: false,
    usernameValid: false,
    validMessage: []
}

const SignUpPage = () => (
    < div style={form} >
    <Row>
    <Col xs="6">
        <h3>SignUp</h3>
        <SignUpForm />
        <SignInLink />

        </Col>
        <Col xs="6">
        <p style ={about}>
        <strong>Welcome to Bookworm!</strong>
       <br></br>
       We’re helping you create a community around the books you love and the ones you want to read. By joining us we help keep you engaged with reading. Join now, create a club, invite your friends, pick your favorite book and get reading!
       <br></br> <br></br>
       Bookworm helps you facilitate your bookclub ensuring everyone is on the same page and place where your club can talk about the book. Our clubs feature benchmark tracking and dialog between users through a familiar post and comment feature.
       <br></br> <br></br>
       We’re totally free, why not sign up and get reading?
       </p>
        </Col>
        </Row>





    </div>
);


class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    handleSubmit = async event => {
        event.preventDefault();

        //Checks if all the input fields are valid
        //If not the validation messages are shown and no user is sent to sign up
        if (this.checkValidInput()) {
            const { username, email, password, firstname, lastname } = this.state;

            const dbResponse = await axios.post(`/api/newuser`, { username, email, firstname, lastname });

            if (dbResponse.status === 200) {
                return this.props.firebase
                    .doCreateUserWithEmailAndPassword(email, password)
                    .then(authUser => {
                        //The User has been successfully authenticated, clear this component state and redirect them to the home page
                        this.setState({ ...initialState });
                        this.props.history.push(Routes.home);
                    })
                    .catch(error => {
                        console.log(error)
                        this.setState({ error });
                    });
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

    checkValidInput = () => {
        let invalidInputs = 0;
        let invalidMessages = [];
        if (!this.state.emailValid) {
            invalidInputs++;
            invalidMessages.push(`Email entered is invalid`);
        };
        if (!this.state.usernameValid) {
            invalidInputs++;
            invalidMessages.push(`Please ensure username is at least 3 characters, no more than 16 and only contains letters, numbers, underscores and dashes`);
        };
        if (!this.state.passwordValid) {
            invalidInputs++;
            invalidMessages.push(`Password must be at least 6 characters in length and contain no spaces`)
        };
        if (invalidInputs > 0) {
            this.setState({ validMessage: invalidMessages });
            return false;
        } else {
            return true;
        };
    };

    validateForm = (fieldName, value) => {
        let validCheck;

        switch (fieldName) {
            case `email`:
                let checkEmail = value.match(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                validCheck = checkEmail ? true : false;
                this.setState({ emailValid: validCheck });
                break;
            case `password`:
                let checkPassword = value.length >= 6;
                let noSpacesInPassword = value.match(/^\S*$/);
                validCheck = checkPassword && noSpacesInPassword ? true : false;
                this.setState({ passwordValid: validCheck });
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

    render() {
        const { username, email, passwordOne, passwordTwo, firstname, lastname, error, validMessage } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            firstname === '' ||
            lastname === '' ||
            username.length < 3 ||
            passwordOne < 6;

        return (
            <div className="SignupForm">
                <br />
                {/* If there's an error with signup then display the error */}
                {error && <p>{error.message}</p>}
                {validMessage && validMessage.map((message, i) => <p key={i}>{message}</p>)}

                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div >
                            <label className="form-label" htmlFor="email" style={labelStyle}>Email </label>
                        </div>
                        <div >
                            <input className="form-input"
                                style={inputStyle}
                                type="text"
                                id="email"
                                name="email"
                                placeholder="ex. janedoe@email.com"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div >
                            <label className="form-label" htmlFor="password" style={labelStyle}>Password<br />(Must be at least 6 characters with no spaces) </label>
                        </div>
                        <div >
                            <input className="form-input"
                                style={inputStyle}
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div >
                            <label className="form-label" htmlFor="confirmPassword" style={labelStyle}>Confirm Password </label>
                        </div>
                        <div >
                            <input className="form-input"
                                style={inputStyle}
                                placeholder="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div >
                            <label className="form-label" htmlFor="username" style={labelStyle}>Username<br />(Must be at least 3 characters, no more than 16, no special characters & no spaces)</label>
                        </div>
                        <div >
                            <input className="form-input"
                                style={inputStyle}
                                placeholder="ex. JaneDoe14"
                                type="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div >
                            <label className="form-label" htmlFor="firstname" style={labelStyle}>First Name: </label>
                        </div>
                        <div >
                            <input className="form-input"
                                style={inputStyle}
                                placeholder="ex. Jane"
                                type="firstname"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div >
                            <label className="form-label" htmlFor="lastname" style={labelStyle}>Last Name: </label>
                        </div>
                        <div >
                            <input className="form-input"
                                style={inputStyle}
                                placeholder="ex. Doe"
                                type="lastname"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group ">
                        <div ></div>
                        <button
                            disabled={isInvalid}
                            className="btn btn-primary col-1 col-mr-auto"
                            type="submit"
                        >Sign Up</button>
                    </div>
                </form>
            </div>
        )
    };
}

const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);


const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={Routes.signup}><button className="btn btn-success">Sign Up</button></Link>
    </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };