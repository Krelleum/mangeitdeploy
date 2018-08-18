import React, { Component } from 'react';
import '../inbox.css';

import axios from 'axios';

import SearchContact from './searchcontact';
import WriteMessage from './writemessage';


class WriteMessageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'init',
            username: 'init'
        }
    }




// State gets Updated by Input in SearchContact input field
updateStateByChild(e){
    this.setState({
        username: e.target.value
    }, this.getInboxId(this.state.username))
    
    
}

getInboxId(username){

    axios({
        method: 'get',
        url: 'http://localhost:5000/user/getuserbyname/' + username,
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


renderFoundUser(){
    if (this.state.data !== 'init' && this.state.data){
        return <div><div className='founduser'><p>{this.state.data.username}</p></div><WriteMessage receiverid={this.state.data.inboxid}/></div>
            
            
    }
    else{
        return <div className='founduser'><p>no user found</p></div>
    }
}




    render() {

        



        return (
            <div className='col-md-6 writemessagecontainer'>
              <h2>Write Message</h2>
              <SearchContact updateParentsState={this.updateStateByChild.bind(this)}/>
                <div className='col-md-12 founduserwrapper'>
                    {this.renderFoundUser()}
                </div>
            </div>

        )
    }


}

export default WriteMessageContainer;