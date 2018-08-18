import React, { Component } from 'react';
import './orderscontainer.css';

import OrderForm from './Orderform/orderform';
import ShowOpenOrders from './showorder/showopenorders';
import ShowClosedOrders from './showorder/showclosedorders';

class OrdersContainer extends Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }


    render(){
        return(
            <div className='col-md-12 orderscontainer'>
                <h1>ORDERS</h1>
                <div className='row'>
                    <div className='col-md-4 createorderscontainerwrapper'>
                        <OrderForm/>
                    
                    </div>
                    <div className='col-md-4 openorderscontainerwrapper'>
                        <ShowOpenOrders/>
                    </div>
                    <div className='col-md-4 closedorderscontainerwrapper'>
                        <ShowClosedOrders />
                    
                    </div>
                </div>
            
            
            
            </div>
        )
    }

}


export default OrdersContainer;
