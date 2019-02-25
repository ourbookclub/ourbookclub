import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import * as Routes from '../constants/routes';
import SignOutButton from './SignOutButton';
import { HomeLink } from './Home';


const NavBar = (props) => {
    return (
        < div >
            <header className="navbar App-header" id="nav-container">
                <div className="col-4" >
                    {props.authUser ? (
                        <section className="navbar-section">
                            <HomeLink />
                            <Link to={Routes.createGroup} className="btn btn-link">
                                Create a Club
                            </Link>
                            <SignOutButton />
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


export default NavBar;