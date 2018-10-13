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
            url: '/customer/getallcustomer',
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
            <div className='col-md-2 customercard dashcard' onClick={this.redirectCustomer.bind(this)}>
                <div className='cardfield'>
                    <h2>{this.state.data.length}</h2>
                </div>
                
               
                <div className='cardtext'>
                    <h3>Customers</h3>
                    <p>Shows all active Customers in your Database.</p>
                </div>
                <i className="material-icons" id='openordercardicon' >people</i>
                
                
            </div>
        )
    }
}

export default CustomerCard;