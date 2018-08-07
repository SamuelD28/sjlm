/*global fetch*/

import React, {Component} from 'react';

// Css Module Import
import CSSModules from 'react-css-modules';
import styles from './members.module.css';
import adminStyles from '../index.module.css';

// Component Import
import MembersCard from '../../components/membersCard/membersCard.js';

class Members extends Component{
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
    
    return(
    <div id={styles.membersPage} className={adminStyles.adminPage}> 
        <section styleName="membersSection">
            <div styleName="membersContent">
                <div styleName="membersCreate">
                    <div className="cardOverlay">
                        <div className="cardOverlayBtn">
                            <i className="fas fa-plus"></i>
                            <h4>Ajouter</h4>
                        </div>
                    </div>
                </div>
                
                <MembersCard members={this.state.members}/>
            </div>
        </section>
    </div>
    )
    }
}

export default CSSModules(Members, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});