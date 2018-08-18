import React, { Component } from 'react';
import axios from 'axios';

import './dashboard.css';
import PropTypes from 'prop-types'

class CustomerCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'init'
        }
    }


    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        axios({
            method: 'get',
            url: 'http://localhost:5000/customer/getallcustomer',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey')
            }
        })
            .then(response => {

                this.setState({
                    data: response.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }





    redirectCustomer() {
        this.context.router.history.push('/customer')
    }

    render() {
        return (
            <div className='col-md-3 customercard' onClick={this.redirectCustomer.bind(this)}>
                <i className="material-icons" id='openordercardicon' >people</i>
                <p>There are</p>
                <h2>{this.state.data.length}</h2>
                <p>active Customers</p>
            </div>
        )
    }
}

export default CustomerCard;