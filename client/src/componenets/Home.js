import React from 'react';
import { withAuthorization } from './Session';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes';

const Home = (props) => {
    return (
        <div>
            <div>Welcome</div>
            {props.grouplist.map(group => <div>Working</div>)}
        </div>
    )
}


const HomeLink = () => (
    <Link to={Routes.home}>
        <button className='btn btn-link'>Home</button>
    </Link>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
export { HomeLink }