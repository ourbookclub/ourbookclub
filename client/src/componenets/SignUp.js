import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from './Firebase';
import { compose } from 'recompose';
import axios from 'axios';

import * as Routes from '../constants/routes';
import { SignInLink } from './SignIn';


const inputStyle = {
    width: '50%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstname: '',
    lastname: '',
    redirectTo: null,
    error: null
}

const SignUpPage = () => (
    <div>
        <h3>SignUp</h3>
        <SignUpForm />
        <SignInLink />
    </div>
);


class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const { username, email, password, firstname, lastname } = this.state;

        const dbResponse = await axios.post('/api/newuser', { username, email, firstname, lastname });

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
        }
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });

    };

    render() {
        const { username, email, passwordOne, passwordTwo, firstname, lastname, error } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ||
            firstname === '' ||
            lastname === '';

        return (
            <div className="SignupForm">
                <br />
                {/* If there's an error with signup then display the error */}
                {error && <p>{error.message}</p>}

                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="email" style={labelStyle}>Email: </label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                style={inputStyle}
                                type="text"
                                id="email"
                                name="email"
                                placeholder="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="password" style={labelStyle}>Password: </label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                style={inputStyle}
                                placeholder="password"
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="confirmPassword" style={labelStyle}>Confirm Password: </label>
                        </div>
                        <div className="col-3 col-mr-auto">
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
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="username" style={labelStyle}>Username: </label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                style={inputStyle}
                                placeholder="username"
                                type="username"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="firstname" style={labelStyle}>First Name: </label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                style={inputStyle}
                                placeholder="firstname"
                                type="firstname"
                                name="firstname"
                                value={this.state.firstname}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-1 col-ml-auto">
                            <label className="form-label" htmlFor="lastname" style={labelStyle}>Last Name: </label>
                        </div>
                        <div className="col-3 col-mr-auto">
                            <input className="form-input"
                                style={inputStyle}
                                placeholder="lastname"
                                type="lastname"
                                name="lastname"
                                value={this.state.lastname}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group ">
                        <div className="col-7"></div>
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