import React, {Component} from 'react';
import './TableResult.css';

export default class TableResult extends Component {
    render() {
        return (
            <div className="container">
               <table>
                   <thead>
                       <tr>
                           <th colSpan={2}>Results</th>
                       </tr>
                   </thead>
                   <tbody>
                   <tr>
                       <td>Amount at Risk, EUR</td>
                       <td></td>
                   </tr>
                   <tr>
                       <td>Position Size (units)</td>
                       <td></td>
                   </tr>
                   <tr>
                       <td>Standard Lots</td>
                       <td></td>
                   </tr>
                   </tbody>
               </table>
            </div>
        );
    }
}
