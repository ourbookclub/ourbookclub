import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from './SignUp';
import { PasswordResetLink } from './PasswordReset'
import { withFirebase } from './Firebase';
import * as Routes from '../constants/routes';

const inputStyle = {
    width: '50%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

const SignInPage = () => (
    < div >
        <h3>SignIn</h3>
        <SignInForm />
        <SignUpLink />
    </div >
);

const initialState = {
    email: '',
    password: '',
    error: null
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props)
        this.state = { ...initialState };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { email, password } = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(async () => {
                this.setState({ ...initialState });
                this.props.history.push(Routes.home);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div>
                <br />
                {/* If there's an error with sign in then display the error */}
                {error && <p>{error.message}</p>}

                <form className='form-horizontal' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='email'>Email:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='text'
                                name='email'
                                placeholder='email'
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='password'>Password: </label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                placeholder='password'
                                type='password'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-group '>
                        <div className='col-7'></div>
                        <button
                            className='btn btn-primary col-1 col-mr-auto'
                            disabled={isInvalid}
                            type='submit'>Login</button>
                    </div>
                </form>
                <PasswordResetLink />
            </div>
        );
    };
};

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

const SignInLink = () => (
    <p>
        Already have an account? <Link to={Routes.signin}><button className='btn btn-success'>Sign In</button></Link>
    </p>
);

export default SignInPage;

export { SignInForm, SignInLink };