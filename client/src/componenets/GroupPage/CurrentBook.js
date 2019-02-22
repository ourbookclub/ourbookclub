import React, { Component, Fragment } from 'react';
import axios from 'axios';


// class CurrentBook extends Component {
//     constructor(props) {
//         super(props);
//     };
//     render() {
//         return (
//             <Fragment>
//                 <p>ID: {this.params.currentBook}</p>
//                 <p>Current Benchmark: {this.params.currentBenchmark}</p>
//                 <p>Total Benchmark: {this.params.totalBenchmark}</p>
//             </Fragment>
//         )
//     }
// }

const CurrentBook = (params) => {
    return (
        <Fragment>
            <p>Book ID: {params.currentBook}</p>
            <p>Current Benchmark: {params.currentBenchmark}</p>
            <p>Total Benchmark: {params.totalBenchmark}</p>
        </Fragment>
    )
}

export default CurrentBook