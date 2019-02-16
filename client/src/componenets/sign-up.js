import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			username: '',
			password: '',
			confirmPassword: '',
			email: '',
			zip: '',
			firstname: '',
			lastname: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	};


	handleSubmit(event) {
		console.log('sign-up handleSubmit, email: ')
		console.log(this.state.username)
		event.preventDefault()

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
					})
					// update the state to redirect to home
					this.setState({
						redirectTo: '/'
					})

					console.log('successful signup')
					this.setState({ //redirect to signin page
						redirectTo: '/'
					})
				} else {
					console.log('email already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
	}


	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="SignupForm">
					<h4>Sign up</h4>
					<form className="form-horizontal">
						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="email">Email: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
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
								<label className="form-label" htmlFor="password">Password: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
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
								<label className="form-label" htmlFor="username">Username: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
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
								<label className="form-label" htmlFor="firstname">First Name: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
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
								<label className="form-label" htmlFor="lastname">Last Name: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									placeholder="lastname"
									type="lastname"
									name="lastname"
									value={this.state.lastname}
									onChange={this.handleChange}
								/>
							</div>
						</div>

						<div className="form-group">
							<div className="col-1 col-ml-auto">
								<label className="form-label" htmlFor="zip">Zip: </label>
							</div>
							<div className="col-3 col-mr-auto">
								<input className="form-input"
									placeholder="zip"
									type="zip"
									name="zip"
									value={this.state.zip}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-group ">
							<div className="col-7"></div>
							<button
								className="btn btn-primary col-1 col-mr-auto"
								onClick={this.handleSubmit}
								type="submit"
							>Sign up</button>
						</div>
					</form>
				</div>

			)
		}
	}
}

export default Signup
