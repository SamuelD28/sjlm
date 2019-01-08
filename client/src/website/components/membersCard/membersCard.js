import React from 'react';

// Css Module import
import CSSModules from 'react-css-modules';
import styles from "./membersCard.module.css";

const MembersCard = (props) =>{

    if(props.index % 2 ===0)
    return  <div styleName="membersCard">
                <div styleName="membersPhoto" className="img-bg" style={{backgroundImage: `url('${props.member.Photo}')`}}></div>
                <div styleName="membersInfo">
                    <div>
                        <h4 styleName="membersTitle">{props.member.Occupation.Title} {(props.member.Seat !== null)?`/ Siège ${props.member.Seat}`: ""}</h4>
                        <h1 styleName="membersName">{props.member.FirstName}  {props.member.LastName}</h1>
                    </div>
                    <p>{props.member.PersonnalNote}</p>
                    <div styleName="membersContact">
                        <div styleName="membersEmail">
                            <h3><i className="icon mail"></i> {props.member.Email}</h3>
                            <a href={`mailto:${props.member.Email}`}>Envoyer un message</a>
                        </div>
                        <div styleName="membersPhone">
                            <h3><i className="icon phone"></i> {props.member.Phone}</h3>
                        </div>
                    </div>
                </div>
            </div>
    else
    return  <div styleName="membersCardInverse">
                <div styleName="membersInfo">
                    <div>
                        <h4 styleName="membersTitle">{props.member.Occupation.Title} {(props.member.Seat !== null)?`/ Siège ${props.member.Seat}`: ""}</h4>
                        <h1 styleName="membersName">{props.member.FirstName}  {props.member.LastName}</h1>
                    </div>
                    <p>{props.member.PersonnalNote}</p>
                    <div styleName="membersContact">
                        <div styleName="membersEmail">
                            <h3><i className="icon mail"></i> {props.member.Email}</h3>
                            <a href={`mailto:${props.member.Email}`}>Envoyer un message</a>
                        </div>
                        <div styleName="membersPhone">
                            <h3><i className="icon phone"></i> {props.member.Phone}</h3>
                        </div>
                    </div>
                </div>
                <div styleName="membersPhoto" className="img-bg" style={{backgroundImage: `url('${props.member.Photo}')`}}></div>
            </div>

}

export default CSSModules(MembersCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});