import React from 'react';
import '../css/styles.css';
import '../css/FilterCard.css';
import stock from '../apis/stock';
import { FaChartBar } from 'react-icons/fa';

class FilterCard extends React.Component{

    state = {
        validator_start_date: '',
        validator_end_date: ''
    };

    // @desc: componentDidUpate checks to see if the showFilterDOM is
    //        triggered. This is triggered when the API call is done and
    //        disables the button as default.
    componentDidUpdate(){
        if(this.props.showFilterDOM){
            document.querySelector(".btn-filter").disabled = true;
        };
    };

    // @desc: start_dateValidator checks for the date of the first date input.
    //        It also checks for its current date and if the endDate is later
    //        than the current Date and before the start date it disables the button.

    // @params: val => the value of the date in string (e.g. 2020-05-03)
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

    // @desc: end_dateValidator checks for the date of the second date input.
    //        It also checks for its current date and if the startDate is later
    //        than the current Date and after the start date it disables the button.

    // @params: val => the value of the date in string (e.g. 2020-05-03)
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

    // @desc: filterMyChart is a button trigger which checks for the start and end
    //        date and the stock code value. This runs an API calls and sends it
    //        back up as props in App.js, and also resets the start and end date.
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

        // @dom: show all the stock values and put it into the select DOM
        optionSelectDOM = this.props.showGraphData.map((graphData, index) => {
            return (
                <option 
                    value={ graphData.stockValue } 
                    key={ index }
                    selected={ this.props.showGraphData[this.props.showGraphData.length - 1] === graphData ? "selected" : "" }>
                        { graphData.stockValue }
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