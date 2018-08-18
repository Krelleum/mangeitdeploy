import React, { Component } from 'react';
import './showuser.css';

import ShowUserSmall from './showusersmall';
import ShowUserInfo from './showuserinfo';

import axios from 'axios'

// AUF JEDEN FALL EINE DOC SCHREIBEN !!!!!
class ShowUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            usertoshow: 'init'
        }
    }

componentDidMount(){
    axios({
        method: 'get',
        url: 'http://localhost:5000/user/getallusers/',
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

setStateByChild(userid){
    
    this.setState({
        usertoshow: userid
    })
}



renderUserInfo(){
    if(this.state.usertoshow && this.state.usertoshow !== 'init'){
        return <ShowUserInfo userid={this.state.usertoshow}/>
    }
    else
    {
        return <div className='nouseravaiable'><p>Please choose a User</p></div>
    }
}




    render() {

        let data = this.state.data;

        return (
        <div className='col-md-6 showuserwrapper'>
            <div className='col-md-3 showusername'>
                <h2>Username</h2>
                {data.map((obj, index) => <ShowUserSmall key={index} data={obj} setParent={this.setStateByChild.bind(this)}/>)}
            </div>

            <div className='col-md-5 showuserinformation'>
                <h2>Userinformation</h2>
                {this.renderUserInfo()}
            </div>
        </div>    

        )
    }


}

export default ShowUser;