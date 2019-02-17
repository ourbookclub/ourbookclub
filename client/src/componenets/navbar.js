import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';
import * as Routes from '../constants/routes'

class Navbar extends Component {
    constructor() {
        super()
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault()
        axios.post('/signout').then(response => {
            console.log(response.data)
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error', error)
        })
    }

    render() {
        const loggedIn = this.props.loggedIn;

        return (
            <div>
                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {loggedIn ? (
                            <section className="navbar-section">
                                <Link to="#" className="btn btn-link text-secondary" onClick={this.logout}>
                                    <span className="text-secondary">logout</span></Link>

                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to={Routes.home} className="btn btn-link text-secondary">
                                        <span className="text-secondary">home</span>
                                    </Link>
                                    <Link to={Routes.signin} className="btn btn-link text-secondary">
                                        <span className="text-secondary">Signin</span>
                                    </Link>
                                    <Link to={Routes.signup} className="btn btn-link">
                                        <span className="text-secondary">sign up</span>
                                    </Link>
                                </section>
                            )}
                    </div>
                    <div className="col-4 col-mr-auto">
                        <div id="top-filler"></div>
                        <h1 className="App-title">Bookworm</h1>
                    </div>
                </header>
            </div>

        );

    }
}

export default Navbar