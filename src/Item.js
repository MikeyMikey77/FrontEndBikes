import React from "react";

export default class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const bikeName = this.props.bike.name;
        const bikeType = this.props.bike.type;
        const bikePrice = this.props.bike.price;

        if (this.props.render) {
            return (
                <div key={this.props.bike._id} id="Item" class="row">
                    <div class="col-md-10">
                        {bikeName} / {bikeType} / ${bikePrice}
                    </div>
                    <div class="col-md-2">
                        {this.props.render()}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div class="col-md-8" key={this.props.bike._id} id="Item" >
                    {bikeName} / {bikeType} / ${bikePrice}
                </div>
            );
        }


    }
}