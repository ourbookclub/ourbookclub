import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GroupNav = (props) => {
    return (
        <div fontSize="50px">
            {props.grouplist.map(groupID => <Link to={`/group/${groupID}`} key={groupID}><SingleGroup groupID={groupID} key={groupID} /></Link>)}
        </div>
    )
}

class SingleGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupName: '',
            error: null
        }
    }

    componentDidMount = async () => {
        const dbResponse = await axios.get(`/api/getgroupdata/${this.props.groupID}`);
        if (dbResponse.status === 200) {
            this.setState({ groupName: dbResponse.data.name })
        } else {
            this.setState({ error: dbResponse.data })
        }
    }

    render() {
        return (
            <div>{this.state.groupName}</div>
        );
    };
};



export default GroupNav;