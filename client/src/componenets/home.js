import React, { Component } from 'react'

class Home extends Component {

    render() {
        const imageStyle = {
            width: 400
        }
        return (
            <div>
                <p>It's good to be home</p>
                <img style={imageStyle} alt='Earthworm Jim and his book' src="../img/1550080499329.png" />
            </div>
        )

    }
}

export default Home