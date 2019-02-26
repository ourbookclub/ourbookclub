import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'


const labelStyle = {
    marginBottom: '0px'
}

const inputStyle = {
    width: `50%`,
    height: `40px`
}

class ShowPosts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            error: null,
            postArray: []
        }
    };

    //In both did update and did mount based on if the user goes to another page within the group or loads it
    componentDidMount() {
        this.getAllPosts(this.props.groupID)
    };

    componentDidUpdate(prevProps) {
        if (this.props.groupID !== prevProps.groupID) {
            this.getAllPosts(this.props.groupID)
        };
    };

    getAllPosts = async (groupID) => {
        const dbResponse = await axios.get(`/api/getallgrouppost/${groupID}`);

        if (dbResponse.status === 200) {
            this.setState({ postArray: dbResponse.data });
        };
    };

    render() {
        const { postArray } = this.state;
        return (
            <div>
                <h1>Posts</h1>
                {postArray.map((post, i) => <SinglePost key={i} post={post} />)}

            </div>
        );
    };
};


class SinglePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            error: null,
            comment: '',
        }
    };

    componentDidMount = () => {
        //Taking this out the of lifecycle method to make it an async function
        this.getUsername();
    };

    getUsername = async () => {
        const dbResponse = await axios.get(`/api/getuserbyid/${this.props.post.user}`);
        if (dbResponse.status === 200) {
            this.setState({ username: dbResponse.data.local.username })
        } else {
            this.setState({ error: dbResponse.data })
        };
    };

    render() {
        const { username } = this.state;
        const { date, title, text, _id } = this.props.post;

        return (
            <span>
                <Jumbotron fluid>
                    <Container>
                        <strong>User:</strong> {username}
                        <br />
                        <strong>Date: </strong> {date}
                        <p>
                            <strong>Title:</strong> {title}
                        </p>
                        <p>
                            <strong>Post:</strong> {text}
                        </p>
                    </Container>
                    <AddComment postID={_id} />
                </Jumbotron>
            </span>
        )
    };
};

class AddComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: ''
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { comment } = this.state;

        const isInvalid = comment === '';

        return (

            <div>
                <label style={labelStyle}>Add a comment:</label>
                <input className='form-input'
                    style={inputStyle}
                    type='text'
                    name='comment'
                    placeholder='Add Comment'
                    value={comment}
                    onChange={this.handleChange}></input>
                <button className='btn btn-primary'
                    disabled={isInvalid}
                    onClick={this.handleClick}>Add Comment</button>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ShowPosts);