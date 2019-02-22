import React, { Component } from 'react';
import axios from 'axios';


class AddBook extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div className='bookSearch'>
                <p>Book Search {this.props.groupID}</p>
            </div>
        )
    }
}

export default AddBook;