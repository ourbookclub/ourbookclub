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
                <p>It's good to be home {this.props.userID}</p>
                <img  style={imageStyle} width='33%' alt='Earthworm Jim and his book' src={WormFooter} />
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