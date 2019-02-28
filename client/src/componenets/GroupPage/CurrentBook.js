import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
    title: '',
    image: '',
    authors: [],
    error: null
}



const imagesize = {
    width: "auto",
    height: "30%",
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
                <div ><strong>Current Book </strong>
                    <br></br>
                {this.state.title}
                <br></br>
                <img width="auto" height="75%" src={this.state.image} alt={`${this.state.title}`} />
                </div>
               
                <br></br>
                <div ><strong> Current Progress </strong>
                <br></br>
                   {this.props.currentBenchmark} / {this.props.totalBenchmark} </div>
                
                    
                          
               
                <br />
            </div>

        );
    };
};

export default CurrentBook;