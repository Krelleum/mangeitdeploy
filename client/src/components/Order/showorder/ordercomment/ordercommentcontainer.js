import React, { Component } from 'react';
import axios from 'axios';
import ShowComment from './showcomment';
import WriteComment from './writecomment';

import './ordercomment.css';

class OrderCommentContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        axios({
            method: 'get',
            url: 'http://localhost:5000/comment/getcommentbyorderid/' + this.props.orderid,
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey')
            }
        })
        .then(response => {
                this.setState({ data: response.data })
        })
        .catch(err => {
            console.log(err)
        })
    }




    render(){

        const data = this.state.data;
        const reverse = data.reverse();

        return(
            <div className='col-md-12 ordercommentcontainer'>
                <div className='ordercommentcontainerheading'>
                    <h2>Comments</h2>
                </div>
                <div className='showcomment'>
                    
                    {reverse.map((obj, index) => <ShowComment key={index} data={obj}/>)}
                
                
                
                </div>

            <div className='writecomment'>
                <WriteComment orderid={this.props.orderid} customerid={this.props.customerid}/>
            </div>
            
            
            
            
            
            
            </div>
        )
    }



}

export default OrderCommentContainer;