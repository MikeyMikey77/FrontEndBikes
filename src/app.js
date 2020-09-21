import React from "react";
import ReactDOM from "react-dom"
import CreateBikePanel from "./CreateBikePanel.js"
import RentedListCanvas from "./RentedListCanvas"
import AvailableListCanvas from "./AvailableListCanvas.js"

class MainCanvas extends React.Component {

    constructor(props) {
        super(props);

        this.urlAvailable = "http://localhost:8080/api/bikes/available";
        this.urlRented = "http://localhost:8080/api/bikes/rented";
        this.state = {
            availableBikes: [{ name: 'Loading...', type: 'Loading...', price: '0.0', _id: '1' }],
            rentedBikes: [{ name: 'Loading...', type: 'Loading...', price: '0.0', _id: '0' }]
        };

        this.refreshAvailableBikesList = this.refreshAvailableBikesList.bind(this);
        this.refreshRentedBikesList = this.refreshRentedBikesList.bind(this);
        this.fetchData = this.fetchData.bind(this);

        this.refreshRentedBikesList();
        this.refreshAvailableBikesList();
    }

    fetchData(url) {
        return fetch(url);
    }

    refreshAvailableBikesList(e) {

        this.fetchData(this.urlAvailable, {
            mode: 'same-origin'
        })
            .then(res => res.json())
            .then(res => this.setState({ availableBikes: res }));
    }

    refreshRentedBikesList(e) {

        //console.log("FETCHING DATA!")
        this.fetchData(this.urlRented)
            .then(res => res.json())
            .then(res => {
                // console.log("SERVER ANSWER " + res);
                this.setState({ rentedBikes: res })
                // console.log(this.state.rentedBikes)
                console.log(res);
            });
    }

    render() {
        return (
            <div class="container-fluid">
                <h1>Awesome Bike Rental</h1>
                <CreateBikePanel refreshABL={this.refreshAvailableBikesList}
                    refreshRBL={this.refreshRentedBikesList} />
                <RentedListCanvas rentedBikesList={this.state.rentedBikes}
                    refreshABL={this.refreshAvailableBikesList}
                    refreshRBL={this.refreshRentedBikesList} />
                <AvailableListCanvas availableBikesList={this.state.availableBikes}
                    refreshABL={this.refreshAvailableBikesList}
                    refreshRBL={this.refreshRentedBikesList} />
            </div>
        );
    }
}

ReactDOM.render(<MainCanvas />,
    document.getElementById("mainCanvas"))