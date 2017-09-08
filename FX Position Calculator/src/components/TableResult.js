import React, {Component} from 'react';

export default class TableResult extends Component {
    render() {
        return (
            <div>
               <table className="container2">
                   <thead>
                       <tr>
                           <th colSpan={2}>Results</th>
                       </tr>
                   </thead>
                   <tbody>
                   <tr>
                       <td>Amount at Risk, {this.props.getAccCurrency}</td>
                       <td>{this.props.riskPercentage}</td>
                   </tr>
                   <tr>
                       <td>Position Size (units)</td>
                       <td>{this.props.accountSize}</td>
                   </tr>
                   <tr>
                       <td>Standard Lots</td>
                       <td>{this.props.stopLossPips}</td>
                   </tr>
                   </tbody>
               </table>
            </div>
        );
    }
}
