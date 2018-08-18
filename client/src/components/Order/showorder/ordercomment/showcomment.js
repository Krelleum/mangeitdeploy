import React, { Component } from 'react';
import './ordercomment.css';

class ShowComment extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className='commentsmallwrapper'>
                <div className='commentsmallusername'>
                <p>{this.props.data.username}</p>
                </div>
                
                <div className='commentsmalltext'>
                <p>{this.props.data.commenttext}</p>
                </div>
            </div>
        )
    }
}

export default ShowComment;