import React from 'react';
import stock from '../apis/stock';
import '../css/SearchCard.css';
import '../css/styles.css';
import { FaSearch } from 'react-icons/fa'

class SearchCard extends React.Component{

    // COMMENT: Not Done

    // TODO: no duplicate stock

    state = {
        search_stockArray: []
    };

    componentDidMount(){
        document.querySelector(".btn-search").disabled = true;
    }

    componentDidUpdate(){
        if(document.querySelector(".btn-search").value === ''){
            document.querySelector(".btn-search").disabled = true;
        }
    }

    // when we type in a code this gets triggered
    sendSearchResult = async () => {
        let stockValue = document.querySelector(".stock-code__value").value.toUpperCase();
        let startDate = Math.round(new Date().getTime() / 1000);
        let endDate = startDate - (48 * 3600);

        const table_response = await stock.get('/quote', {
            params: {
              symbol: stockValue,
              token: 'bqhq9i7rh5rbubolrqd0'
            }
        });

        const graph_response = await stock.get('/stock/candle', {
            params: {
              symbol: stockValue,
              resolution: 5,
              from: endDate,
              to: startDate,
              token: 'bqhq9i7rh5rbubolrqd0'
            }
        });
        
        this.setState({
            search_stockArray: this.state.search_stockArray.concat(stockValue),
        }, () => {
            this.props.sendSearchResult(table_response.data);
            this.props.sendSearchGraphResult({stockValue: stockValue, response: graph_response.data});
            this.props.sendArrayListResult(this.state.search_stockArray);
            document.querySelector(".stock-code__value").value = '';
        })
    };

    validateBtn = (val) => {
        let btnDOM = document.querySelector(".btn-search");
        val === '' ? btnDOM.disabled = true : btnDOM.disabled = false;
    };

    render(){
        return (
            <div className="card card-container search">
                <div className="card-body">
                    <h2 className="h6 mb-0">Search Stock Code:</h2>
                    <input type="text" 
                           className="form-control stock-code__value" 
                           placeholder="Stock Code (e.g. AAPL)" 
                           onKeyUp={ (e) => this.validateBtn(e.target.value) }>
                    </input>
                    <button className="btn btn-secondary w-100 btn-search" onClick={ this.sendSearchResult }>Search Results<FaSearch /></button>
                </div>
            </div>
        );
    };
};

export default SearchCard;