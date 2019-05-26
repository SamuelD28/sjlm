//---------Declaration-------//
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Ajax from '../../../shared/ajax.js';

import { Transition } from 'semantic-ui-react';

import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';

/**
 * Component used to navigate trough the website
 */
class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = { SelectedMenuTitle: "", SelectedSubmenu: [], animationDelay: 25, ClickedMenu: "" };
        this.navbarSecondary = React.createRef();
        this.navbarPrimary = React.createRef();
    }

    /**
     * We pull all the menus from the database
     */
    componentDidMount = async () => {
        let request = await Ajax.GetData("/api/menus");
        let itemsVisible = [];
        request.data.map(() => {
            return itemsVisible.push(false);
        });
        this.setState({ menus: request.data, itemsVisible: itemsVisible });
        //We start the animation chain for all the menu item
        this.StartNextAnimation(0);
    }

    /**
     * Method that waits for an animation to end before
     * starting a new one
     */
    StartNextAnimation = (index) => {
        if (index < this.state.itemsVisible.length) {
            setTimeout(() => {
                let temp = Array.from(this.state.itemsVisible);
                temp[index] = true;
                this.setState({ itemsVisible: temp })
            }, this.state.animationDelay);
        }
    }

    /**
     * Method that display all the principal menus
     */
    DisplayMenus = () => {
        if (this.state.menus !== undefined) {
            return this.state.menus.map((menu, index) => (
                <Transition
                    key={menu._id}
                    onComplete={() => this.StartNextAnimation(index + 1)}
                    duration={200}
                    visible={this.state.itemsVisible[index]}
                    animation="fade right"
                >
                    <NavLink
                        to={(menu.Link !== null && menu.Link !== undefined) ? menu.Link.Link : ""}
                        styleName="navbarItem primaryLink"
                        id={menu.Title}
                        exact
                        onMouseEnter={
                            (e) => {
                                this.MenusOver(e);
                                this.setState({ SelectedMenuTitle: menu.Title, SelectedSubmenu: menu.SubMenu })
                            }
                        }
                        onClick={this.SetClickedMenu}
                    >
                        <i styleName="navIcon" className={`icon large ${menu.Icon}`}></i>
                    </NavLink>
                </Transition>
            ));
        }
    }

    /**
     * Method that display all the submenu item from a principal
     * menu.
     */
    DisplaySubmenu = () => {
        if (this.state.SelectedSubmenu.length > 0) {
            document.getElementById("backgroundOverlay").style.transform = "translateX(0%)";
            this.navbarSecondary.current.style.transform = "translateX(100px)";
            return this.state.SelectedSubmenu.map((submenu) => (
                this.CreatePageLink(submenu)
            ))
        }
        else
            this.HideMenuPages();
    }

    /**
     * Method that create a page link for all the menu inside
     * a principal menu
     */
    CreatePageLink = (menu) => {
        if (!menu.Hide)
            return <div key={menu._id}>
                <NavLink
                    to={(menu.Link !== null && menu.Link !== undefined) ? menu.Link.Link : ""}
                    styleName="secondaryLink"
                    activeClassName="active-submenu"
                    exact
                    onClick={(e) => {
                        this.HideMenuPages(e);
                        this.SetClickedMenu();
                    }}>
                    {menu.Title}
                </NavLink>
            </div>
    }

    /**
     * Method that change the style of the
     * currently hovered menu.
     */
    MenusOver = (e) => {
        this.MouseExit();
        e.target.style.backgroundColor = "#37474F";
        e.target.style.color = "whitesmoke";
    }

    /**
     * Method that hide the menu when the user mouse
     * leave the section
     */
    HideMenuPages = () => {
        if (this.navbarSecondary.current !== null) {
            document.getElementById("backgroundOverlay").style.transform = "translateX(-100%)";
            this.navbarSecondary.current.style.transform = "translateX(-225px)";

            if (this.state.SelectedSubmenu.length > 0)
                this.setState({ SelectedMenuTitle: "", SelectedSubmenu: [] });
        }
    }


    /**
     * Method that remove the hover style from
     * the menu when the user mouse leaves it.
     */
    MouseExit = () => {
        Array.from(this.navbarPrimary.current.childNodes).forEach((child) => {
            if (child.id !== this.state.ClickedMenu) {
                child.style.backgroundColor = "#f0eeed";
                child.style.color = "#37474F";
            }
        });
    }

    /**
     * Method that set the clicked.
     */
    SetClickedMenu = async () => {

        await this.setState({ ClickedMenu: this.state.SelectedMenuTitle });
        this.MouseExit();

        if (this.state.SelectedMenuTitle !== "") {
            let menu = document.getElementById(this.state.ClickedMenu);
            menu.style.backgroundColor = "#37474F";
            menu.style.color = "whitesmoke";
        }

        //we reset the scroll position to be the top of the page
        window.scrollTo(0, 0);
    }

    render() {
        if (this.state.menus !== undefined)
            return <Transition
                transitionOnMount={true}
                duration={1000}
                animation="fade right">
                <div
                    id={styles.navbar}
                    className="fill-height"
                    onMouseLeave={() => {
                        this.MouseExit();
                        this.HideMenuPages();
                    }}>
                    <div id={styles.navbarSecondary} ref={this.navbarSecondary}>
                        <div styleName="navbarContentTitle">
                            {this.state.SelectedMenuTitle}
                        </div>
                        {this.DisplaySubmenu()}
                    </div>
                    <div id={styles.navbarPrimary} ref="navbarPrimary">
                        <NavLink
                            to="/"
                            styleName="navbarLogo"
                            onClick={(e) => {
                                this.HideMenuPages(e);
                                this.SetClickedMenu();
                            }}>
                            <img
                                src="https://res.cloudinary.com/dohwohspb/image/upload/v1548355113/images/website/logo2_left.png"
                                alt="sjlm logo" />
                        </NavLink>
                        <ul styleName="navbarContent" ref={this.navbarPrimary}>
                            {this.DisplayMenus()}
                        </ul>
                    </div>
                </div>
            </Transition>
    }
}

export default CSSModules(Navbar, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
