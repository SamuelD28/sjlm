//---------Declaration-------//
import React, {Component} from "react";
import {NavLink} from 'react-router-dom';
import Ajax from '../../../shared/ajax.js';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';

class Navbar extends Component{

    constructor(props)
    {
        super(props);
        this.state = {SelectedMenuTitle : "",SelectedSubmenu : []};
        this.navbarSecondary = React.createRef();
        this.navbarPrimary = React.createRef();
    }

    componentDidMount()
    {
        this.GetMenus();
    }

    GetMenus = async()=>
    {
        let request = await Ajax.GetData("/api/menus");
        this.setState({menus : request.data});
    }

    DisplayMenus = () =>
    {
        if(this.state.menus !== undefined)
        {
            return  this.state.menus.map((menu) => (
                    <NavLink
                        to={(menu.LinkTo !== undefined)?menu.LinkTo: "#"}
                        styleName="navbarItem primaryLink"
                        onMouseEnter={
                            (e) => {
                                this.MenusOver(e);
                                this.setState({SelectedMenuTitle: menu.Title,SelectedSubmenu: menu.SubMenu})
                            }
                        }
                        key={menu._id}>
                        <i styleName="navIcon" className={`icon large ${menu.Icon}`}></i>
                    </NavLink>));
        }
    }

    //Method that display the pages link based on the menu choosen
    DisplaySubmenu = () =>{
        if(this.state.SelectedSubmenu.length > 0)
        {
            document.getElementById("backgroundOverlay").style.transform = "translateX(0%)";
            this.navbarSecondary.current.style.transform = "translateX(100px)";
            return  this.state.SelectedSubmenu.map((submenu) =>(
                        this.CreatePageLink(submenu)
                    ))
        }
        else
            this.HideMenuPages();
    }

    //Method that create the page link that will be inserted in the menu
    CreatePageLink = (menu) => {
        return  <NavLink to={menu.LinkTo}
                    styleName="secondaryLink"
                    key={menu._id}
                    onClick={this.HideMenuPages}>
                    {menu.Title}
                    <div styleName="cubeContainer">
                        <span styleName="secondaryCube"></span>
                    </div>
                </NavLink>
    }

    //Ui effect when the mouse leaves the menu
    MenusOut = (e) => {
        Array.from(this.navbarPrimary.current.childNodes).forEach((child) =>{
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
        if(this.navbarSecondary.current !== null){
            document.getElementById("backgroundOverlay").style.transform = "translateX(-100%)";
            this.navbarSecondary.current.style.transform = "translateX(-200px)";

            if(this.state.SelectedSubmenu.length > 0)
                this.setState({SelectedMenuTitle : "",SelectedSubmenu : []});
        }
    }

    render(){
    if(this.state.menus !== undefined)
        return  <div
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
                        <NavLink to="/" styleName="navbarLogo" onClick={this.HideMenuPages}>
                            <img src="/logo2_left.png" styleName="img-logo" alt="sjlm logo"/>
                        </NavLink>
                        <ul styleName="navbarContent" ref={this.navbarPrimary}>
                            {this.DisplayMenus()}
                        </ul>
                    </div>
                </div>}
}

export default CSSModules(Navbar, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});