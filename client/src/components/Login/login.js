import React, { Component } from 'react';
import axios from 'axios';
import SuccessHelper from '../Helper/successhelper';
import ErrorHelper from '../Helper/errorhelper';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginuser: 'init',
            loginpassword: 'init',
            helper: 'none',
            helpermessage: 'none',
        }
    }

    // Transfers Input values into components State
    handleChange(e) {

        e.preventDefault();

        var property = e.target.id;
        var value = e.target.value;

        this.setState({
            [property]: value
        });
    }


    // Sends Components State Login Data to Server...
    handleClick() {


        var body = {
            username: this.state.loginuser,
            password: this.state.loginpassword,
        }

        axios({
            method: 'post',
            url: 'http://localhost:5000/user/login',
            data: body,
            header: { 'Content-Type': 'application/json' }
        })


            // If Login Data is valid Token gets transfered to LocalStorage 


            .then(response => {
                if (response.status === 200) {
                    console.log(response.data.message)
                    localStorage.setItem('tkey', response.data.token)
                    localStorage.setItem('username', this.state.loginuser)
                    localStorage.setItem('userid', response.data.userid)
                    this.setState({
                        helper: 'success',
                        helpermessage: 'Login was succesful!'
                    })
                    window.location.reload()
                }
                else {
                    
                    this.setState({
                        helper: 'error',
                        helpermessage: 'UNAUTHORIZED - WRONG USERNAME OR PASSWORD'
                    })
                }
            })


            .catch(err => {
                console.log(err);
                this.setState({
                    helper: 'error',
                    helpermessage: 'UNAUTHORIZED - WRONG USERNAME OR PASSWORD'
                })
            })
    }


    renderHelper(){
        var helperState = this.state.helper;

        if(helperState === 'none'){
            return null
        }else if(helperState === 'success'){
            return <SuccessHelper successmessage= {this.state.helpermessage}/>
        }else if(helperState === 'error'){
            return <ErrorHelper errormessage={this.state.helpermessage}/>
        }
    }




    render() {
        return (
            
                <div className='col-md-12 loginwrapper'>
                    <div className='loginheader'>
                        <p>Login</p>
                    </div>

                    <div className='loginform'>

                        <input id='loginuser' placeholder='Username' onChange={this.handleChange.bind(this)} ></input>
                        <input id='loginpassword' placeholder='Password' onChange={this.handleChange.bind(this)}></input>
                        <input type='submit' id='loginbutton' onClick={this.handleClick.bind(this)}></input>

                    </div>
                    <div className='loginfeedback'>
                        {this.renderHelper()}
                    </div>

                </div>
            
        )
    }
}


export default LogIn;