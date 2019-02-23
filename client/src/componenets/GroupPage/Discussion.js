import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import { Link } from 'react-router-dom';
import * as Routes from '../../constants/routes';
import axios from 'axios';

const inputStyle = {
    width: '50%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

const initialState = {
    text: '',
    error: null
};

class AddPost extends Component {
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
        

        const {userID, groupID } = this.props

        const userPost = {text: this.state.text}

        const dbResponse = await axios.post('/api/newpost', { userID, groupID, userPost });
        console.log(dbResponse)
        this.props.history.push(`/group/${dbResponse.data._id}`)

    }

    render() {
        const { text, error } = this.state;

        const isInvalid = text === '';

        return (
            <div>
                <br />
                {/* If there's an error with sign in then display the error */}
                {error && <p>{error.message}</p>}
                <form className='form-horizontal' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='text'>Post:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='text'
                                name='text'
                                placeholder='Write your Post'
                                value={this.state.text}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                
                    <div className='form-group '>
                        <div className='col-7'></div>
                        <button
                            className='btn btn-primary col-1 col-mr-auto'
                            disabled={isInvalid}
                            type='submit'>Submit Post</button>
                    </div>
                </form>
            </div>
        );
    };
};

const AddPostLink = () => (
    <Link to={Routes.discussion}>
        <button className='btn btn-link'>Create Group</button>
    </Link>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddPost);

export { AddPostLink };