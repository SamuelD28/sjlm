import React from 'react';
// import {NavLink} from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './headbar.module.css';
import Ajax from '../../../shared/ajax.js';
import { Route } from 'react-router-dom'

async function Logout(history){
    let user = await Ajax.GetData("/api/user/logout");

    if(user.success)
        history.push('/login');
}

const Headbar = (props) =>{

    return(
    <div styleName="headbar">
        <div styleName="userInfo">
            <h3>{props.user.firstName} {props.user.lastName}</h3>
            <Route render={({ history}) => (
                <button className="btn btn-xs btn-outline-danger" onClick={() => { Logout(history) }}> Déconnexion</button>)} >
            </Route>
        </div>
    </div>
    )
}

export default CSSModules(Headbar, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});