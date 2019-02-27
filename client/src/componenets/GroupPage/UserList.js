import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const textsize = {
    fontSize: '50px' 
}

const UserList = (props) => {
    return (
        <Fragment>
            <h3 style={textsize}>Userlist:</h3>
            <div>
                {props.userlist.map((user, i) => <Link to={`/user/${user._id}`} key={i}><SingleUser userID={user._id} key={user._id} /></Link>)}
            </div>
            <br />
        </Fragment>
    )
}

class SingleUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            error: null
        }
    }

    componentDidMount = async () => {
        const dbResponse = await axios.get(`/api/getuserbyid/${this.props.userID}`);
        if (dbResponse.status === 200) {
            this.setState({ username: dbResponse.data.local.username })
        } else {
            this.setState({ error: dbResponse.data })
        }
    }

    render() {
        return (
            <div style={textsize}>{this.state.username}</div>
        );
    };
};



export default UserList;