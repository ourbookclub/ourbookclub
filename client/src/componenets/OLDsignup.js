import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

class Signup extends Component {
	constructor(props) {
		super(props)
		this.state = { ...initialState };

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	};


	handleSubmit(event) {
		event.preventDefault();

		const { username, email, passwordOne, passwordTwo, firstname, lastname, error } = this.state;

		//request to server to add a new username/password
		axios.post('/signup/', {
			email: this.state.email,
			password: this.state.password,
			username: this.state.username,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			zip: this.state.zip
		})
			.then(response => {
				console.log(response)
				if (!response.data.err) {
					this.props.updateUser({
						loggedIn: true,
						email: this.state.email,
						username: this.state.username,
						firstname: this.state.firstname,
						lastname: this.state.lastname,
						isLoading: false,
						error: false,
					});
					// update the state to redirect to home
					this.setState({
						redirectTo: '/'
					});

					console.log('successful signup');
					this.setState({ //redirect to signin page
						redirectTo: '/'
					});
				} else {
					console.log('email already taken');
				};
			}).catch(error => {
				console.log('signup error: ');
				console.log(error);

			});
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

		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="SignupForm">
					<h3>Sign up</h3>
					<br />
					{error && <p>{error.message}</p>}
					<form className="form-horizontal">
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
								onClick={this.handleSubmit}
								type="submit"
							>Sign up</button>
						</div>
					</form>

					<div>
						Have an account?
                        <Link to="/signin" className="btn btn-link text-secondary">
							<button className="btn btn-primary col-1 col-mr-auto">Sign In</button>
						</Link>
					</div>
				</div>

			);
		};
	};
};

export default Signup;