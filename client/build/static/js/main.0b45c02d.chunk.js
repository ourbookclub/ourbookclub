(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,a,t){},28:function(e,a,t){e.exports=t(59)},58:function(e,a,t){},59:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),s=t(26),r=t.n(s),o=(t(20),t(18)),c=t.n(o),m=t(27),i=t(7),u=t(8),d=t(10),h=t(9),p=t(3),g=t(11),b=t(12),f=t.n(b),E=t(62),v=t(15),N=t(63),y=function(e){function a(){var e;return Object(i.a)(this,a),(e=Object(d.a)(this,Object(h.a)(a).call(this))).state={username:"",password:"",confirmPassword:"",email:"",zip:"",firstname:"",lastname:"",redirectTo:null},e.handleSubmit=e.handleSubmit.bind(Object(p.a)(e)),e.handleChange=e.handleChange.bind(Object(p.a)(e)),e}return Object(g.a)(a,e),Object(u.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(v.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){var a=this;console.log("sign-up handleSubmit, email: "),console.log(this.state.username),e.preventDefault(),f.a.post("/signup/",{email:this.state.email,password:this.state.password,username:this.state.username,firstname:this.state.firstname,lastname:this.state.lastname,zip:this.state.zip}).then(function(e){console.log(e),e.data.err?console.log("email already taken"):(a.props.updateUser({loggedIn:!0,email:a.state.email,username:a.state.username,firstname:a.state.firstname,lastname:a.state.lastname,isLoading:!1,error:!1}),a.setState({redirectTo:"/"}),console.log("successful signup"),a.setState({redirectTo:"/"}))}).catch(function(e){console.log("signup error: "),console.log(e)})}},{key:"render",value:function(){return this.state.redirectTo?l.a.createElement(N.a,{to:{pathname:this.state.redirectTo}}):l.a.createElement("div",{className:"SignupForm"},l.a.createElement("h4",null,"Sign up"),l.a.createElement("form",{className:"form-horizontal"},l.a.createElement("div",{className:"form-group"},l.a.createElement("div",{className:"col-1 col-ml-auto"},l.a.createElement("label",{className:"form-label",htmlFor:"email"},"Email: ")),l.a.createElement("div",{className:"col-3 col-mr-auto"},l.a.createElement("input",{className:"form-input",type:"text",id:"email",name:"email",placeholder:"email",value:this.state.email,onChange:this.handleChange}))),l.a.createElement("div",{className:"form-group"},l.a.createElement("div",{className:"col-1 col-ml-auto"},l.a.createElement("label",{className:"form-label",htmlFor:"password"},"Password: ")),l.a.createElement("div",{className:"col-3 col-mr-auto"},l.a.createElement("input",{className:"form-input",placeholder:"password",type:"password",name:"password",value:this.state.password,onChange:this.handleChange}))),l.a.createElement("div",{className:"form-group"},l.a.createElement("div",{className:"col-1 col-ml-auto"},l.a.createElement("label",{className:"form-label",htmlFor:"username"},"Username: ")),l.a.createElement("div",{className:"col-3 col-mr-auto"},l.a.createElement("input",{className:"form-input",placeholder:"username",type:"username",name:"username",value:this.state.username,onChange:this.handleChange}))),l.a.createElement("div",{className:"form-group"},l.a.createElement("div",{className:"col-1 col-ml-auto"},l.a.createElement("label",{className:"form-label",htmlFor:"firstname"},"First Name: ")),l.a.createElement("div",{className:"col-3 col-mr-auto"},l.a.createElement("input",{className:"form-input",placeholder:"firstname",type:"firstname",name:"firstname",value:this.state.firstname,onChange:this.handleChange}))),l.a.createElement("div",{className:"form-group"},l.a.createElement("div",{className:"col-1 col-ml-auto"},l.a.createElement("label",{className:"form-label",htmlFor:"lastname"},"Last Name: ")),l.a.createElement("div",{className:"col-3 col-mr-auto"},l.a.createElement("input",{className:"form-input",placeholder:"lastname",type:"lastname",name:"lastname",value:this.state.lastname,onChange:this.handleChange}))),l.a.createElement("div",{className:"form-group"},l.a.createElement("div",{className:"col-1 col-ml-auto"},l.a.createElement("label",{className:"form-label",htmlFor:"zip"},"Zip: ")),l.a.createElement("div",{className:"col-3 col-mr-auto"},l.a.createElement("input",{className:"form-input",placeholder:"zip",type:"zip",name:"zip",value:this.state.zip,onChange:this.handleChange}))),l.a.createElement("div",{className:"form-group "},l.a.createElement("div",{className:"col-7"}),l.a.createElement("button",{className:"btn btn-primary col-1 col-mr-auto",onClick:this.handleSubmit,type:"submit"},"Sign up"))))}}]),a}(n.Component),j=function(e){function a(){var e;return Object(i.a)(this,a),(e=Object(d.a)(this,Object(h.a)(a).call(this))).state={email:"",password:"",redirectTo:null},e.handleSubmit=e.handleSubmit.bind(Object(p.a)(e)),e.handleChange=e.handleChange.bind(Object(p.a)(e)),e}return Object(g.a)(a,e),Object(u.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(v.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){var a=this;e.preventDefault(),console.log("handleSubmit"),f.a.post("/signin",{email:this.state.email,password:this.state.password}).then(function(e){console.log("login response: "),console.log(e),200===e.status&&(a.props.updateUser({loggedIn:!0,username:e.data.username,firstname:e.data.firstname,lastname:e.data.lastname,email:e.data.email,isLoading:!1,error:!1}),a.setState({redirectTo:"/"}))}).catch(function(e){console.log("login error: "),console.log(e)})}},{key:"render",value:function(){return this.state.redirectTo?l.a.createElement(N.a,{to:{pathname:this.state.redirectTo}}):l.a.createElement("div",null,l.a.createElement("h4",null,"Login"),l.a.createElement("form",{className:"form-horizontal"},l.a.createElement("div",{className:"form-group"},l.a.createElement("div",{className:"col-1 col-ml-auto"},l.a.createElement("label",{className:"form-label",htmlFor:"email"},"Email:")),l.a.createElement("div",{className:"col-3 col-mr-auto"},l.a.createElement("input",{className:"form-input",type:"text",id:"email",name:"email",placeholder:"email",value:this.state.email,onChange:this.handleChange}))),l.a.createElement("div",{className:"form-group"},l.a.createElement("div",{className:"col-1 col-ml-auto"},l.a.createElement("label",{className:"form-label",htmlFor:"password"},"Password: ")),l.a.createElement("div",{className:"col-3 col-mr-auto"},l.a.createElement("input",{className:"form-input",placeholder:"password",type:"password",name:"password",value:this.state.password,onChange:this.handleChange}))),l.a.createElement("div",{className:"form-group "},l.a.createElement("div",{className:"col-7"}),l.a.createElement("button",{className:"btn btn-primary col-1 col-mr-auto",onClick:this.handleSubmit,type:"submit"},"Login"))))}}]),a}(n.Component),w=t(60),O=(t(58),function(e){function a(){var e;return Object(i.a)(this,a),(e=Object(d.a)(this,Object(h.a)(a).call(this))).logout=e.logout.bind(Object(p.a)(e)),e}return Object(g.a)(a,e),Object(u.a)(a,[{key:"logout",value:function(e){var a=this;e.preventDefault(),console.log("logging out"),f.a.post("/signout").then(function(e){console.log(e.data),200===e.status&&a.props.updateUser({loggedIn:!1,username:null})}).catch(function(e){console.log("Logout error",e)})}},{key:"render",value:function(){var e=this.props.loggedIn;return console.log("navbar render, props: "),console.log(this.props),l.a.createElement("div",null,l.a.createElement("header",{className:"navbar App-header",id:"nav-container"},l.a.createElement("div",{className:"col-4"},e?l.a.createElement("section",{className:"navbar-section"},l.a.createElement(w.a,{to:"#",className:"btn btn-link text-secondary",onClick:this.logout},l.a.createElement("span",{className:"text-secondary"},"logout"))):l.a.createElement("section",{className:"navbar-section"},l.a.createElement(w.a,{to:"/",className:"btn btn-link text-secondary"},l.a.createElement("span",{className:"text-secondary"},"home")),l.a.createElement(w.a,{to:"/signin",className:"btn btn-link text-secondary"},l.a.createElement("span",{className:"text-secondary"},"Signin")),l.a.createElement(w.a,{to:"/signup",className:"btn btn-link"},l.a.createElement("span",{className:"text-secondary"},"sign up")))),l.a.createElement("div",{className:"col-4 col-mr-auto"},l.a.createElement("div",{id:"top-filler"}),l.a.createElement("h1",{className:"App-title"},"MERN Passport"))))}}]),a}(n.Component)),C=function(e){function a(){return Object(i.a)(this,a),Object(d.a)(this,Object(h.a)(a).call(this))}return Object(g.a)(a,e),Object(u.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("p",null,"It's good to be home"),l.a.createElement("img",{style:{width:400},src:"../img/1550080499329.png"}))}}]),a}(n.Component),k=function(e){function a(){var e;return Object(i.a)(this,a),(e=Object(d.a)(this,Object(h.a)(a).call(this))).state={loggedIn:!1,email:"",firstname:"",lastname:"",username:"",isLoading:!1,error:!1,zip:""},e.getUser=e.getUser.bind(Object(p.a)(e)),e.componentDidMount=e.componentDidMount.bind(Object(p.a)(e)),e.updateUser=e.updateUser.bind(Object(p.a)(e)),e}return Object(g.a)(a,e),Object(u.a)(a,[{key:"componentDidMount",value:function(){this.getUser()}},{key:"updateUser",value:function(e){this.setState(e)}},{key:"getUser",value:function(){var e=Object(m.a)(c.a.mark(function e(){var a,t;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return null===(a=localStorage.getItem("JWT"))&&this.setState({isLoading:!1,error:!0}),e.next=5,f.a.get("/getuser/",{params:{email:this.state.email},headers:{Authorization:"JWT ".concat(a)}});case 5:t=e.sent,this.setState({firstname:t.data.firstname,lastname:t.data.lastname,email:t.data.email,username:t.data.username,password:t.data.password,zip:t.data.zip,isLoading:!1,error:!1});case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"App"},l.a.createElement(O,{updateUser:this.updateUser,loggedIn:this.state.loggedIn}),this.state.loggedIn&&l.a.createElement("p",null,"Join the party, ",this.state.username,"!"),l.a.createElement(E.a,{exact:!0,path:"/",component:C}),l.a.createElement(E.a,{path:"/signin",render:function(){return l.a.createElement(j,{updateUser:e.updateUser})}}),l.a.createElement(E.a,{path:"/signup",render:function(){return l.a.createElement(y,{updateUser:e.updateUser})}}))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var S=t(61);r.a.render(l.a.createElement(S.a,null,l.a.createElement(k,null)),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.0b45c02d.chunk.js.map