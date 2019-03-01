import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from './SignUp';
import { PasswordResetLink } from './PasswordReset'
import { withFirebase } from './Firebase';
import * as Routes from '../constants/routes';
import { Row, Col } from "reactstrap";

const inputStyle = {
    width: '75%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

const form = {
    display: 'block',
    marginLeft: '30px',
    marginRight: 'auto',
}

const about = {
fontSize: '17px',
textAlign: 'center',
}

const SignInPage = () => (
    < div style={form} >
    <Row>
    <Col xs="6">
        <h3>SignIn</h3>
        <SignInForm />
        <SignUpLink />
        </Col>
   
        <Col xs="6">
        <p style ={about}>
        <strong>Welcome to Bookworm!</strong>
       <br></br>
       We’re helping you create a community around the books you love and the ones you want to read. By joining us we help keep you engaged with reading. Join now, create a club, invite your friends, pick your favorite book and get reading!
       <br></br> <br></br>
       Bookworm helps you facilitate your bookclub ensuring everyone is on the same page and place where your club can talk about the book. Our clubs feature benchmark tracking and dialog between users through a familiar post and comment feature.
       <br></br> <br></br>
       We’re totally free, why not sign in and get reading?
       </p>
        </Col>
        </Row>
    </div>
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
    }

    render() {
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div > 
                <br />
                {/* If there's an error with sign in then display the error */}
                {error && <p>{error.message}</p>}
               
                <form className='form-horizontal' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <div >
                            <label className='form-label' style={labelStyle} htmlFor='email'>Email:</label>
                        </div>
                        <div >
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
                        <div >
                            <label className='form-label' style={labelStyle} htmlFor='password'>Password: </label>
                        </div>
                        <div >
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
                        <div ></div>
                        <button
                            className='btn btn-primary '
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