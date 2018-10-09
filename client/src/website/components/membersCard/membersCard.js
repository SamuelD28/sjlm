import React, {Component} from 'react';
import {Ajax} from '../../../shared/utility.js';

// Css Module import
import CSSModules from 'react-css-modules';
import styles from "./membersCard.module.css";

class MembersCard extends Component{
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    
    async componentDidMount()
    {
        let members = await Ajax.GetData("/api/members");
        this.setState({members});
    }
    
    render(){
    if(this.state.members !== undefined)
    {
    return(
    this.state.members.map((item, index) =>(
    <div styleName="membersCard" key={index}>
        <div styleName="membersPhoto" className="img-bg" style={{backgroundImage: `url('/${item.Photo}')`}}></div>
        <div styleName="membersInfo">
            <h4 styleName="membersTitle">{item.Occupation}</h4>
            <h1 styleName="membersName">{item.FirstName}  {item.LastName}</h1>
        </div>
    </div>))
    )}
    }
}

export default CSSModules(MembersCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});