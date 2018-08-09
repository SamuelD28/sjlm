//---------Declaration-------//
import React, {Component} from 'react';
import {Utility} from '../../../shared/utility.js';
//Css Module import
import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';

import {NavLink} from 'react-router-dom';

//----------Core Code-------//
class Navbar extends Component{
    componentDidMount()
    {
        let UI_SideNavBar   = document.getElementById(styles.navbar); 
        
        Utility.AdjustFullHeight(UI_SideNavBar);
    }
    
    render(){
    return(
    <div id={styles.navbar}>
        <ul styleName="navbar">
            <div styleName="logoContainer">
                    <img  className="img-three-quarter" src="/logo2.png" alt="Logo" />
            </div>
            <div styleName="navbarContainer">
                <li>
                    <NavLink styleName="navbarItem" to="/admin"> 
                        <span styleName="navbarIcon"><i className="icon home"></i></span>
                        <span href="#" styleName="navbarLink">Accueil</span>
                        <div styleName="navbarBorder"></div>
                    </NavLink>
                </li>
                <li>
                    <NavLink styleName="navbarItem" to="/admin/news">
                        <span styleName="navbarIcon"><i className="icon newspaper"></i></span>
                        <span href="#" styleName="navbarLink">Actualitées</span>
                        <div styleName="navbarBorder"></div>
                    </NavLink>
                </li>
                <li>
                    <a styleName="navbarItem" href="">
                        <span styleName="navbarIcon"><i className="icon calendar"></i></span>
                        <span href="#" styleName="navbarLink">Calendrier</span>
                        <div styleName="navbarBorder"></div>
                    </a>
                </li>
                <li>
                    <NavLink styleName="navbarItem" to="/admin/pages">
                        <span styleName="navbarIcon"><i className="icon copy"></i></span>
                        <span href="#" styleName="navbarLink">Pages</span>
                        <div styleName="navbarBorder"></div>
                    </NavLink>
                </li>
                <li>
                    <NavLink styleName="navbarItem" to="/admin/members">
                        <span styleName="navbarIcon"><i className="icon users"></i></span>
                        <span href="#" styleName="navbarLink">Membres</span>
                        <div styleName="navbarBorder"></div>
                    </NavLink>
                </li>
                <li>
                    <a styleName="navbarItem" href=""> 
                        <span styleName="navbarIcon"><i className="icon envelope"></i></span>
                        <span styleName="navbarLink">Mail</span>
                        <div styleName="navbarBorder"></div>
                    </a>
                </li>
                <li>
                    <a styleName="navbarItem" href="">
                        <span styleName="navbarIcon"><i className="icon cogs"></i></span>
                        <span href="#" styleName="navbarLink">Paramètres</span>
                        <div styleName="navbarBorder"></div>
                    </a>
                </li>
            </div>
        </ul>
    </div>
    )
    }
}

export default CSSModules(Navbar, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});