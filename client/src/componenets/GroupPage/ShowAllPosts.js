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

    //In both did update and did mount based on if the user goes to another page within the group or loads it
    componentDidMount() {
        this.getAllPosts(this.props.groupID)
    }

    componentDidUpdate(PrevProps) {
        if (this.props.groupID !== PrevProps.groupID) {
            this.getAllPosts(this.props.groupID)
        }
    }

    getAllPosts = async (groupID) => {

        const dbResponse = await axios.get(`/api/getallgrouppost/${groupID}`);

        if (dbResponse.status === 200) {
            //returns an array of 1 - 20 books and maps over them
            this.setState({ postArray: dbResponse.data });
        } else {
            this.setState({ error: dbResponse.data.error })
        }
    }




    render() {
        const { postArray } = this.state;
        return (
            <div>
                <h1>Posts</h1>
                {
                    postArray.map((Response, i) => (
                        <span key={i}>
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
                        </span>

                    ))
                }

            </div>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ShowPosts);