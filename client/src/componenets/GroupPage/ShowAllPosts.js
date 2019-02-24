import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { Link } from 'react-router-dom';
import * as Routes from '../../constants/routes';
import axios from 'axios';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'


const labelStyle = {
    marginBottom: '0px'
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

    componentDidUpdate (PrevProps) {
        if (this.props.groupID !== PrevProps.groupID) {
            this.getAllPosts(this.props.groupID)
            
        }
        
       
        }

        getAllPosts = async (groupID) => {
            
    
            const dbResponse = await axios.get(`/api/getallgrouppost/${groupID}`);
            
            if (dbResponse.status === 200) {
                //returns an array of 1 - 20 books and maps over them
                console.log(dbResponse)
                this.setState({ postArray: dbResponse.data });
                console.log(this.state)
            } else {
                this.setState({ error: dbResponse.data.error })
            }


        //    .then(res => res.json())
        //    .then(res =>this.setState({ postArray: res}));
            
            
            }    

    


            render() {
                const { postArray } = this.state;
                return (
                    <div>
                        <h1>Posts</h1>
                    {
                    postArray.map(Response => (
                        <span>
                            <Jumbotron fluid>
  <Container>
    <strong>User:</strong> {Response.user}
    <br /> 
    <strong>Date: </strong> {Response.date}
    <p>
    <strong>Post:</strong> {Response.text}
    </p>
  </Container>
</Jumbotron>;
                            {/* how to convert user to user name? */}
                            {/* <strong>User:</strong> {Response.user}
                            <strong>Post:</strong> {Response.text}
                            <strong>Date: </strong> {Response.date} */}
                        

                        </span>

                    ))
                    }
                    
                    </div>
                );
            }
        }

const AddPostLink = () => (
    <Link to={Routes.discussion}>
        <button className='btn btn-link'>Create Post</button>
    </Link>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ShowPosts);

export { AddPostLink };