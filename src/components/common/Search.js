import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL} from '../../config';
import { handleResponse } from '../../helpers';
import Loading from '../common/Loading';
import './Search.css';

class Search extends Component {

    constructor() {

        super();
        
        // local state
        this.state = {
            searchResults: [],
            searchQuery: '',
            loading: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
    }

    handleChange(event) {

        const searchQuery = event.target.value;

        this.setState( { searchQuery });

        // if searchQuery isn't present don't send request to the server
        if(!searchQuery){

            return '';
        }

        // update loading when search is triggled
        this.setState({ loading: true });

        fetch(`${ API_URL}/autoComplete?searchQuery=${searchQuery}`)
            .then(handleResponse)
            .then((result) => {

                // console.log(result);

                // update searchResults & loading when search is done
                this.setState({ 
                    searchResults: result,
                    loading: false ,
                });
            })
    }

    handleRedirect(currencyId) {
        // clear input value and close autocoplete container, by clearing searchQuery state
        this.setState({
            searchQuery: '',
            searchResults: [],
        });

        this.props.history.push(`/currency/${currencyId}`)
    }
    renderSearchResults(){
        const { searchResults, searchQuery, loading } = this.state;

        // return nothing if no search
        if (!searchQuery) {
            return '';
        }
        if (searchResults.length > 0) {
            return (
                <div className= "Search-result-container">
                    {
                        searchResults.map(result => (
                            <div key = {result.id}
                                className="Search-result"
                                onClick={ () => this.handleRedirect(result.id)}
                                >
                                { result.name } ({ result.symbol })
    
                            </div>
                        ))}
                </div>
            );
        }
        if (!loading) {
            return (
                <div className="Search-result-container">
                    <div className="Search-no-result">
                        No Result Found.
                    </div>
                </div>
            );
        }
    }

    render() {

        const { loading, searchQuery } = this.state;

        return(

            <div className="Search" >
                <span className="Search-icon" />
                <input 
                type="text"
                className="Search-input"
                placeholde="Currency Name"
                onChange = { this.handleChange} 
                value={ searchQuery }
                
                />
                
                { loading &&
                    <div className="Search-loading">
                        <Loading 
                            width   = '12px'
                            height  = '12px'
                        />
                    </div>}
                { this.renderSearchResults() }
            </div>
        );
    }
}

export default withRouter(Search);