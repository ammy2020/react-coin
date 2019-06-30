import React from 'react';
import { handleResponse } from '../../../helpers';
import { API_URL } from '../../../config';
import Loading from '../../common/Loading';
import Table from './Table';
import Pagination from './Pagination';


class List extends React.Component{
    constructor()  {
        super();
        
        // set state to false for the loading, set empty array for currencies, null for error, when receivind data from API
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            page: 1,
            totalPages: 0
        };
        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }
    
    componentDidMount() {
        this.fetchCurrencies();
       
    }

    /**
     * 
     * Custom methods
     */

     fetchCurrencies(){
          // set loading to true
        this.setState({ loading:true });

        const { page } = this.state;

        // fetch(API_URL + '/cryptocurrencies?page=1&perPage=20')
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {

            const { currencies, totalPages } = data;

            // console.log('Success', data);

            //set the currencies to our empt array, loading to false from the local state
            this.setState({ 
                currencies,
                totalPages,
                loading:false, 
            });
        })
        .catch((error) => {
            // console.log('Error', error);

            // Currency with given id not found. 
            this.setState({ error: error.errorMessage, loading:false });
        });
     }
    

    handlePaginationClick(direction) {
        let nextPage = this.state.page;
        /**
         * Nomal if condtion statement
         */

        // if( nextPage === 'next'){
        //     nextPage++;
        // }else{
        //     nextPage--;
        // }

        // Increment nextPage if direction variable is next, otherwise decrement
        nextPage = direction === 'next'? nextPage+1 : nextPage -1;

        // update our next page
        this.setState({ page:nextPage }, () => {
            // call fetchCurrencies function inside setState's callbaack
            // because we have to make sure first page state is updated
            this.fetchCurrencies();
        });

        
    }

    render() {

        const  {currencies, loading, error, page, totalPages } = this.state;

        //console data
        // console.log(this.state);
        
        // render only loading component if loading state is set to true
        if(loading){
            return(
                <div className="loading-container"> <Loading /></div>
            )
        }

        // render only error message, if error occurred while fetching data
        if(error) {
            return <div className="error">{ error }</div>
        }
        return (
            <div>
                 <Table currencies  = { currencies } 
                />
                <Pagination 
                 page={ page }
                 totalPages={ totalPages } 
                 handlePaginationClick={ this.handlePaginationClick}  
                />
            </div>
        );
    }
       
}

export default List;