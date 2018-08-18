import React, { Component } from 'react';

import SideBar from './sidebar';

class SideBarContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            init: 'empty'
        }
    }



    render(){
        return(
            <SideBar></SideBar>
        )
    }
}

export default SideBarContainer;