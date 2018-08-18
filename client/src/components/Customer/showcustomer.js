import React, { Component } from 'react';

import ShowCustomerSmall from './showcustomersmall';
import ShowCustomerInfo from './showcustomerinfo';

import axios from 'axios'

// AUF JEDEN FALL EINE DOC SCHREIBEN !!!!!
class ShowCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            customertoshow: 'init'
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:5000/customer/getallcustomer/',
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey'),
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

    setStateByChild(customerid) {
        this.setState({
            customertoshow: customerid
        })
    }



    renderCustomerInfo() {
        if (this.state.customertoshow && this.state.customertoshow !== 'init') {
            return <ShowCustomerInfo customerid={this.state.customertoshow} />
        }
        else {
            return null
        }
    }




    render() {

        let data = this.state.data;

        return (
            <div className='col-md-12 showcustomerwrapper'>
                <div className='col-md-2 showcustomername'>
                    <h2>Name</h2>
                    {data.map((obj, index) => <ShowCustomerSmall key={index} data={obj} setParent={this.setStateByChild.bind(this)} />)}
                </div>

                <div className='col-md-10 showcustomerinformation'>
                    <h2>Customerinformation</h2>
                    {this.renderCustomerInfo()}
                </div>
            </div>

        )
    }


}

export default ShowCustomer;