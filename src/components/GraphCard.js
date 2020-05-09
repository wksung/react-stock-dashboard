import React from 'react';
import Chart from 'chart.js';
import '../css/GraphCard.css';

class GraphCard extends React.Component{

  chartRef = React.createRef();
    
  componentDidUpdate() {
    
    // @condition: check if there is a viable response from the API call
    if(this.props.showGraphData){
      
      var lowOrHighColor = 
          this.props.graphData.y_axis[0] <
          this.props.graphData.y_axis[this.props.graphData.y_axis.length - 1] 
          ? '#81b737' : '#d54f4f';

      // loops through all the graphData array and makes a graph individually
      const myChartRef = this.chartRef.current.getContext("2d");
      new Chart(myChartRef, {
          type: "line",
          data: {
              labels: this.props.graphData.x_axis,
              datasets: [
                  {
                      data: this.props.graphData.y_axis,
                      backgroundColor: "rgba(0, 0, 0, 0)",
                      borderColor: lowOrHighColor
                  }
              ]
          },
          options: {
            responsive: true,
            tooltips: {
              enabled: true,
            },
            tooltips: {
                mode: 'point'
            },
            scales: {
                xAxes: [{
                    ticks: {
                      display: false
                    },
                    gridLines: {
                      display: true
                    },
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)"
                    }
                }],
                yAxes: [{
                    ticks: {
                      display: true,
                      stepSize: 5
                    },  
                    gridLines: {
                      display: false,
                    },
                    gridLines: {
                      color: "rgba(0, 0, 0, 0)"
                    }
                }]
            },
            legend: {
                display: false
            },
            elements: {
              point:{
                  radius: 0
              }
            }
          }
      });
    }
  };

  convertToDate = (str) => {
    let date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  };

  render() {
      return (
          <div className="main__chart" id={ 'myChart-' + this.props.graphData.stockValue }>
            <div>
                <h2 className="h5 mb-3 stockValue">
                  { this.props.graphData.stockValue }
                  { 
                    this.props.graphData.date_data 
                    ? 
                    <div className="ml-2 d-inline">
                      <span>
                      (
                      { this.convertToDate(this.props.graphData.date_data.filteredStartDate) } 
                      &nbsp;to&nbsp;
                      { this.convertToDate(this.props.graphData.date_data.filteredEndDate) }
                      )
                      </span> 
                    </div>
                    : <div className="ml-2 d-inline">(Last 72 Hours)</div> 
                  }
                </h2>
                <canvas 
                  className="myChart"
                  ref={this.chartRef}
                /> 
            </div>
          </div>
      )
  }
};

export default GraphCard;