import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import * as Routes from '../constants/routes';
import SignOutButton from './SignOutButton';

class NavBar extends Component {

    render() {
        return (
            < div >
                <header className="navbar App-header" id="nav-container">
                    <div className="col-4" >
                        {this.props.authUser ? (
                            <section className="navbar-section">
                                <SignOutButton />
                                <Link to={Routes.passwordChange} className="btn btn-link">
                                    <span className="text-secondary">Update Password</span>
                                </Link>
                            </section>
                        ) : (
                                <section className="navbar-section">
                                    <Link to={Routes.signin} className="btn btn-link">
                                        <span className="text-secondary">Sign In</span>
                                    </Link>
                                    <Link to={Routes.signup} className="btn btn-link">
                                        <span className="text-secondary">sign up</span>
                                    </Link>
                                </section>
                            )
                        }
                    </div>
                    <div className="col-4 col-mr-auto">
                        <div id="top-filler"></div>
                        <h1 className="App-title">Bookworm</h1>
                    </div>
                </header>
            </div >

        )
    }
}

export default NavBar;