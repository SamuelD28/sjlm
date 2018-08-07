import React, {Component} from 'react';

// Css Module import
import CSSModules from 'react-css-modules';
import styles from "./membersCard.module.css";

class MembersCard extends Component{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.GetMembers = this.GetMembers.bind(this);
    }
    
    componentDidMount()
    {
        this.GetMembers();
    }
    
    //Methode dupliquer, a extraire dans un utilitaires
    GetMembers()
    {
        let Url = "/api/members";
        // let UI_LatestNewsContainer  = document.querySelector(".news-container");
        // let UI_EditNewsContainer    = document.getElementById("edit-news-container");
        return (fetch(Url)
        .then(res =>{
            if(res.status === 404 || res.status === 500)
                throw new Error("[-Server is unavailable at this moment-]");
            else
                return res.json();
        })
        .then(members =>{
            this.setState({members});
        })
        .catch(err =>{
            return(err);
        }));
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