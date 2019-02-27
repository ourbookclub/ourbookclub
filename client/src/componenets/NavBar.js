import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Background from '../images/spacebackground.jpg';
import * as Routes from '../constants/routes';
import SignOutButton from './SignOutButton';
import { HomeLink } from './Home';
import Logo from '../images/logo.png';
import Border from '../images/background.png';
import JimGif from '../images/JimGif.gif';
import { Nav, Navbar, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';


const background = {
    backgroundColor: 'black',
    // backgroundImage: `url(${Border})`,
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
       
            <header style={background} 
             className="navbar" 
             >
            <div row> </div>
                <div className="col-12 col-mr-auto">
                <Navbar color="light" light expand="md">
              
                    {props.authUser ? ( <section>
                        <Nav className="ml-auto" navbar>
                        
<NavItem >

                            <HomeLink />
                            </NavItem>
                            
                            <NavItem >
                            <Link to={Routes.createGroup} >
                                Create a Club
                            </Link>
                            </NavItem>
                            <NavItem>
                            <SignOutButton />
                            </NavItem>
                            
                            </Nav>
                       </section>
                    ) : (
                        <section>
                        
                        <NavItem>
                        <NavLink href={Routes.signin}>Sign In</NavLink>
                      </NavItem>
                      <NavItem>
                      <NavLink href={Routes.signup}>Sign Up</NavLink>
                    </NavItem>
                      
                            
                    
                            
                    </section> )
                    }
                
                    </Navbar>
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
                <div >
                
                {/* className="navbar App-header" className="col-12 col-mr-auto">
                <img src={JimGif} poition  alt="gif" height="auto" width="auto"   /> */}
                </div>
            </header>
        </div >

    )
}


export default NavBar;