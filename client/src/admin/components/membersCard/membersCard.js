import React, {Component} from 'react';
import {Utility} from '../../../shared/utility.js';

// Css Module Import 
import CSSModules from 'react-css-modules';
import styles from './membersCard.module.css';

class MembersCard extends Component{
    
    DisplayPersonnalNote()
    {
        try{
            Utility.IsValuesUndefinedOrNull(this.props.members.PersonnalNote);
            return(
                <p styleName="membersDesc">{this.props.members.PersonnalNote.substring(0, 100)}...</p>
            )
        }
        catch(err){
            console.log(err.message);
        }
    }
    
    render(){
    return(
        <div styleName="membersCard">
            <div styleName="membersPhoto" className="img-bg" style={{backgroundImage: `url('/${this.props.members.Photo}')`}}></div>
            <h1 styleName="membersName">{this.props.members.FirstName} {this.props.members.LastName}</h1>
            <h3 styleName="membersTitle">{this.props.members.Occupation}</h3>
            {this.DisplayPersonnalNote()}
        </div>
        )
    }
}

export default CSSModules(MembersCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});