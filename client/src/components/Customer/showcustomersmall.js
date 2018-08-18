import React, { Component } from 'react';
import './showcustomer.css';

class ShowCustomerSmall extends Component {
    constructor(props) {
        super(props);

    }






    render() {
        var customerid = this.props.data.userid;
        return (
            <div className='col-md-12 showcustomersmall'>
                <p onClick={(customerid) => this.props.setParent(this.props.data.customerid)}>{this.props.data.name}</p>
            </div>

        )
    }


}

export default ShowCustomerSmall;