import React, { Component } from "react";
import "./App";
import * as Routes from './constants/routes';
// components
import { Route, BrowserRouter } from 'react-router-dom'
import SignUpPage from './componenets/signup'
import SignInPage from './componenets/signin'
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

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {

  };

  render() {
    return (
      <BrowserRouter>

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
            path={Routes.signin}
            render={() =>
              <SignInPage
                updateUser={this.updateUser}
              />}
          />
          <Route
            path={Routes.signup}
            render={() =>
              <SignUpPage
                updateUser={this.updateUser}
              />}
          />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;