import React, { Component } from 'react';
import axios from 'axios';

import './orderbig.css';
import OrderCommentContainer from './ordercomment/ordercommentcontainer';
import OrderStatusBtn from './orderstatusbtn';

class OrderBig extends Component {
    constructor(props) {
        super(props);

        this.setStateByChild = this.setStateByChild.bind(this);

        this.state = {
            data: [],
            customerinfo: [],

        }
    }


    setStateByChild() {

        window.location.reload()
    }


    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:5000/order/getorderbyid/' + this.props.match.params.orderid,
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey')
            }
        })
            .then(response => {
                this.setState({ data: response.data })
                this.getCustomerInfo()
            })
    }


    getCustomerInfo() {
        axios({
            method: 'get',
            url: 'http://localhost:5000/customer/searchcustomer/' + this.state.data.customername,
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey')
            }
        })
            .then(response => {
                this.setState({ customerinfo: response.data })
            })
    }






    renderStatus() {
        let status = this.state.data.orderstatus;

        if (status === 'open') {
            return <p id='orderbigstatusopen'>Open</p>
        } else if (status === 'closed') {
            return <p id='orderbigstatusclosed'>Closed</p>
        } else {
            return null
        }
    }

    renderPriority() {
        let priority = this.state.data.orderpriority;

        if (priority === 'high') {
            return <p id='orderbigpriorityhigh'>High</p>
        } else if (priority === 'low') {
            return <p id='orderbigprioritylow'>Low</p>
        } else {
            return null
        }
    }

    renderAppointment() {
        let appointment = this.state.data.ordertype;

        if (appointment === 'appointment') {
            return <p id='orderbigappointment'>Appointment</p>
        } else if (appointment === 'noappointment') {
            return <p id='orderbignoappointment'>No Appointment</p>
        } else {
            return null
        }
    }

    deleteOrder() {
        alert('trying to delete order - see console for status')
        var orderId = this.props.match.params.orderid
        // delete the comments
        axios({
            method: 'delete',
            url: 'http://localhost:5000/comment/deleteallcomments/' + orderId,
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('comments were deleted')

                    // second axios call to delete the order itself

                    axios({
                        method: 'delete',
                        url: 'http://localhost:5000/order/deleteorder/' + orderId,
                        header: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('tkey')
                        }
                    })
                        .then(response => {
                            if (response.status === 200) {
                                console.log('order was deleted')

                            }
                        })
                }
            })
            .catch(err => {
                console.log(err)
                console.log('comments/order could not be deleted')
            })

    }

    render() {
        return (
            <div className='col-md-12 orderbigwrapper'>
                <div className='orderbigwrapperheading'>
                    <h1>ORDER</h1>

                </div>
                <div className='col-md-4 orderbigleft'>
                    <div className='orderbigheading'>

                        <div className='orderstatusbtnwrapper'>
                            <OrderStatusBtn data={this.state.data} setStateByChild={this.setStateByChild} />
                        </div>

                        <h2>{this.state.data.orderheading}</h2>

                        <div className='orderbigheadingbar'>
                            <div className='orderbigheadingstatus'>
                                {this.renderStatus()}
                            </div>
                            <div className='orderbigheadingpriority'>
                                {this.renderPriority()}
                            </div>
                            <div className='orderbigheadingappointment'>
                                {this.renderAppointment()}
                            </div>
                        </div>
                        <button onClick={this.deleteOrder.bind(this)}>Delete This Order</button>
                    </div>


                    <div className='col-md-6 orderbigcustomerinfowrapper'>

                        <div className='orderbigcustomerinfo orderbigcustomerinfoname'>
                            <label className='orderbigcustomerinfolabel'>name</label>
                            <p>{this.state.customerinfo.name}</p>
                        </div>

                        <div className='orderbigcustomerinfo orderbigcustomerinfostreet'>
                            <label className='orderbigcustomerinfolabel'>street</label>
                            <p>{this.state.customerinfo.street}</p>
                        </div>

                        <div className='orderbigcustomerinfo orderbigcustomerinforoom'>
                            <label className='orderbigcustomerinfolabel'>room</label>
                            <p>{this.state.customerinfo.room}</p>
                        </div>


                        <div className='orderbigcustomerinfo orderbigcustomerinfophone'>
                            <label className='orderbigcustomerinfolabel'>phone</label>
                            <p>{this.state.customerinfo.phone}</p>
                        </div>

                        <div className='orderbigcustomerinfo orderbigcustomerinfocustomeremail'>
                            <label className='orderbigcustomerinfolabel'>email</label>
                            <p>{this.state.customerinfo.customeremail}</p>
                        </div>
                    </div>


                    <div className='orderbigorderinfowrapper'>
                        <div className='orderbigshortdescription'>
                            <label>Short Description</label>
                            <p>{this.state.data.ordershort}</p>
                        </div>
                        <div className='orderbiglongdescription'>
                            <label>Detailed Description</label>
                            <p>{this.state.data.orderdescription}</p>
                        </div>


                    </div>



                </div>

                <div className='col-md-4 orderbigcenter'>
                    <OrderCommentContainer orderid={this.props.match.params.orderid} customerid={this.state.data.customerid} />



                </div>


            </div>
        )
    }
}

export default OrderBig;