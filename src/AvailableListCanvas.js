import React from "react";
import Item from "./Item";

export default class AvailableListCanvas extends React.Component {
    constructor(props) {
        super(props);

        this.handleRent = this.handleRent.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleRent(e) {

        //console.log(Date.now());
        let time = Date.now();
        fetch("http://localhost:8080/api/bikes/rent", {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({ id: e.target.dataset.id, rentDate: time, isToLowerPrice: true }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => {

            if (!res.ok) {
                alert("Ups! Bad server response!");
            }
            this.props.refreshABL();
            this.props.refreshRBL();
        })
    }

    handleDelete(e) {
        fetch("http://localhost:8080/api/bikes", {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify({ id: e.target.dataset.id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( res => {

            if (!res.ok) {
                alert("Ups! Bad server response!");
            }
            this.props.refreshABL();
            this.props.refreshRBL();
        })
    }

    render() {
        
        return (
            <div id="availableList">
                <h2>Available bicycles ({this.props.availableBikesList.length})</h2>
                {this.props.availableBikesList.map( bike => {
                   // console.log(bike._id);
                   return (
                   <div key={bike._id} id="availableItem">
                       <div class="card">
                            <div class="row">
                                <Item key={bike._id} bike={bike} />
                                <div class="col-md-4" id="manageButtons">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <button key={bike._id + 2} id="b1" class="btn btn-primary btn-block" data-id={bike._id} onClick={this.handleRent}>Rent</button>
                                        </div>
                                        <div class="col-md-6">
                                            <button key={bike._id + 3} id="b2" class="btn btn-danger btn-block" data-id={bike._id} onClick={this.handleDelete}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                } )}
            </div>
        )
    }
}