import React from 'react';
import SearchCard from './SearchCard';
import FilterCard from './FilterCard';
import TableDataCard from './TableDataCard';
import GraphCard from './GraphCard';
import '../css/styles.css';

class App extends React.Component{
    
    // TODO: load circle bar

    state = {
        tableData: [],
        graphData: [],
        activeStockValue: '',
        showFilterDOM: false,
        showFilterData: false,
        showTableData: false,
        showGraphData: false,
        lsArray: [],
        option: []
    };

    // @desc: this componentDidUpdate is showing the latest graph which has 
    //        been searched and hiding the rest
    componentDidUpdate(){
        this.state.graphData.map((graphData, index) => {
            document.querySelector('#myChart-' + graphData.stockValue).style.display = "none";
            if(index === this.state.graphData.length - 1){
                document.querySelector('#myChart-' + graphData.stockValue).style.display = "block";
            }
        }); 
    };

    // @desc: SearchCard.js does an API call and sends the relevant data for
    //        the TableDataCard.js, through this you need to truesy the showFilterDOM,
    //        and showTableData to show the user actual representable DOM.
    // @param: data     => an object which has current, highest, lowest etc. values
    //         response => {c: 289.07, h: 299, l: 285.85, o: 286.25, pc: 293.8, t: 1588487630}
    sendSearchResult = (data) => {
        if(data !== "Symbol not supported"){
            this.setState({ 
                tableData: this.state.tableData.concat(data),
                showFilterDOM: true,
                showTableData: true
            });
        };
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
                    graphData: abc,
                    activeStockValue: response_data.stockValue,
                    showGraphData: true
                }, () => {
                    this.setState({
                        showGraphData: true
                    })
                });
            };
        };
    };

    // @desc: SearchCard.js does an API call and sends the graph_array which is the
    //        stockValue and the actual response from the API. This changes the unix
    //        time stamp to readable js time in the x_axis.
    // @param: graph_array => stockValue must be a string and an object of response
    //         response    => { stockValue: AAPL, response: {c: Array(179), h: Array(179) …} }
    sendSearchGraphResult = (codeExist, graph_array) => {
        if(codeExist != "no_data"){
            let converted_array = [];
        
            this.setState({
                lsArray: this.state.lsArray.concat(graph_array.stockValue)
            }, () => {
                localStorage.setItem('historyStockArray', JSON.stringify(this.state.lsArray));
            });
    
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
                    activeStockValue: graph_array.stockValue,
                    showGraphData: true
                }, () => {
                    // this makes the second graph and above show
                    this.setState({
                        showGraphData: true
                    });
                });
            }else{
                this.setState({
                    graphData: this.state.graphData.concat({
                        stockValue: graph_array.stockValue, 
                        response: "no_data",
                        showGraphData: true
                    })
                }, () => {
                    this.setState({
                        showGraphData: true
                    });
                });
            }
        }else{
            alert("Stock Code does not exist within the Database.");
            window.location.reload(true);
        };
    };

    // @desc: same as componentDidUpdate, hide all and display only that has been selected

    // @param: stockValue => string of the select (e.g. AAPL)
    checkStockCode = (stockValue) => {
        this.state.graphData.map((graphData, index) => {
            document.querySelector('#myChart-' + graphData.stockValue).style.display = "none";
            if(index === this.state.graphData.length - 1){
                document.querySelector('#myChart-' + stockValue).style.display = "block";
            }
        }); 
    }

    render(){
        let graphCardDOM = '';
        let optionSelectDOM = '';

        // @condition: check if showGraphData is true
        if(this.state.showGraphData){
            // loop through the data and make each graph
            graphCardDOM = this.state.graphData.map((graphData, index) => {
                if(graphData.response !== "no_data"){
                    return (
                        <GraphCard
                            key = { index }
                            tableData = { this.state.tableData }
                            showGraphData = { this.state.showGraphData }
                            showActiveStockCode = { this.state.activeStockValue }
                            graphData = { graphData }
                            filteredData = { this.state.filteredData }
                            showFilterData = { this.state.showFilterData }>
                        </GraphCard>
                    );
                }else{
                    return(
                        <p key={ index } 
                           className="no-graph-data-message">
                            No Data Currently Available. Markets are closed during weekends 
                            and public holidays. Please filter by previous date.
                        </p>
                    )
                };
            });
        };
  
        // @dom: show all the stock value as a option in select
        optionSelectDOM = this.state.graphData.map((graphData, index) => {
            return (
                <option 
                value={ graphData.stockValue } 
                key={ index }
                selected={ this.state.graphData[this.state.graphData.length - 1] === graphData ? "selected" : "" }>
                  { graphData.stockValue }
                </option>
            )
        });

        return (
            <div className={ this.state.showGraphData ? "container-fluid app-container" : "container-fluid app-container height-100" }>
                <div className="row app-container__row">
                    <div className="col-12 app-container__container">
                        <div className="app-container__left">
                            <SearchCard 
                                sendSearchResult = { this.sendSearchResult }
                                sendSearchGraphResult = { this.sendSearchGraphResult }>
                            </SearchCard>
                            <FilterCard
                                showFilterDOM = { this.state.showFilterDOM }
                                showGraphData = { this.state.graphData }
                                showActiveStockCode = { this.state.activeStockValue }
                                getFilteredData = { this.getFilteredData }>
                            </FilterCard>
                        </div>
                        <div className="app-container__right">
                            <div className="card card-container graph">
                                <div className="card-body">
                                    { 
                                        this.state.showGraphData 
                                        ? 
                                        // add the select field
                                        <div>
                                            <select className="custom-select main__chart-select" onChange={ (e) => this.checkStockCode(e.target.value) }>
                                                { optionSelectDOM }
                                            </select>
                                            { graphCardDOM }
                                        </div>
                                        : 
                                        <p className="no-graph-data-message">
                                            No current stock found. Please go to the first box and search for a stock.
                                        </p> 
                                    }
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
                            graphData = { this.state.graphData }>
                        </TableDataCard>
                    </div>
                </div>
            </div>
        );
    };
};

export default App;