import React, { Component, Fragment } from 'react';
import { withAuthorization } from '../Session';
import axios from 'axios';
import queryString from 'query-string';
import CurrentBook from './CurrentBook';
import AddBook from './AddBook';


const initialState = {
    groupID: 0,
    groupName: '',
    groupDescription: '',
    userlist: [],
    currentBook: '',
    pastBook: [],
    currentBenchmark: 0,
    previousBenchmark: [],
    totalBenchmark: 0,
    isAdmin: false,
    error: null
}

class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState }
    };

    componentDidMount() {
        const urlString = queryString.parse(this.props.location.search);
        this.getGroupData(urlString.id)
    }

    getGroupData = async (groupID) => {
        const dbResponse = await axios.get(`/api/getgroupdata/${groupID}`);
        if (dbResponse.status === 200) {
            this.setState({
                groupID: dbResponse.data._id,
                groupName: dbResponse.data.name,
                groupDescription: dbResponse.data.description,
                userlist: dbResponse.data.userlist,
                currentBook: dbResponse.data.currentBook,
                pastBook: dbResponse.data.pastBook,
                currentBenchmark: dbResponse.data.currentBenchmark,
                previousBenchmark: dbResponse.data.previousBenchmark,
                totalBenchmark: dbResponse.data.totalBenchmark,
            }, () => this.checkAdmin()) //Want check admin to only run after the state is set
        } else {
            //TODO Check Error message
            this.setState({
                error: dbResponse.data.error
            })
        }
    }

    checkAdmin = () => {
        //TODO NOT WORKING
        const { userlist } = this.state;
        const currentUserID = sessionStorage.getItem('userID');

        const currentUser = userlist.filter(user => user._id === currentUserID);
        if (currentUser[0].isAdmin) {
            this.setState({
                isAdmin: true
            });
        }
    }

    render() {
        const { groupID, groupName, groupDescription, userlist, currentBook, pastBook, currentBenchmark, previousBenchmark, totalBenchmark, error } = this.state;

        return (
            <div>
                {error && <p>{error.message}</p>}

                <AddBook groupID={groupID} />
                <GroupInfo groupName={groupName} groupDescription={groupDescription} />
                <CurrentBook currentBook={currentBook} currentBenchmark={currentBenchmark} totalBenchmark={totalBenchmark} />
                <img alt='Earthworm Jim and his book' src='../img/1550080499329.png' />
            </div>
        )
    }
}

const GroupInfo = (params) => {
    return (
        <Fragment>
            <h3>Name: {params.groupName}</h3>
            <p><strong>Description: </strong>{params.groupDescription}</p>
        </Fragment>
    )
}



const condition = authUser => !!authUser;

export default withAuthorization(condition)(GroupPage);