import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { withAuthorization } from './Session';

import { withFirebase } from './Firebase';
import * as Routes from '../constants/routes';


const inputStyle = {
    width: '50%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

const initalState = {
    password: '',
    passwordConfirm: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...initalState };
    }

    onSubmit = event => {
        event.preventDefault();

        const { password } = this.state;

        this.props.firebase
            .doPasswordUpdate(password)
            .then(() => {
                this.setState({ ...initalState });
                this.props.history.push(Routes.home);
            })
            .catch(error => {
                this.setState({ error });
            });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { password, passwordConfirm, error } = this.state;

        const isInvalid =
            password !== passwordConfirm || password === '';

        return (
            <form className='form-horizontal' onSubmit={this.onSubmit}>
                {error && <p>{error.message}</p>}
                <div className="col-1 col-ml-auto">
                    <label className="form-label" style={labelStyle} htmlFor="password">New Password:</label>
                </div>
                <div className='form-group'>
                    <input className="form-input"
                        style={inputStyle}
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="New Password"
                    />
                </div>
                <div className="col-1 col-ml-auto">
                    <label className="form-label" style={labelStyle} htmlFor="passwordConfirm">Confirm Password:</label>
                </div>
                <div className='form-group'>
                    <input className="form-input"
                        style={inputStyle}
                        name="passwordConfirm"
                        value={passwordConfirm}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Confirm New Password"
                    />
                </div>
                <div className="form-group ">
                    <div className="col-7"></div>
                    <button
                        className="btn btn-primary col-1 col-mr-auto"
                        disabled={isInvalid}
                        type="submit">Update Password</button>
                </div>

            </form>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(compose(withRouter, withFirebase)(PasswordChangeForm));