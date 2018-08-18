import React, { Component } from 'react';
import axios from 'axios';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signupuser: 'init',
            signuppassword: 'init',
            signupemail:'no Email',
            signupphone: 'no Phone',
        }
    }

    // Transfers Input values into components State
    handleChange(e) {

        e.preventDefault();
        console.log(this.state);
        var property = e.target.id;
        var value = e.target.value;

        this.setState({
            [property]: value
        });
    }


    // Sends Components State Login Data to Server...
    handleClick() {


        var body = {
            username: this.state.signupuser,
            password: this.state.signuppassword,
            useremail: this.state.signupemail,
            userphone: this.state.signupphone,
            
        }

        if(body.username !== 'init' && body.username.length >= 5 && body.password !== 'init' && body.password.length >= 5){

        

        axios({
            method: 'post',
            url: 'http://localhost:5000/user/signup',
            data: body,
            header: { 'Content-Type': 'application/json' }
        })


            // If Login Data is valid Token gets transfered to LocalStorage 


            .then(response => {
                if (response.status === 201) {
                    console.log('You succesfully Signed up - Please login')
                    this.createNewInbox(response.data.userid, response.data.username)

                }
                else if(response.status === 409){
                    alert('Signup failed - Username already taken')
                }
            })


            .catch(err => {
                console.log(err)
                alert('Error - Try again or contact Administrator')
            })
        }
        else{
            alert('Username and Password must at least have 5 Digits')
        }
    }



    createNewInbox(userId, username){
       
       const inboxBody = {
            userid: userId,
            ownername: username,
       }
       
        axios({
            method: 'post',
            url: 'http://localhost:5000/inbox/createinbox',
            data: inboxBody,
            header: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if(response.status === 201){
                console.log('New Inbox created Successfully')
                this.patchUserAccount(response.data.inboxid, inboxBody.userid)
            }
            
        })
        .catch(err => {
            console.log(err)
        })
    }


    patchUserAccount(inboxid, userid){
        
        const patchInboxId = {
            userid :userid,
            inboxid: inboxid
        }
        
        
        axios({
            method: 'patch',
            url: 'http://localhost:5000/user/patchuserinboxid',
            data: patchInboxId,
            header: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Inbox Id was patched')
                }

            })
            .catch(err => {
                console.log(err)
            })


    }



    render() {
        return (
            
                <div className='col-md-12 signupwrapper'>
                    <div className='signupheader'>
                        <p>Signup</p>
                    </div>

                    <div className='signupform'>

                        <input id='signupuser' placeholder='Username' onChange={this.handleChange.bind(this)} ></input>
                        <input id='signuppassword' placeholder='Password' onChange={this.handleChange.bind(this)}></input>
                        <input id='signupemail' placeholder='Email' onChange={this.handleChange.bind(this)}></input>
                        <input id='signupphone' placeholder='Phone Number' onChange={this.handleChange.bind(this)}></input>
                        <input type='submit' id='signupbutton' onClick={this.handleClick.bind(this)}></input>

                    </div>


                </div>
            
        )
    }
}


export default SignUp;