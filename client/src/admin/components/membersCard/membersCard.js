import React, {Component} from 'react';

// Css Module Import 
import CSSModules from 'react-css-modules';
import styles from './membersCard.module.css';

class MembersCard extends Component{
    // constructor(props)
    // {
    //     super(props);
    // }
    
    render(){
        if(this.props.members !== undefined){
        return(
        this.props.members.map((item,index)=>(
            <div styleName="membersCard">
                <div styleName="membersPhoto" className="img-bg" style={{backgroundImage: `url('/${item.Photo}')`}}></div>
                <h1 styleName="membersName">{item.FirstName} {item.LastName}</h1>
                <h3 styleName="membersTitle">{item.Occupation}</h3>
                <p styleName="membersDesc">{item.PersonnalNote.substring(0, 100)}...</p>
                
                <div className="cardOverlay cardEdit">
                    <div className="cardOverlayBtn">
                        <i className="fas fa-edit"></i>
                        <h4>Modifier</h4>
                    </div>
                </div>
            </div>
            ))
        )}
    }
}

export default CSSModules(MembersCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});