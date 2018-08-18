import React, { Component } from 'react';
import '../inbox.css';

import axios from 'axios';

class WriteMessage extends Component{
    constructor(props){
        super(props)
        this.state = {
            messagetext: 'init'
        }
    }






    handleChange(e){
        e.preventDefault();
        
        this.setState({
            messagetext: e.target.value
        })

    }

    handleSubmit(e){
        
        alert(this.props.receiverid)


        if (this.state.messagetext !== 'init' && this.props.receiverid){

            let username = localStorage.getItem('username');
            let userid = localStorage.getItem('userid');

            let body = {
                senderid: userid,
                sendername: username,
                messagetext: this.state.messagetext,
                inboxid: this.props.receiverid,
            }

            axios({
                method: 'patch',
                url: 'http://localhost:5000/inbox/sendmessage',
                data: body,
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('tkey'),
                }
            })
                .then(response => {
                    alert('message has been send')
                    console.log(response);

                })
                .catch(err => {
                    console.log(err)
                })
        }
        else{
            alert('Unable to Send Message - Make sure user has a Inbox ID')
        }

    }





    render(){
        return(
            <div className='col-md-12 writemessagewrapper'>
                <form>
                    <textarea className='writemessagefield' placeholder='Message' onChange={this.handleChange.bind(this)}></textarea>
                    <button  onClick={this.handleSubmit.bind(this)}>Send</button>

                </form>
            
            </div>
        )
    }
}


export default WriteMessage;