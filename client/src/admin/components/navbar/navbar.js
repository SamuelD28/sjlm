import React from 'react';
import {NavLink} from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';

const Navbar = (props) =>{
    
    return(
     <ul styleName="navbar" >
        <li styleName="logoContainer">
            <NavLink to="/">
                <img  className="img-three-quarter" src="/logo2.png" alt="Logo" />
            </NavLink>
        </li>
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
            <NavLink styleName="navbarItem" to="/admin/pages">
                <span styleName="navbarIcon"><i className="icon copy"></i></span>
                <span href="#" styleName="navbarLink">Pages</span>
                <div styleName="navbarBorder"></div>
            </NavLink>
        </li>
        <li>
            <NavLink styleName="navbarItem" to="/admin/menus">
                <span styleName="navbarIcon"><i className="icon list"></i></span>
                <span href="#" styleName="navbarLink">Menus</span>
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
            <NavLink styleName="navbarItem" to="/admin/mails"> 
                <span styleName="navbarIcon"><i className="icon envelope"></i></span>
                <span styleName="navbarLink">Mail</span>
                <div styleName="navbarBorder"></div>
            </NavLink>
        </li>
        <li>
            <NavLink styleName="navbarItem" to="/admin/administrator"> 
                <span styleName="navbarIcon"><i className="icon chess queen"></i></span>
                <span styleName="navbarLink">Administrateur</span>
                <div styleName="navbarBorder"></div>
            </NavLink>
        </li>
    </ul>
    )
}

export default CSSModules(Navbar, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});