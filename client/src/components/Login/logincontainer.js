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
                <div className='col-md-6 col-md-offset-2 logincontainerwrapper'>
                    <div className='col-md-6 logincontainerleft'>
                    
                        <div className='logincontainerheader'>
                            <h2>ManageIT</h2>
                        </div>

                        <div className='logincontainertext'>
                            <p>The ManageIT Software helps you to manage your Teams orders and tasks easily. Just login or sign up! </p>
                        </div>



                       
                    
                    </div>


           



                    <div className='col-md-6 logincontainerright'>
                    
                        <div className='logincontainerbuttons'>

                            <div className='logincontainerloginbtn' onClick={this.handleClickLogIn.bind(this)}>
                                <p>Login</p>
                            </div>

                            <div className='logincontainersignupbtn' onClick={this.handleClickSignUp.bind(this)}>
                                <p>Sign Up</p>
                            </div>

                        </div>
                        <div className='loginsignupwrapper'>
                            {this.toRender()}

                        </div>
                    
                    
                    
                    </div>

                 
                  

                </div>
            </div>

        )
    }
}

export default LoginContainer;