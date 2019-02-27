import React, { Component } from 'react';
import { withAuthorization } from './Session';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes';
import axios from 'axios';


//Stateful component to allow the grouplist to properly populate
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grouplist: [],
            error: null
        };
    };

    componentDidMount() {
        if (this.props.grouplist) {
            this.setState({ grouplist: this.props.grouplist });
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.grouplist !== prevProps.grouplist) {
            this.setState({ grouplist: this.props.grouplist })
        };
    };

    render() {
        const { grouplist } = this.state;
        return (
            <div>
                {grouplist.map(groupID => <GroupCard key={groupID} groupID={groupID} />)}
            </div>
        );
    };
};

//Stateful component to get the groupdata
class GroupCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupName: '',
            currentBook: '',
            currentBenchmark: 0,
            error: null,
            bookTitle: '',
            bookImage: '',
            author: '',
            date: ''
        };
    };

    componentDidMount() {
        const groupID = this.props.groupID;
        this.getGroupData(groupID);
    };

    getGroupData = async (groupID) => {
        const dbResponse = await axios.get(`/api/getgroupdata/${groupID}`);

        if (dbResponse.status === 200) {
            this.setState({
                groupName: dbResponse.data.name,
                currentBook: dbResponse.data.currentBook,
                currentBenchmark: dbResponse.data.currentBenchmark
            }, async () => {
                const dbResponse = await axios.get(`/api/getbookdata/${this.state.currentBook}`);

                if (dbResponse.status === 200) {
                    this.setState({
                        bookTitle: dbResponse.data.title,
                        bookImage: dbResponse.data.image
                    });
                }
                const postResponse = await axios.get(`/api/getallgrouppost/${this.props.groupID}`);

                if (postResponse.data.length > 0) {
                    this.setState({
                        author: dbResponse.data[0].user,
                        date: dbResponse.data[0].date
                    });
                };
            });
        };
    };

    render() {
        const { currentBook, currentBenchmark, bookImage, bookTitle, author, date } = this.state;
        const postDate = new Date(this.state.date);

        return (
            <div>
                {this.state.groupName}
                <div>
                    {bookImage && <img src={bookImage} alt={`${bookTitle}`} />}
                </div>
                <div>
                    <strong>Next Chapter:  </strong>{currentBenchmark}
                </div>
                <div>
                    {author && <PostAuthor author={author} />}
                    {date && <div>{postDate.toLocaleString()}</div>}
                </div>
            </div>
        );
    };
};

class LastPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            author: '',
            date: ''
        };
    };

    componentDidMount = () => {
        if (this.props.groupID) {
            this.getPostData();
        }
    };

    componentDidUpdate(prevProps) {
        if (this.props.groupID !== prevProps.groupID) {
            this.getPostData();
        };
    };

    getPostData = async () => {
        const groupID = this.props.groupID;
        const dbResponse = await axios.get(`/api/getallgrouppost/${groupID}`);

        if (dbResponse.data.length > 0) {
            this.setState({
                author: dbResponse.data[0].user,
                date: dbResponse.data[0].date
            });
        }
    };

    render() {

        const { author, date } = this.state;
        const postDate = new Date(this.state.date);

        return (
            <div>
                {author && <PostAuthor author={author} />}
                {date && <div>{postDate.toLocaleString()}</div>}
            </div>
        );
    };
};

class PostAuthor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        };
    };

    componentDidMount = () => {
        //Taking this out the of lifecycle method to make it an async function
        this.getUsername();
    };

    getUsername = async () => {
        const dbResponse = await axios.get(`/api/getuserbyid/${this.props.author}`);
        if (dbResponse.status === 200) {
            this.setState({ username: dbResponse.data.local.username })
        } else {
            this.setState({ error: dbResponse.data })
        };
    };

    render() {
        return (
            <div>
                Last Post By: {this.state.username}
            </div>
        );
    };
};

const HomeLink = () => (
    <Link to={Routes.home}>
        <button className='btn btn-link'>Home</button>
    </Link>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
export { HomeLink }