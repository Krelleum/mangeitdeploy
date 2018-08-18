import  React, { Component } from 'react';
import './sidebar.css';
import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'

class SideBar extends Component {
    constructor(props){
        super(props);
        
    }

    static contextTypes = {
        router: PropTypes.object
    }

    logOut(){
        localStorage.clear();
        window.location.reload()
    }

// Redirect Handles Linking to different Pages via Sidebar
    redirectDashboard(){
        this.context.router.history.push(`/dashboard`)
    }

    redirectUser(){
        this.context.router.history.push(`/user`)
    }

    redirectOrder(){
        this.context.router.history.push(`/orders`)
    }

    redirectCustomer(){
        this.context.router.history.push('/customer')
    }

    redirectInbox() {
        this.context.router.history.push('/inbox')
    }


    render() {


        return (


            <div className="wrapper">

                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>M</h3>
                    </div>

                    <ul className="list-unstyled components">
                        
                        <li onClick={this.redirectDashboard.bind(this)}>
                            <a><i className="material-icons" >dashboard</i></a>
                        </li>

                        <li onClick={this.redirectOrder.bind(this)}>
                            <a><i className="material-icons" >assignment</i></a>
                        </li>


                        <li onClick={this.redirectUser.bind(this)}>
                            <a><i className="material-icons" >person</i></a>
                        </li>

                        

                        <li onClick={this.redirectCustomer.bind(this)}>
                            <a><i className="material-icons" >people</i></a>
                        </li>

                        <li onClick={this.redirectInbox.bind(this)}>
                            <a><i className="material-icons" >inbox</i></a>
                        </li>

                       
                   
                        <li onClick={this.logOut.bind(this)}>
                            <a><i className="material-icons">power_settings_new</i></a>
                        </li>

                    </ul>

                    
                </nav>
            </div>
        )


    }


}

export default SideBar