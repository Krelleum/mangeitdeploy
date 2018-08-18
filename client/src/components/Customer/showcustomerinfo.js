import React, { Component } from 'react';
import './showcustomer.css';
import axios from 'axios';


// AUF JEDEN FALL EINE DOC SCHREIBEN !!!!!
class ShowUserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    

    componentDidMount() {
        axios({
            method: 'get',
            url: 'http://localhost:5000/customer/findcustomerid/' + this.props.customerid,
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


    componentDidUpdate() {
        axios({
            method: 'get',
            url: 'http://localhost:5000/customer/findcustomerid/' + this.props.customerid,
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

   






    render() {
        return (
            <div className='col-md-12 showcustomerinfo'>
              <div className='col-md-6 showcustomerinfoleft'>
                <div className='showcustomerinfoheader'>
                    <p>{this.state.data.name}</p>
                </div>
                <div className='showcustomerinfophone'>
                    <label>Phone</label>
                    <p>{this.state.data.phone}</p>
                </div>
                <div className='showcustomerinfostreet'>
                    <label>Street</label>
                    <p>{this.state.data.street}</p>
                </div>
                <div className='showcustomerinforoom'>
                    <label>Room</label>
                    <p>{this.state.data.room}</p>
                </div>
                <div className='showcustomerinfoemail'>
                    <label>Email</label>
                    <p>{this.state.data.customeremail}</p>
                </div>
               </div>
               <div className='col-md-6 showcustomerinforight'>
               
                   
               </div>

            </div>

        )
    }


}

export default ShowUserInfo;