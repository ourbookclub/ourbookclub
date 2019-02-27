import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import axios from 'axios';

const inputStyle = {
    width: `50%`,
    height: `40px`
}
const labelStyle = {
    marginBottom: `0px`
}

const initialState = {
    title: '',
    text: '',
    error: null
};

class AddPost extends Component {
    constructor(props) {
        super(props)
        this.state = { ...initialState };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { userID, groupID } = this.props

        const userPost = {
            title: this.state.title,
            text: this.state.text
        }

        const dbResponse = await axios.post(`/api/newpost`, { userID, groupID, userPost });

        if (dbResponse.status === 200) {
            this.props.getAllPosts();
            this.setState({ ...initialState })
        };
        //TODO SHOW MODAL FOR POST ADDED
    }

    render() {
        const { text, title, error } = this.state;

        const isInvalid = text === '' || title === '';

        return (
            <div>
                <br />
                {/* If there's an error with sign in then display the error */}
                {error && <p>{error.message}</p>}
                <form className='form-horizontal' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='title'>Title:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='text'
                                name='title'
                                placeholder="Your Post's Title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='text'>Post Body:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='input'
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


const condition = authUser => !!authUser;

export default withAuthorization(condition)(AddPost);
