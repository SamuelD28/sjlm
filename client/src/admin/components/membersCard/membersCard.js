import React from 'react';

// Css Module Import
import CSSModules from 'react-css-modules';
import styles from './membersCard.module.css';

const MembersCard = (props) => {
    return (
    <div styleName="membersCard">
        <div styleName="membersPhoto" className="img-bg" style={{backgroundImage: `url('${props.members.Photo}')`}}></div>
        <div styleName="membersInfo">
            <h1 styleName="membersName">{props.members.FirstName} {props.members.LastName}</h1>
            <h3 styleName="membersTitle">{props.members.Occupation}</h3>
            <h5 styleName="membersTitle">{props.members.Phone}</h5>
            <h5 styleName="membersTitle">{props.members.Email}</h5>
        </div>
    </div>
    )
}

export default CSSModules(MembersCard, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
