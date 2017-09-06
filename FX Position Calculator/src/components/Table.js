import React, {Component} from 'react';
import './Table.css';

export default class Table extends Component {
    static defaultProps = {
        accCurrencies: ["EUR", "USD", "GBP"],
        currPairs: ["EURUSD", "EURGBP", "USDGBP", "USDJPY", "USDAUD"]
    };

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
                            <td><select>{accCurrencyOption}</select></td>
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
                            <td>Show FX Rate</td>
                        </tr>
                        <tr>
                            <td colSpan={2}><button id="calcBtn">Calculate</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

