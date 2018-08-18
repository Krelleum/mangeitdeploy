import React, { Component } from 'react';
import './helper.css';

class ErrorHelper extends Component {
    

    render() {
        return (
            <div className='col-md-12 errorwrapper'>
               
                <div className='error'>
                   <i className="erroricon material-icons">clear</i>
                </div>
                
                <div className='errormessage'>
                    <p>Error!</p>
                    <p>{this.props.errormessage}</p>
                </div>
                
            </div>
        )
    }
}

export default ErrorHelper;