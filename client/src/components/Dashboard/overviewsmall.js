import React, { Component } from 'react';

class OverViewSmall extends Component{
    constructor(props){
        super(props);
    }





renderResult(){
    
    let data = this.props.data;
    
    for(let i = 0; i <= data.length; i++){
        

       
            return data[i].orderheading
        
        
            
        
    }
}



render(){
    return(
        <div>
        <p>Hello</p>
        {this.renderResult()}
        </div>
    )
}



}

export default OverViewSmall;