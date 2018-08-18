import React, { Component } from 'react';
import '../inbox.css';

import axios from 'axios';
import ShowMessageSmall from './showmessagesmall';

class ShowMessageContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }





    componentDidMount(){
        const userid = localStorage.getItem('userid');

        axios({
            method: 'get',
            url: 'http://localhost:5000/inbox/getallmessages/' + userid,
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






    render() {
        
        var messages = this.state.data.messages
        
        
        
        return (
            <div className='col-md-6 showmessagecontainer'>
                <h2>Messages</h2>
                {messages&& messages.map((obj, index) => <ShowMessageSmall key={index} data={obj} />)}
            
            </div>
            
        )
    }


}

export default ShowMessageContainer;