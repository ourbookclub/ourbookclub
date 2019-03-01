import React from 'react';
// import { Link } from 'react-router-dom';
import '../App.css';

import * as Routes from '../constants/routes';
import SignOutButton from './SignOutButton';
import { HomeLink } from './Home';
import { CreateGroupLink } from './CreateGroup';
import Logo from '../images/logo.png';

import { Nav, Navbar, NavItem, NavLink } from 'reactstrap';
import { Row, Col } from 'reactstrap';


const background = {
    backgroundColor: '#343a40',
    width: 'auto',
    height: '100%',
    overflow: 'hidden',

    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',


}
const textsize = {
    fontSize: "30px",
    color: 'white',
}

const padding = {
    marginLeft: '40px'
}
const padding2 = {
    textAlign:'left',
}

const NavBar = (props) => {
    return (
        <div>
            <header style={background}
                className="navbar"
            >
                <div style={textsize}>
                    <Row>
                        <Col>
                            <Navbar color="dark" dark expand="md">
                                {props.authUser ? (<section>
                                    <Nav className="ml-auto" navbar>
                                        <NavItem >
                                            <HomeLink />
                                        </NavItem>
                                        <NavItem >
                                            <CreateGroupLink />
                                        </NavItem>
                                        <NavItem>
                                            <SignOutButton />
                                        </NavItem>

                                    </Nav>
                                </section>
                                ) : (
                                        <section>
                                            <Nav style={textsize}  >
                                            <div style={padding2}>
                                                <NavItem>
                                                    <NavLink href={Routes.signin}>Sign In </NavLink>
                                                 
                                                </NavItem>
                                                
                                                </div>
                                                <div style={padding}>
                                                <NavItem>
                                                    <NavLink href={Routes.signup}>Sign Up</NavLink>
                                                </NavItem>
                                                </div>
                                            </Nav>
                                        </section>
                                    )
                                }
                            </Navbar>
                        </Col>
                    </Row>
                </div>
                <div >
                    <Row>
                        <Col sm={{ size: '4', offset: 1 }}>
                            <img src={Logo} alt="Logo" height="150px" width="auto" />
                        </Col>
                    </Row>
                </div>
            </header>
        </div >

    )
}


export default NavBar;