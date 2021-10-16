import React from 'react';
import YelpCard from './yelpCard';
import './yelpDisplay.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class YelpDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [],
            sorted: false,
            zipcodeValue: "",
            sortedValue: false
        }

    }

    searchYelp() {
        if (this.state.zipcodeValue === "") {
            toast("Please enter a zipcode", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
        } else {
            // console.log(this.state.zipcodeValue);
            fetch('http://localhost:3001/yelp/' + this.state.zipcodeValue)
                .then(res => res.json())
                .then(data => {
                    if (data.success === false) {
                        toast("No data found for this location - please make sure you have a valid zip code", { autoClose: 10000, pauseOnHover: true, progressClassName: "toastProgressBar", position: "bottom-center" });
                    } else {
                        // console.log(data.info);
                        this.setState(
                            (prevState) => { return { stores: data.info, sorted: this.state.sortedValue } }
                        )
                    }

                });
        }
    }

    handleZipcodeChange(event) {
        this.setState((prevState, props) => {
            return { zipcodeValue: event.target.value };
        });
    }

    handleSortedChange(event) {
        const prevValue = this.state.sorted;
        console.log(!prevValue);
        this.setState((prevState, props) => {
            return { sortedValue: !prevValue };
        });
    }

    getYelpCards() {
        var stores = this.state.stores;
        if (this.state.sorted) {
            stores = this.state.stores.sort((e1, e2) => e2.rating - e1.rating);
        }
        // console.log(stores);
        return stores.map(store => { return <YelpCard store={store} /> });
    }

    render() {
        return (
            <div id="yelp-container">
                <div id="yelp-header">
                    <h3>Starting a new project? Enter your zip code to find arts and crafts stores near you:</h3>
                    <form>
                        <input type="text" id="zipcode" value={this.state.zipcodeValue} placeholder="zipcode" onChange={(e) => this.handleZipcodeChange(e)} />
                        <input type="checkbox" onChange={(e) => this.handleSortedChange(e)} />Sort by rating<br />
                        {/* could also add an option to sort by distance */}
                        <input type="button" onClick={() => this.searchYelp()} value="Search" />
                    </form>
                </div>
                <div id="yelp-stores">{this.getYelpCards()}</div>
            </div>
        );
    }
}

export default YelpDisplay;