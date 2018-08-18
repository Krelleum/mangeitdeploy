import React, { Component } from 'react';
import axios from 'axios';
import './orderstatusbtn.css';



class OrderStatusBtn extends Component {
    constructor(props){
        super(props);
    }



    // Chooses wich button to Render... Either Order Close Button or Order Reopen Button
    determineButton(){
        let open = 'open';
        let closed = 'closed'


        if(this.props.data)
        
        
        if(this.props.data.orderstatus && this.props.data.orderstatus === 'open'){
            return(
                <div className='orderclosebtn' onClick={() => this.patchOrder(closed)}>
                <p>Close Order</p>
            </div>
            ) 
        }
        else if (this.props.data.orderstatus && this.props.data.orderstatus === 'closed'){
            return(
                <div className='orderreopenbtn' onClick={() => this.patchOrder(open)}>
                    <p>Reopen Order</p>
                </div>
            )
        }
        else {
            return null
        }
    }



    



    patchOrder(newStatus){
        
        let body = {
            orderid: this.props.data.orderid, 
            orderstatus: newStatus
        }
        
        
        axios({
            method: 'patch',
            url: 'http://localhost:5000/order/changeorderstatus',
            data: body,
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey'),
            }
        })
            .then(response => {
                console.log(response);
                this.props.setStateByChild(newStatus);
            })
            .catch(err => {
                console.log(err)
            })
    }


  










    render(){
        return(
            <div className='orderstatusbtn'>
                {this.determineButton()}
            </div>
        )
    }







}


export default OrderStatusBtn;