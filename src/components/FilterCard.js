import React from 'react';
import '../css/styles.css';
import '../css/FilterCard.css';
import stock from '../apis/stock';
import { FaChartBar } from 'react-icons/fa';

class FilterCard extends React.Component{

    // COMMENT: Not Done

    // TODO: PLEASE TWO WAY BIND WITH GRAPHCARD DROPDOWN/TITLE -> don't use stockArray

    state = {
        validator_start_date: '',
        validator_end_date: ''
    };

    componentDidUpdate(){
        if(this.props.showFilterDOM){
            document.querySelector(".btn-filter").disabled = true;
        }
    };

    // date validator 1.0
    start_dateValidator = (val) => {
        let current_date = new Date();

        this.setState({
            validator_start_date: val
        }, () => {
            if(Date.parse(this.state.validator_start_date) < Date.parse(this.state.validator_end_date) 
                && Date.parse(this.state.validator_start_date) < current_date
                && Date.parse(this.state.validator_end_date) < current_date){
                document.querySelector(".btn-filter").disabled = false;
            }else{
                document.querySelector(".btn-filter").disabled = true;
            }
        });
    };

    // date validator 2.0
    end_dateValidator = (val) => {
        let current_date = new Date();
    
        this.setState({
            validator_end_date: val
        }, () => {
            if(Date.parse(this.state.validator_start_date) < Date.parse(this.state.validator_end_date) 
                && Date.parse(this.state.validator_end_date) < current_date){
                document.querySelector(".btn-filter").disabled = false;
            }else{
                document.querySelector(".btn-filter").disabled = true;
            };
        });
    };

    filterMyChart = async () => {
        let stockValue = document.querySelector(".filter-select").value;
        let startDate = new Date(document.querySelector("input.start-date").value)/1000;
        let endDate = new Date(document.querySelector("input.end-date").value)/1000;

        const graph_response = await stock.get('/stock/candle', {
            params: {
              symbol: stockValue,
              resolution: 5,
              from: startDate,
              to: endDate,
              token: 'bqhq9i7rh5rbubolrqd0'
            }
        });

        this.props.getFilteredData([startDate, endDate], {stockValue: stockValue, response: graph_response.data});
        document.querySelector("input.start-date").value = '';
        document.querySelector("input.end-date").value = '';
    };

    render(){
        let optionSelectDOM = '';

        optionSelectDOM = this.props.showStockArray.map((stock, index) => {
            return (
                <option 
                value={ stock } 
                key={ index } 
                selected={ stock === this.props.showStockArray[this.props.showStockArray.length - 1] ? 'selected' : 'no' }>
                    { stock }
                </option>
            )
        });

        return (
            <div className="card card-container filter">
                <div className="card-body">
                    <h2 className="h6 mb-2">Filter by Stock Code:</h2>
                    { 
                        this.props.showFilterDOM 
                        ? 
                        <div>
                            <select className="custom-select filter-select">
                                { optionSelectDOM }
                            </select>
                            <div className="d-flex filter-card-date mt-2">
                                <div className="filter-card-date-div">
                                    <label className="mb-0">Start Date:</label>
                                    <input className="form-control start-date" type="date" onChange={ (e) => this.start_dateValidator(e.target.value) }></input>
                                </div>
                                <div className="filter-card-date-div">
                                    <label className="mb-0">End Date:</label>
                                    <input className="form-control end-date" type="date" onChange={ (e) => this.end_dateValidator(e.target.value) }></input>
                                </div>
                            </div>
                            <button className="btn btn-secondary w-100 mt-3 btn-filter" onClick={ this.filterMyChart }>Filter<FaChartBar/></button>
                        </div>
                        : <p className="mb-0 no-filter-message">No Stock Code to Filter. Please search stock code for more details</p>
                    }
                </div>
            </div>
        );
    };
};

export default FilterCard;