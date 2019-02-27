import React, { Component } from 'react';
import Worm from './images/Divider.png'
import WormLong from './images/wormrow4.png'
import Background from './images/background.png'
import { withAuthorization } from '../Session';
import { Link } from 'react-router-dom';
import * as Routes from '../../constants/routes';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';


import { Card, Button, CardHeader, CardFooter, CardBody,
    CardTitle, CardText } from 'reactstrap';
// import { url } from 'inspector';

    const sectionStyle = {
        width: "100%",
        height: "55px",
        backgroundImage: `url(${Background})`,
        
      
        
     
      }


const labelStyle = {
    marginBottom: '0px',
    background: 'blue'
}
const text = {
    color: 'white'
}

const h1 = {
    color: 'white',
    fontSize: '50px',
}; 




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
                            
               
                            <div
                             
                             >
                           
     <img  src={WormLong}  alt="divider" height="75px" width="100%" position="relative"  />
    
     </div>
     <br></br>
   
   
                        </span>

                    ))
                    }
                    
                    </div>
                )
            }
        }

         

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ShowPosts);