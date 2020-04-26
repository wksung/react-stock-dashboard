import React from 'react';
import SearchCard from './SearchCard';
import FilterCard from './FilterCard';
import TableDataCard from './TableDataCard';
import GraphCard from './GraphCard';
import '../css/styles.css';

class App extends React.Component{

    //TODO: add stockArray into sessionStorage and load it, if it exists

    state = {
        stockArray: [],
        tableData: [],
        graphData: [],
        showFilterDOM: false,
        showTableData: false,
        showGraphData: false,
        currentStock: ''
    }

    // returns the table data when you search a stock code
    sendSearchResult = (data) => {
        this.setState({ 
            tableData: this.state.tableData.concat(data),
            showFilterDOM: true,
            showTableData: true
        });
    }

    sendSearchGraphResult = (graph_array) => {
        var converted_array = [];
        
        if(graph_array.s !== "no_data"){
            for(var i = 0; i < graph_array.t.length; i++){
                converted_array.push(new Date(graph_array.t[i] * 1000))
            };
            this.setState({
                graphData: this.state.graphData.concat({
                    x_axis: converted_array,
                    y_axis: graph_array.c,
                }),
                showGraphData: true
            }, () => {
                // console.log(this.state);
            });
        }else{
            this.setState({
                graphData: this.state.graphData.concat("no_data")
            });
        }
    }

    // returns the array of stock code user has inputted
    sendArrayListResult = (array) => {
        this.setState({
            stockArray: array
        });
    };

    getCurrentStock = (stock) => {
        this.setState({
            currentStock: stock
        }, () => {
            console.log(this.state);
        });
    }

    render(){
        return (
            <div className="container-fluid app-container">
                <div className="row app-container__row">
                    <div className="col-12 app-container__container">
                        <div className="app-container__left">
                            <SearchCard 
                                sendSearchResult = { this.sendSearchResult }
                                sendArrayListResult = { this.sendArrayListResult }
                                sendSearchGraphResult = { this.sendSearchGraphResult }>
                            </SearchCard>
                            <FilterCard
                                showFilterDOM = { this.state.showFilterDOM }
                                showStockArray = { this.state.stockArray }>
                            </FilterCard>
                        </div>
                        <div className="app-container__right">
                            <div className="card card-container graph">
                                <div className="card-body">
                                    <GraphCard
                                        getCurrentStock = { this.getCurrentStock }
                                        tableData = { this.state.tableData }
                                        stockArray = { this.state.stockArray }
                                        showGraphData = { this.state.showGraphData }
                                        graphData = { this.state.graphData }>
                                    </GraphCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row table-data-row">
                    <div className="col-12 table-data-col">
                        <TableDataCard 
                            showTableData = { this.state.showTableData }
                            tableData = { this.state.tableData }
                            stockArray = { this.state.stockArray }>
                        </TableDataCard>
                    </div>
                </div>
            </div>
        );
    };
};

export default App;