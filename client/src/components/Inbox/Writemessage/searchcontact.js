import React, { Component } from 'react';
import '../inbox.css';

import axios from 'axios';


class SearchContact extends Component {
    constructor(props) {
        super(props);
       this.state = {

       }
    }










    render() {





        return (
            <div className='col-md-12 searchcontact'>
                <h2>Search Contact</h2>
                <input onChange={this.props.updateParentsState} placeholder='Search Contact'></input>

            </div>

        )
    }


}

export default SearchContact;