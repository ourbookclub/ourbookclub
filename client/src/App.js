import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App";
import axios from "axios";
// import Landing from "./pages/Landing";
// import Home from "./pages/Home";
// import {BrowserRouter as Router, Route } from "react-router-dom";
// components
import { Route, Link } from 'react-router-dom'
import Signup from './componenets/sign-up'
import SigninForm from './componenets/signin-form'
import Navbar from './componenets/navbar'
import Home from './componenets/home'
//adding a comment hoping it will help merge on github
class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      email: '',
      firstname: '',
      lastname: '',
      username: '',
      isLoading: false,
      error: false,
      zip: ''
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  async getUser() {
    let accessString = localStorage.getItem('JWT');
    if (accessString === null) {
      this.setState({
        isLoading: false,
        error: true
      });
    };

    const response = await axios.get('/getuser/', {
      params: { email: this.state.email },
      headers: { Authorization: `JWT ${accessString}` }
    });
    console.log(response)
    this.setState({
      firstname: response.data.firstname,
      lastname: response.data.lastname,
      email: response.data.email,
      username: response.data.username,
      password: response.data.password,
      zip: response.data.zip,
      isLoading: false,
      error: false,
    })

  }

  render() {
    return (
      <div className="App">

        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/signin"
          render={() =>
            <SigninForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup
              updateUser={this.updateUser}
            />}
        />

      </div>
    );
  }
}

export default App;