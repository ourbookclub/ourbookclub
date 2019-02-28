import React, { Component, Fragment } from 'react';
import { withAuthorization } from './Session';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes';
import axios from 'axios';
import {Card, CardImg, CardText, CardBody,CardTitle, CardSubtitle, Col, } from 'reactstrap';

const cardStyle = {
    border: '1px solid darkgrey',
    borderRadius: '2px',
    marginLeft: '5px',
    marginRight: '5px'
}
const textsize = {
    fontSize:"25px"
}



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

    //TODO This only displays 3 groups properly!!
    render() {
        const { grouplist } = this.state;
        return (
            <div>
                {grouplist ? grouplist.map(groupID => <GroupCard key={groupID} groupID={groupID} />) : <div><strong>Nothing</strong>No Groups</div>}
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
            <Col sm="4">
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
        <button style={textsize} className='btn btn-link'>Home</button>
    </Link>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Home);
export { HomeLink }