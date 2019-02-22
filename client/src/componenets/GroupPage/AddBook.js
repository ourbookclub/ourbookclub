import React, { Component } from 'react';
import axios from 'axios';

const inputStyle = {
    width: '50%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

class AddBookPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookSearch: '',
            error: null,
            bookArray: []
        }
    };

    addBookToGroup = event => {
        console.log(`working`)
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { bookSearch } = this.state;

        //This changes the book the user enters into a searchable term by the browser
        const searchableBook = bookSearch.trim().split(' ').join('+');
        console.log(searchableBook);
        const dbResponse = await axios.get(`/api/searchbook/${searchableBook}`);

        if (dbResponse.status === 200) {
            //returns an array of 1 - 20 books and maps over them
            console.log(dbResponse)
            this.setState({ bookArray: dbResponse.data });
            console.log(this.state)
        } else {
            this.setState({ error: dbResponse.data.error })
        }
        //TODO Send this to another component to then map over the 
    }

    render() {
        const { bookSearch, error, bookArray } = this.state;
        const isInvalid = bookSearch === '';

        return (

            <div className='bookSearch'>
                {error && <p>{error}</p>}
                <form className='form-horizontal' onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <div className='col-1 col-ml-auto'>
                            <label className='form-label' style={labelStyle} htmlFor='bookSearch'>Book to Search:</label>
                        </div>
                        <div className='col-3 col-mr-auto'>
                            <input className='form-input'
                                style={inputStyle}
                                type='text'
                                name='bookSearch'
                                placeholder='bookSearch'
                                value={this.state.bookSearch}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                disabled={isInvalid}
                                className="btn btn-primary col-1 col-mr-auto"
                                type="submit"
                            >Search Book</button>
                        </div>
                    </div>
                </form>
                {bookArray && bookArray.map((book, i) => <SingleBook book={book} key={i} addBookToGroup={this.addBookToGroup} isAdmin={this.state.isAdmin} />)}
            </div>
        )
    }
}

export default AddBookPage;

//TODO Make something here to show all authors
const SingleBook = (props) => {
    // Taking out the book object to make displaying it easier
    const { title, authors, description, image, pageCount, publishedDate } = props.book

    return (
        <div className="bookCard">
            <div>{title}</div>
            <div>{authors[0]}</div>
            <div>{description}</div>
            <img src={image} alt={`${title} Image`} />
            <div>{pageCount}</div>
            <div>{publishedDate}</div>
            <button className="btn btn-primary col-1 col-mr-auto" onClick={props.addBookToGroup}>Add Book To Group</button>
        </div>
    )
}
