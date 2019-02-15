import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import {BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {

  state = {
    // "test": "is a test",
    // "result": ""
  }

  componentDidMount() {
    console.log("Mounted")
    axios.get("/api/test").then(result => {
      this.setState({ "result": result.data.correct })
    });
  }


  render() {
    return (

      <div className="App">
        <div className="App-header">
          {/* <Header /> */}
          <Router>
          <div className= "content">
          <Route path ="/" component= {Landing} />
          <Route exact path ="/Home" component={Home} />
            </div>

          </Router>
        </div>
        <p className="App-intro">
          Test value {this.state.test} <br />
          {this.state.result}
        </p>
      </div>
    )
  }
}

export default App;
