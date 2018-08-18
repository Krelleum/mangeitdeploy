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
            <div className='col-md-2 createtimestampcard' onClick={this.patchTimeStamp.bind(this)}>
                <i className="material-icons" id='openordercardicon' >assignment_ind</i>
                
                <h2>Customer Interaction</h2>
                
            </div>
        )
    }
}

export default CreateTimeStampCard;