import React, { Component } from 'react';
import { withAuthorization } from './Session';
import axios from 'axios';
import queryString from 'query-string'
// https://tylermcginnis.com/react-router-query-strings/
//TODO START HERE

class GroupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupID: 0,
            groupName: '',
            groupDescription: '',
            error: null
        }
    };

    componentDidMount() {
        const urlString = queryString.parse(this.props.location.search);
        this.getGroupData(urlString.id)
    }

    getGroupData = async (groupID) => {
        const dbResponse = await axios.get(`/api/getgroupdata/${groupID}`);
        if (dbResponse !== 200) {
            //TODO Error message
        } else {
            console.log(dbResponse)
        }
    }

    render() {

        const error = this.state.error;

        return (
            <div>
                {error && <p>{error.message}</p>}

                <p>Group Page</p>
                <img alt='Earthworm Jim and his book' src='../img/1550080499329.png' />
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(GroupPage);