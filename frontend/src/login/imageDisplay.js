import React from 'react';
import './imageDisplay.css';

class Login extends React.Component {

    render() {
        var images = [];
        var i;
        for (i = 1; i < 20; i++) {
            images.push(<img className="displayImg" src={process.env.PUBLIC_URL + '/images/img' + i + '.jpeg'} />) // https://forum.freecodecamp.org/t/importing-images-in-react/206974/8
        }

        return (
            <div id="imageDisplay">
                <div id="imagesContainer">
                    {images}
                </div>
                <p id="fade" ></p>
            </div>
        );
    }
}

export default Login;