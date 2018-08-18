import React, { Component } from 'react';
import axios from 'axios';

class WriteComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commenttext: 'init'
        }

    }


    handleInput(e){
        e.preventDefault();

        this.setState({
            commenttext: e.target.value
        })
        console.log(this.state)
    }

    handleClick(){
        
        if(this.state.commenttext !== 'init'){
            var body = {
                commenttext: this.state.commenttext,
                userid: localStorage.getItem('userid'),
                orderid: this.props.orderid,
                customerid: this.props.customerid,
                customername: this.props.customername,
                username: localStorage.getItem('username'),
                
            }

            axios({
                method: 'post',
                url: 'http://localhost:5000/comment/createcomment',
                data: body,
                header: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('tkey'),
                }
            })
                .then(response => {
                    if (response.status === 201) {
                        console.log(response)
                        window.location.reload()
                    }
                })
                .catch(err => {
                    alert('error')
                })
        }
    }
    

    patchOrder(){

    }



    render() {
        return (
            <div>
                <textarea id='commenttext' onChange={this.handleInput.bind(this)}></textarea>
                <button onClick={this.handleClick.bind(this)}>Save</button>
            </div>
        )
    }
}

export default WriteComment;