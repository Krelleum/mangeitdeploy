import React, { Component } from 'react';
import './orderform.css';

import axios from 'axios';

class OrderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foundcustomer: 'init',
            foundcustomerid: 'init',
            foundcustomername: 'init',

        }
    }


    handleInput(e) {
        e.preventDefault();
        console.log(this.state);
        var property = e.target.id;
        var value = e.target.value;

        this.setState({
            [property]: value
        })
    }

    handleClick() {
        if (this.state.foundcustomer === 'init' || this.state.foundcustomer === 'notfound') {
            this.createNewCustomer()
            window.location.reload()
        }
        else {
            this.createNewOrder(this.state.foundcustomerid, this.state.foundcustomername);
            window.location.reload()
        }
    }



    findCustomer() {
        // Searches for customer and stores Customer ID and Name in State 
        var customerToFind = this.state.searchcustomer

        axios({
            method: 'get',
            url: 'http://localhost:5000/customer/searchcustomer/' + customerToFind,
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey'),
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        foundcustomer: 'found',
                        foundcustomerid: response.data.customerid,
                        foundcustomername: response.data.name
                    });
                }
            })
            .catch(err => {
                this.setState({
                    foundcustomer: 'notfound'
                })
            })
    }





    renderFoundCustomer() {

        if (this.state.foundcustomer === 'found') {
            return (
                <div className='foundcustomer'>
                    <p>{this.state.foundcustomername}</p>
                </div>
            )
        }
        else if (this.state.foundcustomer === 'notfound') {
            return (
                <div className='foundcustomer'>
                    <p>No Customer Found!</p>
                </div>
            )
        }
        else if (this.state.foundcustomer === 'init') {
            return null
        }
    }







    createNewCustomer() {
        var body = {
            name: this.state.name,
            street: this.state.street,
            room: this.state.room,
            phone: this.state.phone,
            customeremail: this.state.customeremail,
            usercontact: localStorage.getItem('userid'),
        }

        axios({
            method: 'post',
            url: 'http://localhost:5000/customer/createcustomer',
            data: body,
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey'),
            }
        })
            .then(response => {
                if (response.status === 201) {
                    this.setState({
                        createdcustomerid: response.data.customerid
                    })
                    this.createNewOrder(response.data.customerid, body.name);
                }
            })
            .catch(err => {
                alert('error')
            })
    }




    createNewOrder(customerid, customername) {
        let body = {
            ordertype: this.state.ordertype,
            orderheading: this.state.orderheading,
            ordershort: this.state.ordershort,
            orderdescription: this.state.orderdescription,
            orderpriority: this.state.orderpriority,
            userid: localStorage.getItem('userid'),
            username: localStorage.getItem('username'),
            customerid: customerid,
            customername: customername,

        }
        axios({
            method: 'post',
            url: 'http://localhost:5000/order/createorder',
            data: body,
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey'),
            }
        })
            .then(response => {
                // pushes newly generated order id into Customers Orderid array

                if (response.status === 201) {
                    const newBody = {
                        orderid: response.data.orderid,
                        customerid: customerid,
                        userid: localStorage.getItem('userid'),
                    }

                    

                    axios({
                        method: 'patch',
                        url: 'http://localhost:5000/customer/addorder',
                        data: newBody,
                        header: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('tkey'),
                        }
                    })
                        .then(response => {
                            console.log(response)
                        })
                        .catch(err => {
                            console.log(err)
                        })

                    // pushes newly generated order id into Users Order id array 

                    
                    axios({
                        method: 'patch',
                        url: 'http://localhost:5000/user/createdorders',
                        data: newBody,
                        header: {
                            'Content-Type': 'application/json',
                            'Authorization': localStorage.getItem('tkey'),
                        }
                    })
                        .then(response => {
                            console.log(response)
                        })
                        .catch(err => {
                            console.log(err)
                        })



                }
            })
            .catch(err => {
                alert('error')
            })
    }










    render() {
        return (
            <div className='col-md-12 orderformwrapper'>
                <div className='orderformheading'>
                    <h2>Create Order</h2>
                </div>

                <div className='orderform'>

                    <div className='orderformcustomersearch'>
                        <input type='text' id='searchcustomer' placeholder='Find Customer' onChange={this.handleInput.bind(this)}></input>
                        <button onClick={this.findCustomer.bind(this)}>Search</button>
                        <div className='orderformfoundcustomer'>
                            {this.renderFoundCustomer()}
                        </div>
                    </div>


                    <div className='orderformcustomerinput'>
                        <h4>Customer Data</h4>
                        <input type='text' id='name' placeholder='Customername' onChange={this.handleInput.bind(this)}></input>
                        <input type='text' id='street' placeholder='Street' onChange={this.handleInput.bind(this)}></input>
                        <input type='text' id='room' placeholder='Room' onChange={this.handleInput.bind(this)}></input>
                        <input type='text' id='phone' placeholder='Phone' onChange={this.handleInput.bind(this)}></input>
                        <input type='text' id='customeremail' placeholder='Email' onChange={this.handleInput.bind(this)}></input>



                        <h4>Order Data</h4>
                        <div className='orderradio'>
                        <label htmlFor='ordertype' className='radiolabel'>Appointment</label>
                        <input type="radio" className='radiobutton' id='ordertype' value="appointment" onChange={this.handleInput.bind(this)}></input>
                        </div>
                        <div className='orderradio'>  
                        <label htmlFor='orderpriority' className='radiolabel'>High Priority</label>
                        <input type="radio" className='radiobutton' id='orderpriority' value="high" onChange={this.handleInput.bind(this)}></input>
                        </div>
                        <input type='text' id='orderheading' placeholder='Titel' onChange={this.handleInput.bind(this)}></input>
                        <input type='text' id='ordershort' placeholder='Shortdescription' onChange={this.handleInput.bind(this)}></input>
                        <textarea id='orderdescription' placeholder='Detailed description' onChange={this.handleInput.bind(this)}></textarea>
                        <button onClick={this.handleClick.bind(this)}>Create Order</button>
                    </div>
                </div>

            </div>
        )
    }


}


export default OrderForm;