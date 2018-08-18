import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ordersmall.css';




class OrderSmall extends Component{



    createTime() {

        if (this.props.data.timecreated) {

            let olddate = new Date(this.props.data.timecreated);
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


renderPriority(){
    let priority = this.props.data.orderpriority;

    if(priority === 'high'){
        return <div className='highpriority'><p>High</p></div>
    }
    else if(priority === 'low'){
        return <div className='lowpriority'><p>Low</p></div>
    }
    else{
        return null
    }
}

renderAppointment(){
    let appointment = this.props.data.ordertype;

    if(appointment === 'appointment'){
        return <div className='appointment'><i className="material-icons">event_available</i></div>
    }
    else if(appointment ==='noappointment'){
        return <div className='noappointment'><i className="material-icons">event_busy</i></div>
    }
    else{
        return null
    }
}





    render(){
        return (
            <Link to={`orderbig/${this.props.data.orderid}`}><div className='col-md-12 ordersmallwrapper' >
                
                <div className='ordersmallheading'>
                    <div className='ordersmallusername'>
                        
                        <p>{this.props.data.username}</p>
                    </div>
                    <div className='ordersmalltime'>
                        <p>{this.createTime()} ago</p>
                    </div>
                </div>
                
                <div className='col-md-10 ordersmallleft'>    
                    <div className='ordersmallbody'>
                        
                        <h5>{this.props.data.customername}</h5>
                        <p>{this.props.data.orderheading}</p>
                        
                    </div>
                </div>
                
                <div className='col-md-2 ordersmallright'>
                    <div className='prioritywrapper'>
                        {this.renderPriority()}
                    </div>
                    <div className='appointmentwrapper'>
                        {this.renderAppointment()}
                    </div>
                    


                </div>    
            </div>
            </Link>
        )
    }
}

export default OrderSmall;