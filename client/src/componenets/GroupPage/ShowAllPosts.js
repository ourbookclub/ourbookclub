import React, { Component } from 'react';
import Worm from './images/wormlong2.png'


import { withAuthorization } from '../Session';
import axios from 'axios';
import { Jumbotron, Button } from 'reactstrap';
// import Container from 'react-bootstrap/Container';
import AddPost from './AddPost';
import { Container, Row, Col } from 'reactstrap';


// import { url } from 'inspector';

    const divider = {
        height: '50px',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundImage: `url(${Worm})`,
        marginTop: '10px',
        marginBottom: '-5px',
        // borderBottom: '2px solid',
        // borderLeft: '2px solid',
        // borderRight: '2px solid',
        
        
      
        
     
      }

      const date = {
        textAlign: 'center',
          fontSize: '8px',
          marginBottom:'10px',
          marginTop:'-1px',
      }

      const buttonPosition = {
          marginTop: '10px',
      }




const commentContainer = {
    borderStyle: 'solid',
    borderWidth: '2px',
    // borderBottom: 'none',
    backgroundColor: '#e9ecef',
    marginTop: '10px',
    marginBottom: '20px',
    
  
}

const postTitle = {
    fontSize: '20px',
    textAlign: 'center',
}

const postStyle = {
    fontSize: '12px',
}





const inputStyle = {
    width: `50%`,
    height: `40px`
}

const initalState = {
    text: '',
    error: null,
    postArray: []
}

class ShowAllPosts extends Component {
    constructor(props) {
        super(props)
        this.state = { ...initalState }
    };

    //In both did update and did mount based on if the user goes to another page within the group or loads it
    componentDidMount() {
        this.getAllPosts()
    };

    componentDidUpdate(prevProps) {
        if (this.props.groupID !== prevProps.groupID) {
            this.getAllPosts()
        };
    };

    getAllPosts = async () => {
        const groupID = this.props.groupID;
        const dbResponse = await axios.get(`/api/getallgrouppost/${groupID}`);

        if (dbResponse.status === 200) {
            this.setState({ postArray: dbResponse.data });
        };
    };

    render() {
        const { postArray } = this.state;
        const { userID, groupID } = this.props;

        return (
            <div>
                <AddPost userID={this.props.userID} groupID={groupID} getAllPosts={this.getAllPosts} />
                <h1>Posts</h1>
                {postArray.map(post => <SinglePost key={post._id} post={post} userID={userID} getAllPosts={this.getAllPosts} />)}
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
        const { title, text, _id, comment } = this.props.post;
        const { userID } = this.props;
        const postDate = new Date(this.props.post.date);

        return (
            <span>
                <div style={commentContainer}>
                
                    
                        
                        <div style ={postTitle}>
                        <Row>
                        <Col xs="12">
                        
                        
                           <strong> {title} </strong>
                            
                            
                            </Col>
                        </Row>
                        </div>
                        
                        <p style={postStyle}>
                            <strong>{username} : </strong>
                            
                             {text}
                        </p>
                        <div style= {date}>
                        <Row>
                        <Col xs="12">
                        {postDate.toLocaleString()}
                        </Col>
                        </Row>
                        </div>
                        <hr></hr>
                        {comment.map(singleComment => <ShowComment key={singleComment._id} comment={singleComment} />)}
                 
                    <AddComment postID={_id} userID={userID} getAllPosts={this.props.getAllPosts} />
                    
              
                
                   
                <div style={divider}>

                </div>
                </div>
                
                
            </span>
        )
    };
};

class ShowComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
    };

    componentDidMount = () => {
        //Taking this out the of lifecycle method to make it an async function
        this.getUsername();
    };

    getUsername = async () => {
        const dbResponse = await axios.get(`/api/getuserbyid/${this.props.comment.user}`);
        if (dbResponse.status === 200) {
            this.setState({ username: dbResponse.data.local.username })
        } else {
            this.setState({ error: dbResponse.data })
        };
    };

    render() {
        const { username } = this.state;
        const { text } = this.props.comment;
        const commentDate = new Date(this.props.comment.date)

        return (
            <Container>
               
             


               <p style={postStyle}>
                    <strong>{username} : </strong> 
                    {text}
                </p>
                <div style= {date}>
                        <Row>
                        <Col xs="12">
                 {commentDate.toLocaleString()}
                 </Col>
                        </Row>
                        </div>
                        <hr></hr>
            </Container>
        )
    }
};

class AddComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: ''
        }
    };

    handleSubmit = async () => {
        const comment = this.state.comment;
        const userID = this.props.userID;
        const postID = this.props.postID;

        const dbResponse = await axios.post(`/api/newcomment`, { userID, postID, comment });
        if (dbResponse.status === 200) {
            this.props.getAllPosts();
            this.setState({ 'comment': '' })
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { comment } = this.state;

        const isInvalid = comment === '';

        return (

            <div>
                <Row>
                <Col sm={{ size: '5', offset: 2 }}>
                
                <input className='form-input'
                    style={inputStyle}
                    type='text'
                    name='comment'
                    placeholder='Add A Comment'
                    value={comment}
                    onChange={this.handleChange}></input>
                    </Col>
                    <Col sm={{ size: '2', offset: -3 }}>
                <Button style={buttonPosition} color="primary"
                    disabled={isInvalid}
                    onClick={this.handleSubmit}>Add Comment</Button>
                    </Col>
                    </Row>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ShowAllPosts);