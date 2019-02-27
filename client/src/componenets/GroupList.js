import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GroupList = (props) => {
    return (
<<<<<<< HEAD:client/src/componenets/GroupNav.js
        <div fontSize="50px">
            {props.grouplist.map(groupID => <Link to={`/group/${groupID}`} key={groupID}><SingleGroup groupID={groupID} key={groupID} /></Link>)}
=======
        <div>
            <h4>Your Clubs:</h4>
            <div>
                {props.grouplist.map(groupID =>
                    <Link to={`/group/${groupID}`} key={groupID}>
                        <SingleGroup groupID={groupID} key={groupID} />
                    </Link>)}
            </div>
>>>>>>> master:client/src/componenets/GroupList.js
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



export default GroupList;