import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import OverViewContainer from './overviewcontainer';


class DashBoardUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: 'init'
        }
    }



    render(){
        return(
            <div className='col-md-11 dashboarduserwrapper'>
            
            <div className='dashboarduserheading'>
                    <i className="material-icons" id='dashboardusericon' >home</i>
                <h2>Welcome {this.props.data.username}</h2>
                <p>{new Date().getHours()}:{new Date().getMinutes()}</p>
            </div>
            <div className='dashboardusertext'>
                <h3>Overview</h3>
                <p>See what's new and get all information you need.</p>
            </div>

            <OverViewContainer/>
            
            
        
            
            
            </div>
        )
    }

}

export default DashBoardUser;