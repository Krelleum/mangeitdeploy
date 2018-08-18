import React, { Component } from 'react';
import './showcustomer.css';

import ShowCustomer from './showcustomer';

class ShowCustomerContainer extends Component {



    render() {
        return (
            <div className='col-md-12 showcustomercontainer'>
                <h1>CUSTOMER</h1>
                <ShowCustomer/>
            </div>

        )
    }


}

export default ShowCustomerContainer;