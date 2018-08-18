import React, { Component } from 'react';

import './dashboard.css';
import DashBoardUser from './dashboarduser';
import OpenOrderCard from './openordercard';
import HighPriorityCard from './highprioritycard';
import MessageCard from './messagecard';
import CustomerCard from './customercard';
import CreateTimeStampCard from './createtimestampcard';
import StatsCard from './statscard';


import axios from 'axios';


class DashBoardContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: 'init',
            userid: localStorage.getItem('userid')
        }
    }



componentDidMount(){
    
    const userid = this.state.userid;
    
    axios({
        method: 'get',
        url: 'http://localhost:5000/user/getuserdata/' + userid,
        header: {
            'Content-Type' : 'application/json',
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


    

    render(){
        return(
            <div className='col-md-12 dashboardcontainer'>
            <h1>DASHBOARD</h1>
            
            <div className='row'>
                <DashBoardUser data={this.state.data}/>
                <OpenOrderCard/>
                <CustomerCard/>
                 
            </div>
            <div className='row row2'>
                    <HighPriorityCard />
                    <MessageCard/> 
                    <CreateTimeStampCard/>
                    <StatsCard/>
            </div>

          
            
            </div>
        )
    }


}

export default DashBoardContainer;