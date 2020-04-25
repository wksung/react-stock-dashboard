import React from 'react';
import '../css/styles.css';
import '../css/FilterCard.css';
import { FaChartBar } from 'react-icons/fa';

class FilterCard extends React.Component{

    //TODO_2: add filtering to the graph by date from and to

    render(){
        let optionSelectDOM = '';

        optionSelectDOM = this.props.showStockArray.map((stock, index) => {
            return (
                <option value={ stock } key={ index }>{ stock }</option>
            )
        });

        return (
            <div className="card card-container filter">
                <div className="card-body">
                    <h2 className="h6 mb-2">Filter by Stock Code:</h2>
                    { 
                        this.props.showFilter 
                        ? 
                        <div>
                            <select className="custom-select">
                                { optionSelectDOM }
                            </select>
                            <div className="d-flex filter-card-date mt-2">
                                <div className="filter-card-date-div">
                                    <label className="mb-0">Start Date:</label>
                                    <input className="form-control" type="date"></input>
                                </div>
                                <div className="filter-card-date-div">
                                    <label className="mb-0">End Date:</label>
                                    <input className="form-control" type="date"></input>
                                </div>
                            </div>
                            <button className="btn btn-primary w-100 mt-3 btn-filter">Filter<FaChartBar/></button>
                        </div>
                        : <p className="mb-0 no-filter-message">No Stock Code to Filter. Please search stock code for more details</p>
                    }
                </div>
            </div>
        );
    };
};

export default FilterCard;