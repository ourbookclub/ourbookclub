import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from 'react-router-dom' //don't need to specify localhost url in axios http address
//style
import './index.css';
// ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)
