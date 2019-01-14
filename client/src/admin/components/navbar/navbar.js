import React from 'react';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';

const Navbar = (props) => {

    return (
        <ul styleName="navbar" >
        <li styleName="logoContainer">
            <NavLink styleName="logo" to="/">
                <img  src="/logo2.png" alt="Logo" />
            </NavLink>
        </li>
        <li>
            <NavLink styleName="navbarItem" to="/admin">
                <span styleName="navbarIcon"><i className="icon home"></i></span>
                <div styleName="navbarLink">Accueil</div>
                <div styleName="navbarBorder"></div>
            </NavLink>
        </li>
        <li>
            <NavLink styleName="navbarItem" to="/admin/news">
                <span styleName="navbarIcon"><i className="icon newspaper"></i></span>
                <div styleName="navbarLink">Actualitées</div>
                <div styleName="navbarBorder"></div>
            </NavLink>
        </li>
        <li>
            <NavLink styleName="navbarItem" to="/admin/verbal">
                <span styleName="navbarIcon"><i className="icon pencil"></i></span>
                <div styleName="navbarLink">Procès-Verbaux</div>
                <div styleName="navbarBorder"></div>
            </NavLink>
        </li>
        <li>
            <NavLink styleName="navbarItem" to="/admin/pages">
                <span styleName="navbarIcon"><i className="icon copy"></i></span>
                <div styleName="navbarLink">Pages</div>
                <div styleName="navbarBorder"></div>
            </NavLink>
        </li>
        <li>
            <NavLink styleName="navbarItem" to="/admin/members">
                <span styleName="navbarIcon"><i className="icon users"></i></span>
                <div styleName="navbarLink">Membres</div>
                <div styleName="navbarBorder"></div>
            </NavLink>
        </li>
        <li>
            <NavLink styleName="navbarItem" to="/admin/resources">
                <span styleName="navbarIcon"><i className="icon server"></i></span>
                <div styleName="navbarLink">Ressources</div>
                <div styleName="navbarBorder"></div>
            </NavLink>
        </li>
        <li>
            <NavLink styleName="navbarItem" to="/admin/mails">
                <span styleName="navbarIcon"><i className="icon envelope"></i></span>
                <div styleName="navbarLink">Mail</div>
                <div styleName="navbarBorder"></div>
            </NavLink>
        </li>
    </ul>
    )
}

export default CSSModules(Navbar, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
