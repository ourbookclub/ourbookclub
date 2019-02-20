import React, { Component } from "react";
import * as Routes from './constants/routes';
import { Route, BrowserRouter } from 'react-router-dom';
import { withFirebase } from './componenets/Firebase';
import axios from 'axios';

// Components
import SignUpPage from './componenets/SignUp';
import SignInPage from './componenets/SignIn';
import NavBar from './componenets/NavBar';
import Home from './componenets/Home';
import PasswordReset from './componenets/PasswordReset';
import PasswordChange from './componenets/PasswordChange';
import UserProfile from './componenets/UserProfile'

//adding a comment hoping it will help merge on github
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      currentUser: null
    }
  };

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ authUser });
        this.isSignedIn(authUser.email);
      } else {
        this.setState({ authUser: null, currentUser: null });
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  };

  isSignedIn = async (email) => {
    console.log(`working ${email}`)
    const dbResponse = await axios.get(`/api/getuser/${email}`);
    const currentUser = {
      username: dbResponse.data.local.username,
      _id: dbResponse.data._id
    }
    this.setState({ currentUser })
  }

  render() {
    return (
      <BrowserRouter>

        <div className="App">

          <NavBar authUser={this.state.authUser} />
          {/* greet user if logged in: */}
          {this.state.currentUser &&
            <p>Join the party, {this.state.currentUser.username}!</p>
          }
          {/* Routes to different components */}
          <Route
            exact path="/"
            component={Home} />
          <Route
            path={Routes.signin}
            render={() =>
              <SignInPage />}
          />
          <Route
            path={Routes.signup}
            render={() =>
              <SignUpPage />}
          />
          <Route
            path={Routes.passwordReset}
            render={() =>
              <PasswordReset />}
          />
          <Route
            path={Routes.passwordChange}
            render={() =>
              <PasswordChange />}
          />
          <Route
            path={Routes.userProfile}
            render={() =>
              <UserProfile />}
          />

        </div>
      </BrowserRouter>
    );
  }
}

export default withFirebase(App);