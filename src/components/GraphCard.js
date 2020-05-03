import React from 'react';
import Chart from 'chart.js';
import '../css/GraphCard.css';

class GraphCard extends React.Component{

  // COMMENT: Not Done

  // TODO: PLEASE TWO WAY BIND WITH FILTERCARD DROPDOWN -> don't use stockArray

  // TODO: change graph colour by it's PC > C
  // TODO: add date next to the stock

  chartRef = React.createRef();
    
  componentDidUpdate() {

    // if there is actual data
    if(this.props.showGraphData && this.props.graphData !== 'no_data'){
      
      var lowOrHighColor = 
                      this.props.graphData[this.props.graphData.length - 1].y_axis[this.props.graphData[this.props.graphData.length - 1].y_axis.length - 1] > 
                      this.props.graphData[this.props.graphData.length - 1].y_axis[0] ? '#81b737' : '#d54f4f';

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
      // show the latest one
      this.checkStockCode(this.props.graphData[this.props.graphData.length - 1].stockValue);
    }else{
      // if the data is no_data then show this message
      document.querySelector(".no-graph-data-message").innerHTML = 
      'No Data Currently Available. Markets are closed during weekends and public holidays. Please filter by previous date.';
    };
  };

  checkStockCode = (stockCode) => {
    let stockArray = this.props.graphData;
    let graphDOMALL = document.querySelectorAll(".graphDOM");

    for(var i = 0; i < stockArray.length; i++){
      // make all none
      graphDOMALL[i].style.display = 'none';

      if(stockArray[i].stockValue === stockCode){
        // if the stockcode is matching then show it
        document.querySelector(".graphDOM."+stockCode).style.display = 'block';
      }
    };
  };

  render() {
      let optionSelectDOM = '';
      let canvaDOM = '';

      // reverse to make the last one appear in the select
      optionSelectDOM = this.props.graphData.map((graphData, index) => {
          return (
              <option 
                value={ graphData.stockValue } 
                key={ index }
                selected={ graphData.stockValue === this.props.graphData[this.props.graphData.length - 1] ? 'selected' : 'no' }>
                { graphData.stockValue }
              </option>
          )
      });

      // looping through the canvas graph DOM
      canvaDOM = this.props.graphData.map((graphData, index) => {
          return (
            // hiding and showing between graphs
            <div key={ index } className={ index === 0 ? graphData.stockValue + ' ds-block graphDOM' : graphData.stockValue + ' ds-none graphDOM' }>
              <h2 className="h5 mb-3 stockValue">{ this.props.graphData[this.props.graphData.length - 1].stockValue }</h2>
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