import React, { Component, Fragment } from 'react';
import { withAuthorization } from '../Session';
import axios from 'axios';
import CurrentBook from './CurrentBook';
import AddBook from './AddBook';
import AddPost from './Discussion';
import ShowAllPosts from './ShowAllPosts';
import UpdateBenchmark from './UpdateBenchmark';
import UserSearch from '../UserSearch';
import UserList from './UserList';
import GroupNav from './GroupNav';

//Initializes all the data we need for the group as well as what should display on the app
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
    error: null,
    showMainPage: true,
    updateBook: false,
    addUser: false
};


class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState };
    };

    componentDidMount() {
        const groupIDFromURL = this.props.match.params.group;
        this.getGroupData(groupIDFromURL);
    };

    componentDidUpdate(prevProps) {
        if (this.props.match.params.group !== prevProps.match.params.group) {
            const groupID = this.props.match.params.group;
            this.getGroupData(groupID);
        };
    };

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
            }, () => this.checkAdmin()); //Want check admin to only run after the state is set
        } else {
            //TODO Check Error message
            this.setState({
                error: dbResponse.data.error
            });
        };
    };

    checkAdmin = () => {
        const { userlist } = this.state;
        const currentUserID = sessionStorage.getItem('userID');

        const currentUser = userlist.filter(user => user._id === currentUserID);
        if (currentUser[0].isAdmin) {
            this.setState({
                isAdmin: true
            });
        };
    };

    //Toggles the page based on what the user chooses to see
    updatePage = (showPage) => {
        switch (showPage) {
            case 'main':
                this.setState({
                    showMainPage: true,
                    updateBook: false,
                    addUser: false
                });
                this.getGroupData(this.state.groupID);
                break;
            case 'updateBook':
                this.setState({
                    showMainPage: false,
                    updateBook: true,
                    addUser: false
                });
                this.getGroupData(this.state.groupID);
                break;
            case 'addUser':
                this.setState({
                    showMainPage: false,
                    updateBook: false,
                    addUser: true
                });
                this.getGroupData(this.state.groupID);
                break;
        }
    };

    render() {
        const { groupID, groupName, groupDescription, userlist, currentBook,
            pastBook, currentBenchmark, previousBenchmark, totalBenchmark, error,
            isAdmin, showMainPage, updateBook, addUser } = this.state;

        return (
            <div>
                {error && <p>{error.message}</p>}

                {isAdmin && <GroupNav updatePage={this.updatePage} />}
                <GroupInfo groupName={groupName} groupDescription={groupDescription} />
                <UserList userlist={userlist} />
                {currentBook && <CurrentBook currentBook={currentBook} currentBenchmark={currentBenchmark} totalBenchmark={totalBenchmark} />}
                {showMainPage &&
                    <Fragment>
                        <AddPost userID={this.props.userID} groupID={groupID} />
                        <ShowAllPosts groupID={groupID} />
                    </Fragment>
                }
                {updateBook &&
                    <Fragment>
                        <AddBook groupID={groupID} isAdmin={isAdmin} />
                        <UpdateBenchmark isAdmin={isAdmin} groupID={groupID} />
                    </Fragment>
                }
                {addUser &&
                    <UserSearch groupID={groupID} isAdmin={isAdmin} />
                }

            </div>
        );
    };
};

const GroupInfo = (props) => {
    return (
        <Fragment>
            <h3>Name: {props.groupName}</h3>
            <p><strong>Description: </strong>{props.groupDescription}</p>
        </Fragment>
    );
};



const condition = authUser => !!authUser;

export default withAuthorization(condition)(GroupPage);