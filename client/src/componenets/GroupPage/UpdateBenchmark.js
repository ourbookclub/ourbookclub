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
    nextBenchmark: '',
    totalBenchmark: '',
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

    handleCurrentSubmit = async event => {
        event.preventDefault();

        const nextBenchmark = +this.state.nextBenchmark;
        const { groupID, isAdmin } = this.props;

        try {
            const dbResponse = await axios.put(`/api/updatebenchmark`, { nextBenchmark, groupID, isAdmin });

            if (dbResponse.status === 200) {
                this.props.updatePage('main');
            }
        } catch (error) {
            this.setState({ error: { message: `Moderator needed to update benchmark` } })
        }
    }

    handleTotalSubmit = async event => {
        event.preventDefault();

        const totalCount = +this.state.totalBenchmark;
        const { groupID, isAdmin } = this.props;

        try {
            const dbResponse = await axios.put(`/api/updatepagesetup`, { totalCount, groupID, isAdmin });

            if (dbResponse.status === 200) {
                this.props.updatePage('main');
            }
        } catch (error) {
            this.setState({ error: { message: `Moderator needed to update benchmark` } });
        }
    }

    render() {
        const { nextBenchmark, totalBenchmark, error } = this.state;

        const currentIsInvalid = nextBenchmark === '' || nextBenchmark < 0;
        const totalIsInvalid = totalBenchmark === '' || totalBenchmark < 0;

        return (
            <div>
                <br />
                {error && <p>{error.message}</p>}
                <form className='form-horizontal' onSubmit={this.handleCurrentSubmit}>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='nextBenchmark'>Next Goal for Group:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='number'
                                name='nextBenchmark'
                                placeholder='What is the next goal for the group?'
                                value={this.state.nextBenchmark}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className='form-group '>
                        <div className='col-7'></div>
                        <button
                            className='btn btn-primary col-1 col-mr-auto'
                            disabled={currentIsInvalid}
                            type='submit'>Set New Goal</button>
                    </div>
                </form>

                <br />

                <form className='form-horizontal' onSubmit={this.handleTotalSubmit}>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='totalBenchmark'>Update Total Benchmarks / Chapters:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='number'
                                name='totalBenchmark'
                                placeholder='What is the total benchmarks or chapters of this book?'
                                value={this.state.totalBenchmark}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>

                    <div className='form-group '>
                        <div className='col-7'></div>
                        <button
                            className='btn btn-primary col-1 col-mr-auto'
                            disabled={totalIsInvalid}
                            type='submit'>Update Total</button>
                    </div>
                </form>
            </div>
        );
    };
};


const condition = authUser => !!authUser;

export default withAuthorization(condition)(UpdateBenchmark);