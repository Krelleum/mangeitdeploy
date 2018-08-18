import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashBoardUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: 'init'
        }
    }



    render(){
        return(
            <div className='col-md-4 dashboarduserwrapper'>
            
            <div className='dashboarduserheading'>
                    <i className="material-icons" id='dashboardusericon' >home</i>
                <h2>Welcome {this.props.data.username}</h2>
                <p>{new Date().getHours()}:{new Date().getMinutes()}</p>
            </div>
            
            
        
            
            
            </div>
        )
    }

}

export default DashBoardUser;