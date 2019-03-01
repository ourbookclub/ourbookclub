import React, { Component } from 'react';
import { withAuthorization } from './Session';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Button, Form, FormGroup, Label, Input, Card, CardImg, CardText, CardBody, CardTitle, } from "reactstrap";
import { Row, Col } from "reactstrap";

//Using Swal to display message when group is created
const Alert = withReactContent(Swal);

const inputStyle = {
    width: '50%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

const initialState = {
    groupName: '',
    groupDescription: '',
    error: null
};

const textsize = {
    fontSize:"25px"
}
const formlabelStyle = {
    fontSize: "25px"
  };
  
  const forminputsize = {
    fontSize: "20px"
  };


class CreateGroup extends Component {
    constructor(props) {
        super(props)
        this.state = { ...initialState };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();

        const currentUserID = this.props.userID;

        const { groupName, groupDescription } = this.state;

        const dbResponse = await axios.post('/api/creategroup', { currentUserID, groupName, groupDescription });

        Alert.fire({
            type: 'success',
            title: `${groupName} Created!`,
            text: "Taking you to the club page. Why don't you pick a book or add a user?"
        });

        this.props.history.push(`/group/${dbResponse.data._id}`);
    };

    render() {
        const { groupName, groupDescription, error } = this.state;

        const isInvalid = groupName === '' || groupDescription === '';

        return (
            <div>
                <br />
                {/* If there's an error with sign in then display the error */}
                {error && <p>{error.message}</p>}



                <Form style={formlabelStyle} onSubmit={this.handleSubmit}>
                <FormGroup>
                <Label style={labelStyle} htmlFor="groupName" for="text"> Group Name: </Label>

                <Input
                  style={forminputsize}
                  type="text"
                  name="groupName"
                
                  placeholder='Enter A Group Name'
                  value={this.state.groupName}
                  onChange={this.handleChange}
                />
                   </FormGroup>
                
                <FormGroup>
                <Label style={labelStyle} htmlFor="groupDescription" for="text">Enter A Group Description: </Label>
                 
                <Input
                  style={forminputsize}
                  type="text"
                  name='groupDescription'
                  placeholder='Description'
                  value={this.state.groupDescription}
                  onChange={this.handleChange}
                />
              </FormGroup>
                
                
                <Button
                color="secondary"
                size="lg"
               
                disabled={isInvalid}
                type="submit"
              >
                Create New Group
              </Button>
            </Form>
                </div>
                           
                   
        );
    };
};

const CreateGroupLink = () => (
    <Link to={Routes.createGroup}>
        <button style={textsize} className='btn btn-link'>Create Group</button>
    </Link>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CreateGroup);

export { CreateGroupLink };