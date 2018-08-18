import React, { Component } from 'react';
import './showuser.css';
import axios from 'axios';

// AUF JEDEN FALL EINE DOC SCHREIBEN !!!!!
class ShowUserInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }


componentDidUpdate(){
    axios({
        method: 'get',
        url: 'http://localhost:5000/user/getuserdata/' + this.props.userid,
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
    

componentWillReceiveProps(){
    axios({
        method: 'get',
        url: 'http://localhost:5000/user/getuserdata/' + this.props.userid,
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


    createTime() {

        if (this.state.data.timesignedup) {

            let olddate = new Date(this.state.data.timesignedup);
            let newdate = new Date();

            let oldmillisec = olddate.getTime();
            let newmillisec = newdate.getTime();
            let millisecresult = newmillisec - oldmillisec;

            var hours = (millisecresult / (1000 * 60 * 60)).toFixed(0);
            var minutes = (millisecresult / (1000 * 60)).toFixed(0);
            var days = (hours / 24).toFixed(0);

            if (hours < 1) {
                return minutes + ' Minutes';
            }
            else if (hours >= 24) {
                return days + ' Days'
            } else {
                return hours + ' Hours';
            }
        }
    }

    renderOrderCount(order){
        if (order) return order.length;
    }




    render() {
        return (
            <div className='col-md-12 showuserinfo'>
                <div className='showuserinfoheader'>
                    <p>{this.state.data.username}</p>
                </div>
                <div className='showuserinfophone'>
                    <label>Phone</label>
                    <p>{this.state.data.userphone}</p>
                </div>
                <div className='showuserinfoemail'>
                    <label>Email</label>
                    <p>{this.state.data.useremail}</p>
                </div>
                <div className='showuserinfotime'>
                    <label>Signed Up</label>
                    <p>{this.createTime()} ago</p>
                </div>

                <div className='showuserinfocreated'>
                    <label>Orders Created</label>
                    <p>{this.renderOrderCount(this.state.data.createdorders)}</p>
                </div>


                <div className='showuserinfofulfilled'>
                    <label>Orders Fulfilled</label>
                    <p>{this.renderOrderCount(this.state.data.fulfilledorders)}</p>
                </div>
                
            </div>

        )
    }


}

export default ShowUserInfo;