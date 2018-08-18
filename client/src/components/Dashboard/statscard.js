import React, { Component } from 'react';

import axios from 'axios';

import getShift from '../classifier/getshift';

import './dashboard.css';


class StatsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
           sum: 0
        }
    }


    componentWillMount() {
        

        axios({
            method: 'get',
            url: 'http://localhost:5000/timestamp/gettimestamp',
            header: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('tkey'),
            }
        })
            .then(response => {
                this.calculateSum(response.data)
                this.setState({
                    data: response.data
                })
                console.log(this.state.data)
                
            })
            .catch(err => {
                console.log(err)
            })

       
        

    }

    

    
    
    
getShift() {
    // create a current timestamp
    var date = new Date();
    var time = date.getHours();

    // Get the Current Weekday
    var day = date.getDay();
    var weekday = new Array(7);

    weekday[1] = 'mon';
    weekday[2] = 'tue';
    weekday[3] = 'wed';
    weekday[4] = 'thur';
    weekday[5] = 'fri';
    weekday[6] = 'sa';
    weekday[7] = 'sun';
    // Current Weekday
    var finalday = weekday[day];

    // Get Current Shift
    var shift;

    if (time >= 9 && time <= 13) {
        shift = 'first'
    }
    else if (time > 13 && time <= 16) {
        shift = 'second'
    }
    else if (time > 16 && time <= 19) {
        shift = 'third'
    }
    else {
        shift = 'out of shift'
    }



    // Produce Output
    var finalTimeStamp = finalday + shift
    
    return finalTimeStamp



}
    
    

 

    
 calculateSum(data){
    
    

    var shifts = [
        data.mofirst,
        data.mosecond,
        data.mothird,
        data.tuefirst,
        data.tuesecond,
        data.tuethird,
        data.wedfirst,
        data.wedsecond,
        data.wedthird,
        data.thurfirst,
        data.thursecond,
        data.thurthird,
        data.frifirst,
        data.frisecond,
        data.frithird,
    ]

    

    for(var i = 0; i < shifts.length; i++){
        
        this.setState({
            sum: this.state.sum + shifts[i]
        })
        
        
        
    }
    
    this.calculateScore(data)

    
       
    
}
   

calculateScore(data){
    
    var sum = this.state.sum;
    var shift = this.getShift();
    
    var shiftsum = data[shift];
    


    var average = sum / 15;

    var score = shiftsum * 100 / average; 

    var endscore = score - 100

    
    this.setState({
        score: Math.floor(endscore) + '%'
    })
   


}

   


    render() {
        return (
            <div className='col-md-2 statscard'>
                <p>Pred. Workloadlevel</p>
                <i className="material-icons" id='statscardicon' >trending_up</i>
                <h2>{this.state.score}</h2>
            </div>
        )
    }
}

export default StatsCard;