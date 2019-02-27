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
            error: null
        }
    }

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
            });
        };
    };

    render() {
        const { currentBook, currentBenchmark } = this.state;
        const { groupID } = this.props;

        return (
            <div>
                {this.state.groupName}
                <div>
                    <CurrentBook currentBook={currentBook} />
                </div>
                <div>
                    <strong>Next Chapter:  </strong>{currentBenchmark}
                </div>
                <div>
                    <LastPost groupID={groupID} />
                </div>
            </div>
        );
    };
};

class CurrentBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            image: '',
            error: null
        };
    };

    componentDidMount() {
        const bookID = this.props.currentBook;
        if (bookID) {
            this.getCurrentBook(bookID);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentBook !== prevProps.currentBook) {
            const bookID = this.props.currentBook;
            this.getCurrentBook(bookID)
        }
    }

    getCurrentBook = async (bookID) => {
        const dbResponse = await axios.get(`/api/getbookdata/${bookID}`);

        if (dbResponse.status === 200) {
            this.setState({
                title: dbResponse.data.title,
                image: dbResponse.data.image
            })
        } else {
            this.setState({
                error: dbResponse.data.error
            });
        };
    }


    render() {
        const { image, title } = this.state;
        return (
            <div>
                {title && <div>Currently Reading: {title}</div>};
                <div>
                    {image && <img src={image} alt={`${title}`} />}
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