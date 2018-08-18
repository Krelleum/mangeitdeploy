import React, { Component } from 'react';
import LogIn from './login';
import './logincontainer.css';
import SignUp from './signup';

class LoginContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: 'login'
        }
    }
    
    handleClickSignUp(){
        this.setState({
            show: 'signup'
        })
    }

    handleClickLogIn(){
        this.setState({
            show: 'login'
        })
        
    }

    toRender(){
        var toShow = this.state.show

        if(toShow === 'login'){
            return <LogIn/>
        }else if(toShow === 'signup'){
            return <SignUp/>
        }

    }
    
    
    
    
    
    
    render() {
        return (
            <div className='container logincontainer'>
                <div className='col-md-4 col-md-offset-3 logincontainerwrapper'>
                    
                    <div className='logincontainerheader'>
                        <h2>ManageIT</h2>
                    </div>
                    
                    <div className='logincontainerbuttons'>
                        
                    <div className='col-md-6 logincontainerloginbtn' onClick={this.handleClickLogIn.bind(this)}>
                            <p>Login</p>
                        </div>

                        <div className='col-md-6 logincontainersignupbtn' onClick={this.handleClickSignUp.bind(this)}>
                            <p>Sign Up</p>
                        </div>

                    </div>
                    <div className='loginsignupwrapper'>
                    {this.toRender()}
                    
                    </div>
                  

                </div>
            </div>

        )
    }
}

export default LoginContainer;