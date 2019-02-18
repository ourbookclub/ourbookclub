import React, { Component } from "react";
import * as Routes from './constants/routes';
import { Route, BrowserRouter } from 'react-router-dom';
import SignUpPage from './componenets/SignUp';
import SignInPage from './componenets/SignIn';
import NavBar from './componenets/NavBar';
import Home from './componenets/Home';
import { withFirebase } from './componenets/Firebase';
import { AuthUserContext } from './componenets/Session';

//adding a comment hoping it will help merge on github
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
    };
  };

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <BrowserRouter>

        <div className="App">

          <NavBar authUser={this.state.authUser} />
          {/* greet user if logged in: */}
          {this.state.authUser &&
            <p>Join the party, {this.state.authUser.email}!</p>
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

export default withFirebase(App);