import React from 'react';
import stock from '../apis/stock';
import '../css/SearchCard.css';
import '../css/styles.css';
import { FaSearch } from 'react-icons/fa'

class SearchCard extends React.Component{

    state = {
        search_stockArray: []
    };

    // when we type in a code this gets triggered
    sendSearchResult = async () => {
        let stockValue = document.querySelector(".stock-code__value").value;

        const response = await stock.get('/quote', {
            params: {
              symbol: stockValue,
              token: 'api_key'
            }
        });
        
        this.setState({
            search_stockArray: this.state.search_stockArray.concat(stockValue)
        }, () => {
            
            // bring the response data and array back up to App.js
            this.props.sendSearchResult(response.data);
            this.props.sendArrayListResult(this.state.search_stockArray);

            document.querySelector(".stock-code__value").value = '';
        })
    }

    render(){
        return (
            <div className="card card-container search">
                <div className="card-body">
                    <h2 className="h6 mb-0">Search Stock Code:</h2>
                    <input type="text" className="form-control stock-code__value" placeholder="Stock Code (e.g. AAPL)"></input>
                    <button className="btn btn-primary w-100 btn-search" onClick={ this.sendSearchResult }>Search Results<FaSearch /></button>
                </div>
            </div>
        );
    };
};

export default SearchCard;