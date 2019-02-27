import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Background from '../images/spacebackground.jpg'
import * as Routes from '../constants/routes';
import SignOutButton from './SignOutButton';
import { HomeLink } from './Home';
import Logo from '../images/logo.png'
import Border from '../images/background.png'
import JimGif from '../images/JimGif.gif'
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';


const background = {
    backgroundImage: `url(${Border})`,
        width: 'auto',
        height: '100%',
        overflow: 'hidden',
   
    backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',

}

const NavBar = (props) => {
    return (
        < div >
       
            <header style={background}  className="navbar App-header" >
            <div row> </div>
                <div className="col-12 col-mr-auto">
                <Nav fixed="top" />
                <Nav>
                    {props.authUser ? (
                        <section >
                          <NavItem className="col-12 col-mr-auto">
            <NavLink fontSize="50px" href= {<HomeLink />} active>Home</NavLink>
          </NavItem>
          
          <NavItem className="col-12 col-mr-auto">
            <NavLink href= {<SignOutButton />} active>Sign Out</NavLink>
          </NavItem>
          <NavItem className="col-12 col-mr-auto">
            <NavLink href={Routes.passwordChange}>Update Password</NavLink>
          </NavItem>
          


                         
                        </section>
                    ) : (
                        <section>
                        <NavItem>
                        <NavLink href={Routes.signin}>Sign In</NavLink>
                      </NavItem>
                      <NavItem>
                      <NavLink href={Routes.signup}>Sign Up</NavLink>
                    </NavItem>
                      
                            
                                
                            </section>
                        )
                    }
                
                    </Nav>
                </div>
                <div row> </div>
                <div className="navbar App-header" className="col-12 col-mr-auto">
                
                <div row> </div>
                    <div id="top-filler"></div>
                    <div></div>
     <img src={Logo}  alt="Logo" height="251px" width="auto"   />
                </div>
                <div id="top-filler"></div>
                <br></br>
                <div className="navbar App-header" className="col-12 col-mr-auto">
                <img src={JimGif} poition  alt="gif" height="auto" width="auto"   />
                </div>
            </header>
        </div >

    )
}


export default NavBar;