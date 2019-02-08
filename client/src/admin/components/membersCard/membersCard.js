import React from 'react';
import {Utility} from '../../../shared/utility.js';

// Css Module Import
import CSSModules from 'react-css-modules';
import styles from './membersCard.module.css';

/**
 * Component use for displaying information about a 
 * council member
 */
const MembersCard = (props) => {
    return (
    <div styleName="membersCard" className="anim-bounce-up">
        <img
        className="rounded-left"
        sizes="8vw"
        srcSet={Utility.ParseSourceSet(props.members.Photo[0])}
        styleName="membersPhoto"
        alt="membre" />
        <div styleName="membersInfo" className="component-card rounded-right">
            <h1 styleName="membersName">{props.members.FirstName} {props.members.LastName}</h1>
            <h3 styleName="membersTitle" className="tag-card rounded">{(props.members.Occupation !== null)?props.members.Occupation.Title: "Aucun poste assigné"}</h3>
            <h5 styleName="membersTitle">{props.members.Phone}</h5>
            <h5 styleName="membersTitle">{props.members.Email}</h5>
        </div>
    </div>
    )
}

export default CSSModules(MembersCard, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
