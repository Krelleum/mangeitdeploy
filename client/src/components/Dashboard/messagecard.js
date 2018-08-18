import React, { Component } from 'react';
import axios from 'axios';


import getShift from '../classifier/getshift';

import './dashboard.css';
import PropTypes from 'prop-types'

class MessageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    static contextTypes = {
        router: PropTypes.object
    }




    componentDidMount() {
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



    redirectInbox() {
        this.context.router.history.push('/inbox')
       
    }



    render() {
       
       
       
        return (
            <div className='col-md-3 messagecard' onClick={this.redirectInbox.bind(this)}>
                <i className="material-icons" id='messagecardicon'>mail</i>
                <p>You've got</p>
                <h2>{this.state.data.messages && this.state.data.messages.length}</h2>
                <p>Messages</p>
                
            </div>
        )
    }
}

export default MessageCard;