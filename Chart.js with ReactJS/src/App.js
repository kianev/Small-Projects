import React, {Component} from 'react';
import './App.css';
import Chart from './Components/Chart'

export default class App extends Component {
    constructor() {
        super();
    this.state = {
        chartData: {}
    }
    }

    componentWillMount(){
        this.getChartData();
    }

    getChartData(){
        //AJAX call
        this.setState({
            chartData: {
                labels: ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt"],
                datasets: [{
                    label: "Population 2015",
                    data: [1840573, 273838, 198181, 148420, 126851, 97827],
                    //backgroundColor: "orange"
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ],
                    borderWidth: 1,
                    borderColor: "#777",
                    hoverBorderWidth: 2,
                    hoverBorderColor: "#000"
                }]
            }
        })
    }

    render() {
        return (
            <div className="App">
                <Chart legendPosition="bottom" chartData={this.state.chartData} location="Austria"/>
            </div>
        );
    }
}

