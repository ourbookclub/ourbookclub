import React, { Component } from 'react';
import axios from 'axios';

const initialState = {
    title: '',
    image: '',
    authors: [],
    error: null
};

const progressBarStyle = {
    position: 'relative',
    height: '20px',
    width: '350px',
    borderRadius: '50px',
    border: '1px solid #333'
};

const fillerStyle = {
    background: '#1DA598',
    height: '100%',
    borderRadius: 'inherit',
    transition: 'width .2s ease-in'
};

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
        const percentageComplete = (this.props.currentBenchmark / this.props.totalBenchmark) * 100;
        const { currentBenchmark, totalBenchmark } = this.props;
        const { title, image } = this.state;

        return (
            <div className='currentBook'>
                <div>Title: {title}</div>
                <img src={image} alt={`${title}`} />
                <div>Current Chapters: {currentBenchmark}</div>
                <div>Total Chapters: {totalBenchmark}</div>
                <div>
                    <ProgressBar percentage={percentageComplete} />
                </div>
                <br />
            </div>

        );
    };
};

const ProgressBar = (props) => {
    return (
        <div className='progressBar'
            style={progressBarStyle}>
            <BarFiller percentage={props.percentage} />
        </div>
    );
};

const BarFiller = (props) => {
    return (
        <div className='filler'
            style={{
                background: '#1DA598',
                height: '100%',
                borderRadius: 'inherit',
                transition: 'width .2s ease-in',
                width: `${props.percentage}%`
            }} />
    );
};

export default CurrentBook;