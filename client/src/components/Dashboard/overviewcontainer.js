import React, { Component } from 'react';
import axios from 'axios';

import OverViewSmall from './overviewsmall';


class OverViewContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: 'init',
            
        }
    }



componentDidMount(){

    axios({
        method: 'get',
        url:'/order/getopenorders',
        header: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('tkey'),
        }
    })
    .then(response =>{
        this.setState({
            data: response.data
        })
    })
    .catch(err => {
        console.log(err);
    })


    

}










    render(){
        
        return (
            
            <div className='col-md-3'>
               <OverViewSmall data={this.state.data} />
                
            </div>
        )
    }
}


export default OverViewContainer;