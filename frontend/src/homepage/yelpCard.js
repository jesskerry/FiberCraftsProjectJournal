import React from 'react';
import './yelpCard.css';

class YelpCard extends React.Component {
    render() {
        var distance = this.props.store.distance * 0.000621371;
        var distRounded = distance.toFixed(2);
        return (
            <div id="yelpCard">
                <h3>{this.props.store.name}</h3>
                <div id="img-info-container">
                    <img id="yelpImg" src={this.props.store.image_url} />
                    <div id="info-text">
                        <p>Distance: {distRounded} miles</p>
                        <p>Rating: {this.props.store.rating}</p>
                        <a href={this.props.store.url}>View on yelp</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default YelpCard;