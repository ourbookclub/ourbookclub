import React, { Component } from 'react';
import { withAuthorization } from './Session';
import axios from 'axios';
// https://tylermcginnis.com/react-router-query-strings/
//TODO START HERE

class GroupPage extends Component {

    componentDidMount() {
        console.log(this.props.location.search);
        const groupID = queryString.parse(this.props.location.search)
    }

    getGroupData = async (groupID) => {
        const dbResponse = await axios.get(`/api/getgroupdata/${groupID}`);

    }

    render() {

        return (
            <div>
                <p>Group Page</p>
                <img alt='Earthworm Jim and his book' src='../img/1550080499329.png' />
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(GroupPage);