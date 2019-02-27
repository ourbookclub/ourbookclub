import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Background from '../images/spacebackground.jpg';
import * as Routes from '../constants/routes';
import SignOutButton from './SignOutButton';
import { HomeLink } from './Home';
import { CreateGroupLink } from './CreateGroup';
import Logo from '../images/logo.png';
import Border from '../images/background.png';
import JimGif from '../images/JimGif.gif';
import { Nav, Navbar, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';


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
const textsize = {
    fontSize:"20px"
}

const NavBar = (props) => {
    return (
        < div  >
       
            <header style={background} 
             className="navbar" 
             >
            
                <div>
                <Row>
                    <Col>
                <Navbar color="light" light expand="md">
              
                    {props.authUser ? ( <section>
                        <Nav style={textsize}  className="ml-auto" navbar>
                        
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
                         <Nav style={textsize}  className="ml-auto" navbar>
                        <NavItem>
                        <NavLink href={Routes.signin}>Sign In</NavLink>
                      </NavItem>
                      <NavItem>
                      <NavLink href={Routes.signup}>Sign Up</NavLink>
                    </NavItem>
                      
                            
                    
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
                <Col sm={{ size: '4', offset: 1}}>
                  
     <img src={Logo}  alt="Logo" height="150px" width="auto"   />

     </Col>
     <Col sm={{ size: '2', offset: 3 }}>
     <img src={JimGif}  alt="gif" height="auto" width="auto"   />
     </Col>

     </Row>
                </div>
             
                
            </header>
        </div >

    )
}


export default NavBar;