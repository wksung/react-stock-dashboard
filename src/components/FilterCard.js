import React from 'react';
import '../css/styles.css';
import '../css/FilterCard.css';
import { FaChartBar } from 'react-icons/fa';

class FilterCard extends React.Component{

    //TODO: add filtering to the graph by date from and to

    state = {
        validator_start_date: '',
        validator_end_date: ''
    };

    componentDidUpdate(){
        if(this.props.showFilterDOM){
            document.querySelector(".btn-filter").disabled = true;
        }
    };

    start_dateValidator = (val) => {
        this.setState({
            validator_start_date: val
        }, () => {
            if(Date.parse(this.state.validator_start_date) < Date.parse(this.state.validator_end_date)){
                document.querySelector(".btn-filter").disabled = false;
            }else{
                document.querySelector(".btn-filter").disabled = true;
            }
        });
    };

    end_dateValidator = (val) => {
        this.setState({
            validator_end_date: val
        }, () => {
            if(Date.parse(this.state.validator_start_date) < Date.parse(this.state.validator_end_date)){
                document.querySelector(".btn-filter").disabled = false;
            }else{
                document.querySelector(".btn-filter").disabled = true;
            };
        });
    }

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
                            <select className="custom-select">
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
                            <button className="btn btn-secondary w-100 mt-3 btn-filter">Filter<FaChartBar/></button>
                        </div>
                        : <p className="mb-0 no-filter-message">No Stock Code to Filter. Please search stock code for more details</p>
                    }
                </div>
            </div>
        );
    };
};

export default FilterCard;