import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
// import Landing from "./pages/Landing";
// import Home from "./pages/Home";
// import {BrowserRouter as Router, Route } from "react-router-dom";
// components
import { Route, Link } from 'react-router-dom'
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './componenets/home'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
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
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        />

      </div>
    );
  }
}




// class App extends Component {

//   state = {
//     // "test": "is a test",
//     // "result": ""
//   }

//   componentDidMount() {
//     console.log("Mounted")
//     axios.get("/api/test").then(result => {
//       this.setState({ "result": result.data.correct })
//     });
//   }


//   render() {
//     return (

//       <div className="App">
//         <div className="App-header">
//           {/* <Header /> */}
//           <Router>
//           <div className= "content">
//           <Route path ="/" component= {Landing} />
//           <Route exact path ="/Home" component={Home} />
//             </div>

//           </Router>
//         </div>
//         <p className="App-intro">
//           Test value {this.state.test} <br />
//           {this.state.result}
//         </p>
//       </div>
//     )
//   }
// }

export default App;
