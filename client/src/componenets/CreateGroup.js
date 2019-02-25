import React, { Component } from 'react';
import { withAuthorization } from './Session';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/routes';
import axios from 'axios';

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

        const { groupName, groupDescription } = this.state

        const dbResponse = await axios.post('/api/creategroup', { currentUserID, groupName, groupDescription });
        this.props.history.push(`/group/${dbResponse.data._id}`)

    }

    render() {
        const { groupName, groupDescription, error } = this.state;

        const isInvalid = groupName === '' || groupDescription === '';

        return (
            <div>
                <br />
                {/* If there's an error with sign in then display the error */}
                {error && <p>{error.message}</p>}
                <form className='form-horizontal' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='groupName'>Group Name:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='text'
                                name='groupName'
                                placeholder='Group Name'
                                value={this.state.groupName}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='groupDescription'>Group Descripton: </label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                placeholder='Description'
                                name='groupDescription'
                                value={this.state.groupDescription}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className='form-group '>
                        <div className='col-7'></div>
                        <button
                            className='btn btn-primary col-1 col-mr-auto'
                            disabled={isInvalid}
                            type='submit'>Create New Group</button>
                    </div>
                </form>
            </div>
        );
    };
};

const CreateGroupLink = () => (
    <Link to={Routes.createGroup}>
        <button className='btn btn-link'>Create Group</button>
    </Link>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CreateGroup);

export { CreateGroupLink };