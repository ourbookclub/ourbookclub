import React, { Component } from 'react';
import { withAuthorization } from './Session';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes';
import Background from '../images/spacebackground.jpg'
import WormFooter from '../images//wormfooter.png'



class Home extends Component {

    render() {
        const imageStyle = {
           
            // backgroundImage: `url(${Background})`,
            backgroundSize: 'cover',
  
        }
        return (
            <div>
                <img style={imageStyle} alt='Earthworm Jim and his book' src='../img/1550080499329.png' />
            </div>
        )
    }
}

const HomeLink = () => (
    <Link to={Routes.home}>
        <button className='btn btn-link'>Home</button>
    </Link>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
export { HomeLink }