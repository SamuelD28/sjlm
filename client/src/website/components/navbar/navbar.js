//---------Declaration-------//
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Ajax from '../../../shared/ajax.js';

import { Transition } from 'semantic-ui-react';

//Css module import.
import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = { SelectedMenuTitle: "", SelectedSubmenu: [], animationDelay: 25 };
        this.navbarSecondary = React.createRef();
        this.navbarPrimary = React.createRef();
    }

    componentDidMount = async() => {
        let request = await Ajax.GetData("/api/menus");
        let itemsVisible = [];
        request.data.map(() => {
            return itemsVisible.push(false);
        });
        this.setState({ menus: request.data, itemsVisible: itemsVisible });
        this.StartNextAnimation(0);
    }

    StartNextAnimation = (index) => {
        if (index < this.state.itemsVisible.length) {
            setTimeout(() => {
                let temp = Array.from(this.state.itemsVisible);
                temp[index] = true;
                this.setState({ itemsVisible: temp })
            }, this.state.animationDelay);
        }
    }

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
                        to={(menu.Link !== null)?menu.Link.Link: ""}
                        styleName="navbarItem primaryLink"
                        onMouseEnter={
                            (e) => {
                                this.MenusOver(e);
                                this.setState({SelectedMenuTitle: menu.Title,SelectedSubmenu: menu.SubMenu})
                            }
                        }
                        onClick={this.ScrollToTop}
                        >
                        <i styleName="navIcon" className={`icon large ${menu.Icon}`}></i>
                    </NavLink>
                </Transition>
            ));
        }
    }

    //Method that display the pages link based on the menu choosen
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

    //Method that create the page link that will be inserted in the menu
    CreatePageLink = (menu) => {
        return <NavLink to={(menu.Link !== null)?menu.Link.Link:""}
                        styleName="secondaryLink"
                        key={menu._id}
                        onClick={(e) =>{
                        this.HideMenuPages(e);
                        this.ScrollToTop();
                        }}>
                    {menu.Title}
                    <div styleName="cubeContainer">
                        <span styleName="secondaryCube"></span>
                    </div>
                </NavLink>
    }

    //Ui effect when the mouse leaves the menu
    MenusOut = (e) => {
        Array.from(this.navbarPrimary.current.childNodes).forEach((child) => {
            child.style.backgroundColor = "#f0eeed";
            child.style.color = "#37474F";
        });
    }

    //UI effect when the mouse enters the menu
    MenusOver = (e) => {
        this.MenusOut();
        e.target.style.backgroundColor = "#37474F";
        e.target.style.color = "whitesmoke";
    }

    //Method that hides the menu when the mouse leaves it
    HideMenuPages = () => {
        if (this.navbarSecondary.current !== null) {
            document.getElementById("backgroundOverlay").style.transform = "translateX(-100%)";
            this.navbarSecondary.current.style.transform = "translateX(-200px)";

            if (this.state.SelectedSubmenu.length > 0)
                this.setState({ SelectedMenuTitle: "", SelectedSubmenu: [] });
        }
    }

    ScrollToTop = () => {
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
                                onMouseLeave={() =>{
                                    this.HideMenuPages();
                                    this.MenusOut();
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
                                        onClick={(e) =>{
                                        this.HideMenuPages(e);
                                        this.ScrollToTop();
                                        }}>
                                        <img src="/logo2_left.png" styleName="img-logo" alt="sjlm logo"/>
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
