import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
    title: '',
    image: '',
    authors: [],
    error: null
}

class CurrentBook extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState }
    };

    componentDidMount() {
        const bookID = this.props.currentBook;
        if (bookID) {
            this.getCurrentBook(bookID);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentBook !== prevProps.currentBook) {
            const bookID = this.props.currentBook;
            this.getCurrentBook(bookID)
        }
    }

    getCurrentBook = async (bookID) => {
        const dbResponse = await axios.get(`/api/getbookdata/${bookID}`);
        if (dbResponse.status === 200) {
            this.setState({
                title: dbResponse.data.title,
                image: dbResponse.data.image,
                authors: dbResponse.data.authors
            })
        } else {
            this.setState({
                error: dbResponse.data.error
            });
        };
    }

    render() {
        return (
            <div className='currentBook'>
                <div>Title: {this.state.title}</div>
                <img src={this.state.image} alt={`${this.state.title}`} />
                <div>Current Benchmark: {this.props.currentBenchmark}</div>
                <div>Total Benchmark: {this.props.totalBenchmark}</div>
                <br />
            </div>

        );
    };
};

export default CurrentBook;