import React, { Component } from 'react';
import './showuser.css';

import ShowUser from './showuser';

class ShowUserContainer extends Component {



    render() {
        return (
            <div className='col-md-12 showusercontainer'>
                <h1>USER</h1>
                <ShowUser/>
            </div>
            
        )
    }


}

export default ShowUserContainer;