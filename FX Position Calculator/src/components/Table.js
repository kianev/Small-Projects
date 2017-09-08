import React, {Component} from 'react';
import './Table.css';
import TableResult from './TableResult';

export default class Table extends Component {
    constructor(){
        super();
        this.state = {
            accCurrency: "EUR",
            fxRates: ""
        };

        this.getAccCurrency = this.getAccCurrency.bind(this);
        this.getRates = this.getRates.bind(this);
    }

    static defaultProps = {
        accCurrencies: ["EUR", "USD"],
        currPairs: ["EURUSD", "USDGBP", "USDJPY", "USDAUD"]
    };

    getRates() {
        fetch("https://openexchangerates.org/api/latest.json?app_id=765c6dc585e24300a2718e68dc2c8481", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
            console.log(data.rates);
               this.setState({
                   fxRates: data.rates
               })
            })
            .catch((err) => console.log(err));
    }


    getAccCurrency(e){
        this.setState({
            accCurrency: e.target.value
        });
    }

    render() {
        let accCurrencyOption = this.props.accCurrencies.map(currency => {
            return <option key={currency} value={currency}>{currency}</option>
        });

        let currPairsOption = this.props.currPairs.map(pair => {
            return <option key={pair} value={pair}>{pair}</option>
        });

        return (
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>Values</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Account currency</td>
                            <td><select onChange={this.getAccCurrency}>{accCurrencyOption}</select></td>
                        </tr>
                        <tr>
                            <td>Account Size</td>
                            <td><input type="text"/></td>
                        </tr>
                        <tr>
                            <td>Risk Ratio, %</td>
                            <td><input type="text"/></td>
                        </tr>
                        <tr>
                            <td>Stop-Loss, pips</td>
                            <td><input type="text"/></td>
                        </tr>
                        <tr>
                            <td>Currency pair</td>
                            <td><select>{currPairsOption}</select></td>
                        </tr>
                        <tr>
                            <td>Current price :</td>
                            <td>{this.state.fxRates.USD}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button id="calcBtn" onClick={this.getRates}>Calculate</button></td>
                        </tr>
                    </tbody>
                </table>
                <TableResult getAccCurrency={this.state.accCurrency}/>
            </div>
        );
    }
}

