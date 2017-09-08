import React, {Component} from 'react';
import './Table.css';
import TableResult from './TableResult';

export default class Table extends Component {
    constructor() {
        super();
        this.state = {
            accCurrency: "EUR",
            currPairValues: "EUR",
            fxRates: "",
            accSize: "",
            riskPers: "",
            slPips: "",
            amountAtRisk: "",
            units: "",
            lots: ""
        };

        this.getAccCurrency = this.getAccCurrency.bind(this);
        this.getCurrPairValue = this.getCurrPairValue.bind(this);
        this.getAccSize = this.getAccSize.bind(this);
        this.getRiskPers = this.getRiskPers.bind(this);
        this.getSlPips = this.getSlPips.bind(this);
        this.calculate = this.calculate.bind(this);
    }

    static defaultProps = {
        accCurrencies: ["EUR", "USD"],
        currPairsValue: ["EUR", "GBP", "JPY", "AUD"],
        currPairs: ["EURUSD", "USDGBP", "USDJPY", "USDAUD"]
    };

    componentDidMount() {
        fetch("https://openexchangerates.org/api/latest.json?app_id=765c6dc585e24300a2718e68dc2c8481", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    fxRates: data.rates
                })
            })
            .catch((err) => console.log(err));
    }

    getAccCurrency(evt) {
        this.setState({
            accCurrency: evt.target.value
        });
    }

    getCurrPairValue(evt) {
        this.setState({
            currPairValues: evt.target.value
        });
    }

    getAccSize(evt) {
        this.setState({
            accSize: evt.target.value
        });
    }

    getRiskPers(evt) {
        this.setState({
            riskPers: evt.target.value
        });
    }

    getSlPips(evt) {
        this.setState({
            slPips: evt.target.value
        });
    }

    calculate() {
        let amountAtRisk = this.state.accSize * (this.state.riskPers / 100);
        this.setState({
            amountAtRisk: amountAtRisk
        });

        if (this.state.accCurrency === "USD") {
            let units = (amountAtRisk / this.state.slPips) * (100000 / (100000 * 0.0001));
            this.setState({
                units: units,
                lots: (units/100000).toFixed(2)
            })
        } else if (this.state.accCurrency === "EUR") {
            let pipAmount = (100000 * 0.0001) * (this.state.fxRates.EUR);
            let units = (amountAtRisk / this.state.slPips) * (100000 / pipAmount);
            this.setState({
                units: units.toFixed(2),
                lots: (units/100000).toFixed(2)
            })
        }
    }

    render() {
        let accCurrencyOption = this.props.accCurrencies.map(currency => {
            return <option key={currency} value={currency}>{currency}</option>
        });

        let currPairsOption = this.props.currPairs.map((pair, i) => {
            return <option key={pair} value={this.props.currPairsValue[i]}>{pair}</option>
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
                        <td><input value={this.state.accSize} onChange={this.getAccSize}/></td>
                    </tr>
                    <tr>
                        <td>Risk Ratio, %</td>
                        <td><input value={this.state.riskPers} onChange={this.getRiskPers}/></td>
                    </tr>
                    <tr>
                        <td>Stop-Loss, pips</td>
                        <td><input value={this.state.slPips} onChange={this.getSlPips}/></td>
                    </tr>
                    <tr>
                        <td>Currency pair</td>
                        <td><select onChange={this.getCurrPairValue}>{currPairsOption}</select></td>
                    </tr>
                    <tr>
                        <td>Current FX price:</td>
                        <td>{(1 / this.state.fxRates[this.state.currPairValues]).toFixed(4)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button id="calcBtn" onClick={this.calculate}>Calculate</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <TableResult
                    getAccCurrency={this.state.accCurrency}
                    amountAtRiskToDispl={this.state.amountAtRisk}
                    unitsToDispl={this.state.units}
                    lotsToDispl={this.state.lots}
                />
            </div>
        );
    }
}

