import React, { Component } from 'react';
import axios from 'axios';

import './showorder.css';
import OrderSmall from './ordersmall';

class ShowClosedOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }


    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:5000/order/getclosedorders',
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey'),
            }
        })
            .then(response => {
                console.log(response);
                this.setState({
                    data: response.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }






    render() {

        let data = this.state.data;

        return (
            <div className='col-md-12 showclosedorderwrapper'>
                <div className='showclosedorderheading'>
                    <h2>Closed Orders</h2>
                </div>
                {data.map((obj, index) =>
                    <OrderSmall key={index} data={obj} />
                )}

            </div>
        )
    }

}

export default ShowClosedOrders;