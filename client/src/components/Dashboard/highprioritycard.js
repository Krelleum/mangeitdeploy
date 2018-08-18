import React, { Component } from 'react';
import axios from 'axios';

import './dashboard.css';
import PropTypes from 'prop-types'



class HighPriorityCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }


    static contextTypes = {
        router: PropTypes.object
    }




    componentWillMount() {
        axios({
            method: 'get',
            url: 'http://localhost:5000/order/getopenorders',
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


    filterPriority(){
        
        if (data != [])
        var data = this.state.data
        
        var filtered = data.filter(obj => 
            obj.orderpriority == 'high'
        )
       
        return filtered.length
    }



    redirectOrder() {
        this.context.router.history.push(`/orders`)
    }




    render() {
        return (
            <div className='col-md-2 highprioritycard' onClick={this.redirectOrder.bind(this)}>
                <i className="material-icons" id='highprioritycardicon'>warning</i>
                <p>You have got</p>
                <h2>{this.filterPriority()}</h2>
                <p>High Priority Orders</p>
            </div>
        )
    }
}

export default HighPriorityCard;