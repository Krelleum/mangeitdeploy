import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import AppContainer from './components/AppContainer/AppContainer';
import LoginContainer from './components/Login/logincontainer';



class App extends Component {

constructor(props){
  super(props);
  this.state = {
    loginState: false,
  }
}

componentWillMount(){
  this.getLoginState()
}

getLoginState(){
  var token = localStorage.getItem('tkey');
  console.log(token);

  axios({
    method: 'post',
    url: 'http://localhost:5000/user/verify',
    headers:
      {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('tkey'),
      }
  })
    .then(response => {
      console.log(response.status)
      if(response.status === 200){
        this.setAuthorized();
        
      }
      else if(response.status === 401){
        this.setUnauthorized();
      }
    })
    .catch(err => {
      console.log(err)
      this.setUnauthorized();
    })
}


checkLogin(){
  
  if(this.state.loginState === true){
    return <AppContainer/>
  }
  else{
    return <LoginContainer/>
  }
}


setAuthorized(){
  this.setState({loginState: true})
}

setUnauthorized(){
  this.setState({loginState: false})
}

  render() {

    return (
      <div>{this.checkLogin()}</div>
      

    );
  }
}

export default App;
