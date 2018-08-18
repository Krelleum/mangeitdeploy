import React, { Component } from 'react';
import './showuser.css';

class ShowUserSmall extends Component {
    constructor(props){
        super(props);
        
    }






    render() {
        var userid = this.props.data.userid;
        return (
            <div className='col-md-12 showusersmall'>
                <p onClick={(userid) => this.props.setParent(this.props.data.userid)}>{this.props.data.username}</p>

            </div>

        )
    }


}

export default ShowUserSmall;