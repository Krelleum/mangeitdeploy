import React, { Component } from 'react';
import axios from 'axios';

import './dashboard.css';
import PropTypes from 'prop-types'

class OpenOrderCard extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: 'init'
        }
    }
    
// For ROUTING VIA CLICK ON CARD
    static contextTypes = {
        router: PropTypes.object
    }



    componentWillMount(){
        axios({
            method: 'get',
            url:'http://localhost:5000/order/getopenorders',
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
    
    
    redirectOrder() {
        this.context.router.history.push(`/orders`)
    }


    render(){
        return(
            <div className='col-md-2 openordercard' onClick={this.redirectOrder.bind(this)}>
                <i className="material-icons" id='openordercardicon' >assignment</i>
                <p>You have got</p>
                <h2>{this.state.data.length}</h2>
                <p>Open Orders</p>
            </div>
        )
    }
}

export default OpenOrderCard;