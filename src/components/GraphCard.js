import React from 'react';
import Chart from 'chart.js';
import '../css/GraphCard.css';

class GraphCard extends React.Component{

  // TODO: change graph colour by it's PC > C
  // TODO: add date next to the stock
  // TODO: select option

  chartRef = React.createRef();
    
  componentDidUpdate() {

    // @condition: check if there is a viable response from the API call
    if(this.props.showGraphData && this.props.graphData !== 'no_data'){
      
      var lowOrHighColor = 'white';

      // loops through all the graphData array and makes a graph individually
      for(var i = 0; i < this.props.graphData.length; i++){
        const myChartRef = this.chartRef.current.getContext("2d");
      
        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: this.props.graphData[i].x_axis,
                datasets: [
                    {
                        data: this.props.graphData[i].y_axis,
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
      };

      // show the latest stock which is the last one of it's array
      this.checkStockCode(this.props.graphData[this.props.graphData.length - 1].stockValue);
    }else{

      // if the data is no_data then show this message
      document.querySelector(".no-graph-data-message").innerHTML = 
      'No Data Currently Available. Markets are closed during weekends and public holidays. Please filter by previous date.';
    };
  };

  // @desc: checkStockCode hide and shows the correct graph depending
  //        on the stock value clicked.

  // @param: stockCode => value of the select input
  checkStockCode = (stockCode) => {
    let graphDOMALL = document.querySelectorAll(".graphDOM");
    for(var i = 0; i < this.props.graphData.length; i++){
      graphDOMALL[i].style.display = 'none';
      if(this.props.graphData[i].stockValue === stockCode){
        document.querySelector(".graphDOM."+stockCode).style.display = 'block';
      }
    };
  };

  render() {
      let optionSelectDOM = '';
      let canvaDOM = '';

      // @dom: show all the stock value as a option in select
      optionSelectDOM = this.props.graphData.map((graphData, index) => {
          return (
              <option value={ graphData.stockValue } key={ index }>
                { graphData.stockValue }
              </option>
          )
      });

      // @dom: show all the graphs on the DOM by mapping
      canvaDOM = this.props.graphData.map((graphData, index) => {
          return (
            // hiding and showing between graphs
            <div key={ index } className={ index === 0 ? graphData.stockValue + ' ds-block graphDOM' : graphData.stockValue + ' ds-none graphDOM' }>
              <h2 className="h5 mb-3 stockValue">{ graphData.stockValue }</h2>
              <canvas 
                id={ 'myChart-' + graphData.stockValue }
                className="myChart"
                ref={this.chartRef}
              /> 
            </div>
          )
      });
    
      return (
          <div className="main__chart">
          { 
            this.props.showGraphData 
            ? 
               <div>
                 <div className="main__chart-top">
                  <select className="custom-select main__chart-select" onChange={ (e) => this.checkStockCode(e.target.value) }>
                    { optionSelectDOM }
                  </select>
                </div>
                { canvaDOM }
              </div>
            :
              <p className="mb-0 no-graph-data-message">
                No current stock found. Please go to the first box and search for a stock.
              </p>
          }
          </div>
      )
  }
};

export default GraphCard;