import React, { Component } from 'react';
import axios from 'axios';

const inputStyle = {
    width: '50%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

class UserSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userSearch: '',
            error: null,
            userArray: [],
            searchSelect: ''
        }
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = async event => {
        event.preventDefault();

        const { userSearch, searchSelect } = this.state;

        const dbResponse = await axios.get(`/api/usersearch/${userSearch}/${searchSelect}`);

        this.setState({ userArray: dbResponse.data });
    }

    render() {
        const { userSearch, error, userArray, searchSelect } = this.state;
        const isInvalid = userSearch === '' || searchSelect === '';

        return (

            <div className='userSearch'>
                {error && <p>{error}</p>}
                <form className='form-horizontal' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle}>Search By:</label>
                        </div>
                        <select name='searchSelect' value={this.state.searchSelect} onChange={this.handleChange}>
                            <option value=''> </option>
                            <option value='email'>Email</option>
                            <option value='username'>Username</option>
                        </select>
                    </div>

                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='userSearch'>Search Users:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='text'
                                name='userSearch'
                                placeholder='Search User'
                                value={this.state.userSearch}
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className='form-group'>
                            <div className='col-7'></div>
                            <button
                                disabled={isInvalid}
                                className='btn btn-primary col-1 col-mr-auto'
                                type='submit'
                            >Search User</button>
                        </div>
                    </div>
                </form>
                {userArray && userArray.map((user, i) => <SingleUser user={user} key={i} isAdmin={this.props.isAdmin} groupID={this.props.groupID} updatePage={this.props.updatePage} />)}
            </div>
        )
    }
}

//This component is going to have state to wrap the book in the submit and send it to the database
class SingleUser extends Component {
    constructor(props) {
        super(props);

    };

    addUserToGroup = async (event) => {
        const { isAdmin, groupID } = this.props;
        const { userID } = this.props.user;

        const dbResponse = await axios.put(`/api/addusertogroup`, { isAdmin, groupID, userID });

        if (dbResponse.status === 200) {
            this.props.updatePage(`main`);
        };
    };

    // Taking out the book object to make displaying it easier
    render() {
        const { isAdmin } = this.props;
        const { email, username } = this.props.user;

        return (
            <div className='userCard'>
                <div>Email: {email}</div>
                <div>Username: {username}</div>

                {isAdmin && <button className='btn btn-primary col-1 col-mr-auto' onClick={this.addUserToGroup}>Add User To Group</button>}
            </div>
        )
    }
}

export default UserSearch;