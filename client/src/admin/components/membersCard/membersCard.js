import React from 'react';

// Css Module Import
import CSSModules from 'react-css-modules';
import styles from './membersCard.module.css';

const MembersCard = (props) =>{
    return(
    <div styleName="membersCard">
        <div styleName="membersPhoto" className="img-bg" style={{backgroundImage: `url('${props.members.Photo}')`}}></div>
        <h1 styleName="membersName">{props.members.FirstName} {props.members.LastName}</h1>
        <h3 styleName="membersTitle">{props.members.Occupation}</h3>
        <p styleName="membersDesc">{props.members.PersonnalNote.substring(0, 100)}...</p>
    </div>
    )
}

export default CSSModules(MembersCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});