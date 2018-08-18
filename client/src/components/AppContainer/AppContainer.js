import React, { Component } from 'react';
import './appcontainer.css';

import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';

import DashBoardContainer from '../Dashboard/dashboardcontainer';
import ShowUserContainer from '../User/showusercontainer';
import SideBarContainer from '../Navigation/sidebarcontainer';
import OrdersContainer from '../Order/orderscontainer';
import OrderBig from '../Order/showorder/orderbig';
import ShowCustomerContainer from '../Customer/showcustomercontainer';
import InboxContainer from '../Inbox/inboxcontainer';


class AppContainer extends Component {


    render() {

        return (
            <div>
                <HashRouter>
                    <div>
                        
                        <SideBarContainer />
                        <Switch>
                        <Route exact path="/" component={DashBoardContainer} />
                        <Route path='/dashboard' component={DashBoardContainer}></Route>
                        <Route path='/user' component={ShowUserContainer}></Route>
                        <Route path='/orders' component={OrdersContainer}></Route>
                        <Route path='/customer' component={ShowCustomerContainer}></Route>
                        <Route path='/inbox' component={InboxContainer}></Route>
                        </Switch>
                        <Switch>
                        <Route path='/orderbig/:orderid' component={OrderBig} />
                        </Switch>
                       
                        
                        
                        
                        
                    </div>
                </HashRouter>

            </div>

        );
    }
}

export default AppContainer;