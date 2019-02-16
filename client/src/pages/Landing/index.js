import React, { Component } from "react";
import {Redirect} from "react-router-dom"
import "./style.css";
// import Home from "../Home"
import axios from "axios";
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.css';
import './index.css';

export default class Landing extends Component {
state= {
    email: "",
    password: "",
    toHomePage: false
}
handleInputChange = (event) => {
    const {name, value} = event.target;
    console.log(name, value)
    this.setState({
        [name]: value
    })
}
loginUser = async () => {
    try{
   const response = await axios.post("/api/login", {
       email: this.state.email,
       password: this.state.password
   });
   if (response.data) {
       //go to a different page
       this.setState({
           toHomePage: true,
       })

   }
   console.log(response.data)
}catch(e) {
    console.log(e)
} 
}


    render() {
if(this.state.toHomePage) {
    return <Redirect to = {"/Home"} />
}
    return (
<div className="landing">
<div>
<h1>Login</h1>
<div> <input 
name="email" 
type="email" 
value={this.state.email}
onChange = {this.handleInputChange}
placeholder ="Email" />
</div>
<div> <input 
name="password"
 type="password" 
 value= {this.state.value}
 onChange = {this.handleInputChange}
 placeholder ="Password" />
 </div>
<button onclick= {this.loginUser}> Login</button>




</div>




</div>

    )
}
}