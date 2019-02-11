import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

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
          {/* <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2> */}
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
