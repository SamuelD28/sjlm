import React from 'react';
import { NavLink } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';
import Ajax from '../../../shared/ajax.js';

async function Logout(history) {
    let user = await Ajax.GetData("/api/user/logout");

    if (user.success)
        history.push('/login');
}

/**
 * Component responsible for displaying 
 * a navigation bar alongside links to 
 * navigate the administration section
 */
const Navbar = (props) => {

    return (
        <ul styleName="navbar" >
            <div>
                <li styleName="logoContainer">
                    <NavLink styleName="logo" to="/">
                        <img  src="/logo2.png" alt="Logo" />
                    </NavLink>
                </li>
                <li>
                    <NavLink styleName="navbarItem" to="/admin">
                        <span styleName="navbarIcon"><i className="icon th"></i></span>
                        <div styleName="navbarLink">Dashboard</div>
                        <div styleName="navbarBorder"></div>
                    </NavLink>
                </li>
                <li>
                    <NavLink styleName="navbarItem" to="/admin/news">
                        <span styleName="navbarIcon"><i className="icon newspaper"></i></span>
                        <div styleName="navbarLink">Publications</div>
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
                    <NavLink styleName="navbarItem" to="/admin/administrator">
                        <span styleName="navbarIcon"><i className="icon chess"></i></span>
                        <div styleName="navbarLink">Administrateur</div>
                        <div styleName="navbarBorder"></div>
                    </NavLink>
                </li>
            </div>
            <div>
                <li>
                    <span styleName="navbarItem logout" to="/admin/administrator" onClick={() => Logout(props.history)}>
                        <span styleName="navbarIcon"><i className="icon log out"></i></span>
                        <div styleName="navbarLink">Déconnexion</div>
                        <div styleName="navbarBorder"></div>
                    </span>
                </li>
            </div>
    </ul>
    )
}

export default CSSModules(Navbar, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
