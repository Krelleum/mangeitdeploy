import React, { Component } from 'react';
import axios from 'axios';

import './dashboard.css';
import getShift from '../classifier/getshift';

class CreateTimeStampCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shift: 'init'
        }
    }


componentDidMount(){
    var shift = getShift()
    
    this.setState({
        shift: shift
    })
    
}
    
   


    patchTimeStamp() {
        alert(this.state.shift)
        if(this.state.shift !== 'init'){
            axios({
                method: 'patch',
                url: 'http://localhost:5000/timestamp/patchtimestamp/' + this.state.shift,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('tkey')
                }
            })
                .then(response => {

                    console.log(response)
                })
                .catch(err => {
                    console.log(err)
                })

        }
        else{
            alert('error')
        }

        
    }


 


    render() {
        return (
            <div className='col-md-2 createtimestampcard dashcard' onClick={this.patchTimeStamp.bind(this)}>
                <div className='cardfield'>
                    <h2>CI</h2>
                </div>
                <i className="material-icons" id='openordercardicon' >assignment_ind</i>
                
                <div className='cardtext'>
                    <h3>Customer Interaction</h3>
                    <p>Click here to register a new Customer Interaction</p>
                </div>
                
            </div>
        )
    }
}

export default CreateTimeStampCard;