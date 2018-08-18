import React, { Component } from 'react';

class SuccessHelper extends Component{
   

    render(){
        return (
            <div className='col-md-12 successwrapper'>
                <div className='success'>
                    
                    <i className="successicon material-icons">done_outline</i>
                </div>
                
                <div className='successmessage'>
                    <p>Success!</p>
                    <p>{this.props.successmessage}</p>
                </div>
            
            </div>
        )
    }
}

export default SuccessHelper;