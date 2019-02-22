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
import CreateGroup from './componenets/CreateGroup';
import GroupPage from './componenets/GroupPage';
import GroupNav from './componenets/GroupNav'

//adding a comment hoping it will help merge on github
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      currentUser: {}
    }
  };

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.setState({ authUser });
        this.isSignedIn(authUser.email);
      } else {
        this.setState({ authUser: null, currentUser: {} });
        sessionStorage.clear()
      }
    });
  }

  componentWillUnmount() {
    this.listener();
  };

  isSignedIn = async (email) => {
    const dbResponse = await axios.get(`/api/getuser/${email}`);
    const currentUser = {
      username: dbResponse.data.local.username,
      userID: dbResponse.data._id,
      grouplist: dbResponse.data.grouplist
    }
    sessionStorage.setItem('userID', currentUser.userID)
    this.setState({ currentUser })
  }

  render() {

    const { grouplist } = this.state.currentUser;

    return (
      <BrowserRouter>

        <div className="App">

          <NavBar authUser={this.state.authUser} />
          {/* Routes to different components */}
          {grouplist && <GroupNav grouplist={grouplist} />}
          <Route
            exact path={Routes.home}
            render={() =>
              <Home userID={this.state.currentUser.userID} />} />
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
          <Route
            path={Routes.createGroup}
            render={() =>
              <CreateGroup userID={this.state.currentUser.userID} />}
          />
          <Route
            path={`/group`}
            render={() =>
              <GroupPage userID={this.state.currentUser.userID} />}
          />

        </div>
      </BrowserRouter>
    );
  }
}

export default withFirebase(App);