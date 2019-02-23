import React, { Component } from 'react';
import { withAuthorization } from '../Session';
import axios from 'axios';

const inputStyle = {
    width: '50%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

const initialState = {
    currentBenchmark: null,
    totalBenchmark: null,
    error: null
};

class UpdateBenchmark extends Component {
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
        console.log(`working`);
    }

    render() {
        const { text, error } = this.state;

        const isInvalid = text === '';

        return (
            <div>
                <br />
                {error && <p>{error.message}</p>}
                <form className='form-horizontal' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='currentBenchmark'>Next Goal for Group:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='number'
                                name='currentBenchmark'
                                placeholder='What is the next goal for the group?'
                                value={this.state.currentBenchmark}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='totalBenchmark'>Total Chapters:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='totalBenchmark'
                                name='number'
                                placeholder='How Many Chapters for Your Book?'
                                value={this.state.totalBenchmark}
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

export default withAuthorization(condition)(UpdateBenchmark);