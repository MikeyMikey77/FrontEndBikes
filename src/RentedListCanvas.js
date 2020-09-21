import React from "react";
import Item from "./Item.js";

export default class RentedListCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        //console.log(e.target.dataset.id);
        fetch("http://localhost:8080/api/bikes/cancelRent", {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({ id: e.target.dataset.id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {

                if (!res.ok) {
                    alert("Ups! Bad server response!");
                }
                this.props.refreshABL();
                this.props.refreshRBL();
            })
    }

    render() {
        const arr = this.props.rentedBikesList;
        const price = arr.reduce((accum, bike) => accum + +bike.price, 0);
        return (
            <div id="rentedList">
                <h2>Your rent (Total:${price})</h2>
                {this.props.rentedBikesList.map(bike => {

                    return <div key={bike._id + 3} id="rentedItem">
                        <div class="card">
                            <Item key={bike._id} bike={bike} render={() => (
                                <button key={bike._id + 1} id="b0" class="btn btn-danger btn-block" data-id={bike._id} onClick={this.handleClick}>Cancel rent</button>
                            )} />
                        </div>
                    </div>;
                })}
            </div>
        );
    }
}