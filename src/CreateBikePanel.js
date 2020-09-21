import React from "react";

export default class CreateBikePanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { bikeName: '', option: 'Спортивный', bikePrice: '' };
        this.handleChangeBikeName = this.handleChangeBikeName.bind(this);
        this.handleChangeBikePrice = this.handleChangeBikePrice.bind(this);
        this.selectValue = this.selectValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeBikeName(e) {
        this.setState({ bikeName: e.target.value });
    }

    selectValue(e) {
        this.setState({ option: e.target.value });
    }

    handleChangeBikePrice(e) {
        this.setState({ bikePrice: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();

        if (isNaN(this.state.bikePrice) || this.state.bikeName === '' || this.state.bikePrice === '' || typeof +this.state.bikePrice !== 'number') {
            alert("Поля ввода не должны бать пустыми! в графе price должно быть число. Пример: 100.25");
            return;
        }
        else {
            const price = +(this.state.bikePrice.replace(",", "."));

            fetch("http://localhost:8080/api/bikes", {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({ name: this.state.bikeName, type: this.state.option, price: price }),
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
    }

    render() {
        return (
            <div id="addBikePanel">
                <h2>Create new rent</h2>
                <form class="bike-form" onSubmit={this.handleSubmit}>
                    <div class="card">
                        <div class="row">
                            <div class="col-md-4">
                                <label for="super-bike">Bike name</label>
                                <div class="input-group">
                                    <input id="super-bike" class="form-control" type="text" value={this.state.bikeName} onChange={this.handleChangeBikeName} />
                                </div>
                            </div>

                            <div class="col-md-4">
                                <label for="type">Bike type</label>
                                <div class="input-group">
                                    <select id="type" class="form-control" value={this.state.option} onChange={this.selectValue}>
                                        <option value="Кроссовый">Кросовый</option>
                                        <option value="Крузер">Крузер</option>
                                        <option value="Чоппер">Чоппер</option>
                                        <option value="Классический">Классический</option>
                                        <option value="Спортивный">Спортивный</option>
                                    </select>
                                </div>
                            </div>

                            <div class="col-md-2">
                                <label for="price">Rent Price</label>
                                <div class="input-group">
                                    <input type="text" class="form-control" value={this.state.bikePrice} onChange={this.handleChangeBikePrice} />
                                </div>
                            </div>

                            <div class="col-md-2">
                                <label>⠀</label>
                                <div class="input-group">
                                    <input type="submit" class="btn btn-success btn-block" value="Submit rent" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}