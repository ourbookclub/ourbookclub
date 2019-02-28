import React, { Component, Fragment } from 'react';
import { withAuthorization } from './Session';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes';
import axios from 'axios';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Col, Row
} from 'reactstrap';

const cardStyle = {
    border: '1px solid darkgrey',
    borderRadius: '2px',
    marginLeft: '5px',
    marginRight: '5px',
    height: 'auto',
    overflow: 'auto'
}

//Stateful component to allow the grouplist to properly populate
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            grouplist: [],
            error: null,
            hasGroups: false
        };
    };

    componentDidMount() {
        if (this.props.grouplist) {
            this.setState({ grouplist: this.props.grouplist });
            this.checkIfGroups();
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.grouplist !== prevProps.grouplist) {
            this.setState({ grouplist: this.props.grouplist });
            this.checkIfGroups();
        };
    };

    checkIfGroups() {
        if (this.props.grouplist.length > 0) {
            this.setState({ hasGroups: true })
        }
    }

    //TODO This only displays 3 groups properly!!
    render() {
        const { grouplist, hasGroups } = this.state;
        return (
            <div>
                {hasGroups ? (grouplist.map(groupID => <GroupCard key={groupID} groupID={groupID} />)) : (<Testing />)}
            </div>
        );
    };
};

const Testing = () => {
    return (
        <div>
            <h1>Welcome to Bookworm!</h1>
            <p>We are here to help you stay engaged with reading. Create a book club above, invite some friends and dive into a good book!</p>
        </div>
    )
}

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

    //First get the data for all the user is apart of
    getGroupData = async (groupID) => {
        const dbResponse = await axios.get(`/api/getgroupdata/${groupID}`);

        if (dbResponse.status === 200) {
            this.setState({
                groupName: dbResponse.data.name,
                currentBook: dbResponse.data.currentBook,
                currentBenchmark: dbResponse.data.currentBenchmark
            }, () => {

                //Once that is written to state then grab the book they're currently reading and the latest post if they exist
                axios.all([this.getBookData(), this.getPostData()]).then(axios.spread((bookData, postData) => {
                    if (bookData.status === 200) {
                        this.setState({
                            bookTitle: bookData.data.title,
                            bookImage: bookData.data.image
                        });
                    }

                    if (postData.data.length > 0) {
                        this.setState({
                            author: postData.data[0].user,
                            date: postData.data[0].date
                        });
                    };
                }))

            });
        };
    };

    getBookData = () => {
        return axios.get(`/api/getbookdata/${this.state.currentBook}`)
    };

    getPostData = () => {
        return axios.get(`/api/getallgrouppost/${this.props.groupID}`);
    };

    render() {
        const { currentBenchmark, bookImage, bookTitle, author, date, groupName } = this.state;
        const postDate = new Date(this.state.date);
        const { groupID } = this.props;

        return (
            <Col sm="3">
                <Card style={cardStyle}>
                    <CardBody>
                        <CardTitle>
                            <strong>{groupName}</strong>
                        </CardTitle>
                        <br />
                        <CardSubtitle>
                            <strong>Next Chapter:  </strong>{currentBenchmark}
                        </CardSubtitle>
                    </CardBody>
                    <CardImg top width="150px" src={bookImage} alt={bookTitle} />
                    <CardBody>
                        <CardText>
                            {author && <PostAuthor author={author} />}
                            <br />
                            {date && postDate.toLocaleString()}
                        </CardText>
                        <Link to={`/group/${groupID}`}>
                            <button className='btn btn-success'>Go to Club</button>
                        </Link>
                    </CardBody>
                </Card>
            </Col>
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
            <Fragment>
                Last Post By: {this.state.username}
            </Fragment>
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