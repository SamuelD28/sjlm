//Initial Declaration and state initialisation
import React, {Component} from 'react';

class PagesCard extends Component{
    
    render(){
    return(
        <h4>{this.props.pages.PageTitle.toUpperCase()}</h4>
    )}
}

export default PagesCard;