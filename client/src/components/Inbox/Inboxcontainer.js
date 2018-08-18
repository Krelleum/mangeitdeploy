import React, { Component } from 'react';
import './inbox.css';

import ShowMessageContainer from './Showmessage/showmessagecontainer';
import WriteMessageContainer from './Writemessage/writemessagecontainer';

class InboxContainer extends Component {



    render() {
        return (
            <div className='col-md-12 inboxcontainer'>
                <h1>INBOX</h1>
                <ShowMessageContainer/>
                <WriteMessageContainer/>
            </div>

        )
    }


}

export default InboxContainer;