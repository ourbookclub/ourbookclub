import React, { Component, Fragment } from 'react';
import { withAuthorization } from './Session';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes';
import axios from 'axios';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Col, Button } from 'reactstrap';

const cardStyle = {
    border: '1px solid darkgrey',
    borderRadius: '2px',
    marginLeft: '5px',
    marginRight: '5px',
    height: 'auto',
    overflow: 'auto',
    height: '600px',
    marginBottom: '10px'
}
const textsize = {
    fontSize: "25px"
}

const textsize2 = {
    fontSize: "25px"
}

const cardImageStyle = {
    paddingLeft: '2px',
    paddingRight: '2px',
    width: '200px',
    margin: '0 auto'
}

const cardTitleStyle = {
    fontSize: '25px',
};

const cardBodyStyle = {
    fontSize: '15px',
    margin: '0 auto'
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
        if (!this.props.grouplist) {
            this.props.history.push(`/signin`);
        };

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
            <p style={textsize}><strong>Welcome to Bookworm!</strong> </p>
            <p style={{ margin: '0 auto' }} style={textsize2} >You’ve taken your first step into being more engaged with reading! Why not create a group above? Once there be sure to add a book and invite some of your friends to join!</p>
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
                    <CardBody style={cardBodyStyle}>
                        <CardTitle style={cardTitleStyle}>
                            <strong>{groupName}</strong>
                        </CardTitle>
                        <br />
                        <CardSubtitle>
                            <strong>Next Chapter:  </strong>{currentBenchmark}
                        </CardSubtitle>
                    </CardBody>
                    <CardImg style={cardImageStyle} src={bookImage} alt={bookTitle} />
                    <CardBody style={cardBodyStyle}>
                        <CardText>
                            {author && <PostAuthor author={author} />}
                            <br />
                            {date && postDate.toLocaleString()}
                        </CardText>
                        <Link to={`/group/${groupID}`}>
                            <Button color='success'>Go to Club</Button>
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