import React from 'react';
import SearchCard from './SearchCard';
import FilterCard from './FilterCard';
import TableDataCard from './TableDataCard';
import GraphCard from './GraphCard';
import '../css/styles.css';

class App extends React.Component{
    
    // TODO: add stockArray into sessionStorage and load it, if it exists
    // TODO: load circle bar

    state = {
        stockArray: [],
        tableData: [],
        graphData: [],
        showFilterDOM: false,
        showFilterData: false,
        showTableData: false,
        showGraphData: false,
        filteredData: []
    }

    // @desc: SearchCard.js does an API call and sends the relevant data for
    //        the TableDataCard.js, through this you need to truesy the showFilterDOM,
    //        and showTableData to show the user actual representable DOM.
    // @param: data     => an object which has current, highest, lowest etc. values
    //         response => {c: 289.07, h: 299, l: 285.85, o: 286.25, pc: 293.8, t: 1588487630}
    sendSearchResult = (data) => {
        this.setState({ 
            tableData: this.state.tableData.concat(data),
            showFilterDOM: true,
            showTableData: true
        });
    };

    // @desc: In SearchCard.js, there is an array of stock values the user has inserted.
    // @param: array    => an array of string values
    //         response => ["AAPL", "TSLA"]
    sendArrayListResult = (array) => {
        this.setState({
            stockArray: array
        });
    };

    // @desc: FilterCard.js does an API call and sends the response_data which is the
    //        stockValue and the actual response from the API. From this you want to 
    //        remove the old graph which was in the graphData and insert the new data.
    //        This also adds readable date for the x_axis data.
    // @params: date => start and end date of the filtered value
    //          response_data => stockValue must be a string and response is an object
    //          response      => {stockValue: stockValue, response: graph_response.data}
    getFilteredData = (date, response_data) => {
        let abc = this.state.graphData;
        let converted_array = [];   
        
        for(let i = 0; i < abc.length; i++){
            let obj = abc[i];

            if(response_data.stockValue.indexOf(obj.stockValue) !== -1){
                converted_array = [];
                for(let i = 0; i < response_data.response.t.length; i++){
                    converted_array.push(new Date(response_data.response.t[i] * 1000))
                };
                abc.splice(i, 1);
                abc.push({
                    stockValue: response_data.stockValue,
                    x_axis: converted_array,
                    y_axis: response_data.response.c,
                    date_data: {
                        filteredStartDate: new Date(date[0]*1000),
                        filteredEndDate: new Date(date[1]*1000)
                    }
                });
                this.setState({
                    graphData: abc
                });
            };
        };
    };

    // @desc: SearchCard.js does an API call and sends the graph_array which is the
    //        stockValue and the actual response from the API. This changes the unix
    //        time stamp to readable js time in the x_axis.
    // @param: graph_array => stockValue must be a string and an object of response
    //         response    => { stockValue: AAPL, response: {c: Array(179), h: Array(179) …} }
    sendSearchGraphResult = (graph_array) => {
        let converted_array = [];   

        if(graph_array.response.s !== "no_data"){
            for(let i = 0; i < graph_array.response.t.length; i++){
                converted_array.push(new Date(graph_array.response.t[i] * 1000))
            };
            this.setState({
                graphData: this.state.graphData.concat({
                    stockValue: graph_array.stockValue,
                    x_axis: converted_array,
                    y_axis: graph_array.response.c,
                }),
                showGraphData: true
            });
        }else{
            this.setState({
                graphData: this.state.graphData.concat("no_data")
            });
        }
    };

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
                                showStockArray = { this.state.stockArray }
                                getFilteredData = { this.getFilteredData }>
                            </FilterCard>
                        </div>
                        <div className="app-container__right">
                            <div className="card card-container graph">
                                <div className="card-body">
                                    <GraphCard
                                        tableData = { this.state.tableData }
                                        stockArray = { this.state.stockArray }
                                        showGraphData = { this.state.showGraphData }
                                        graphData = { this.state.graphData }
                                        filteredData = { this.state.filteredData }
                                        showFilterData = { this.state.showFilterData }>
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