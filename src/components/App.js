import React from 'react';
import SearchCard from './SearchCard';
import FilterCard from './FilterCard';
import TableDataCard from './TableDataCard';
import GraphCard from './GraphCard';
import '../css/styles.css';

class App extends React.Component{

    //TODO_3: add stockArray into sessionStorage and load it, if it exists

    state = {
        stockArray: [],
        tableData: [],
        showFilter: false
    }

    // returns the table data when you search a stock code
    sendSearchResult = (data) => {
        this.setState({ 
            tableData: this.state.tableData.concat(data),
            showFilter: true
        });
    }

    // returns the array of stock code user has inputted
    sendArrayListResult = (array) => {
        this.setState({
            stockArray: array
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
                                sendArrayListResult = { this.sendArrayListResult }>
                            </SearchCard>
                            <FilterCard
                                showFilter = { this.state.showFilter }
                                showStockArray = { this.state.stockArray }>
                            </FilterCard>
                        </div>
                        <div className="app-container__right">
                            <div className="card card-container graph">
                                <div className="card-body">
                                    <GraphCard>
                                    </GraphCard>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row table-data-row">
                    <div className="col-12 table-data-col">
                        <TableDataCard 
                            showFilter = { this.state.showFilter }
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