import React, { Component } from 'react';
import axios from 'axios';

const inputStyle = {
    width: '50%',
    height: '40px'
}
const labelStyle = {
    marginBottom: '0px'
}

class AddBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookSearch: '',
            error: null
        }
    };

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
        console.log(dbResponse)
        if (dbResponse === 200) {
            //returns an array of 1 - 20 books and maps over them
            console.log(dbResponse.data)
        } else {
            this.setState({ error: dbResponse.data.error })
        }
        //TODO Send this to another component to then map over the 
    }

    render() {
        const { bookSearch } = this.state;
        const isInvalid = bookSearch === '';

        return (
            <div className='bookSearch'>
                <p>Enter Book to Search: {this.props.groupID}</p>

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
                            >Sign Up</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddBook;


// export default class BookSearch extends React.Component {
//     render() {
//         return (
//             <div>
//                 {
//                     <h1>testing booksearch</h1>
                    // this.props.items.map((item , i) => {
                    //     let {title, imageLinks , infoLink, authors, pageCount, preview, description} = item.volumeInfo
                    //     return (
                    //         <a href ={infoLink}
                    //         target = "_blank"
                    //         key={i} className = "book">
                    //         <img 
                    //         src ={imageLinks !== undefined? imageLinks.thumbnail : ''} 
                    //         alt = "book image"
                    //         className = "bookImage"
                    //         />
                    //         <div className = "titleText">{title }</div>
                    //         <div className = "titleText">{authors }</div>
                    //         <div className = "titleText">{pageCount }</div>
                    //         <div className = "Text">{preview }</div>
                    //         <div className = "Text">{description }</div>

                    //         </a>

                    //     );
                    // })
//                 }</div>

//         );
//     }
// }