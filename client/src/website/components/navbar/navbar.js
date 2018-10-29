//---------Declaration-------//
import React, {Component} from "react";
import {Utility} from '../../../shared/utility.js';
import {NavLink} from 'react-router-dom';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';

//This needs to be extracted in a separate api
let categoryNews = [
    "events",
    "activity",
    "communicate",
    "roadwork",
    "jobs",
    "public",
    "council",
    "verbal",
    "other"
    ];

//Optimisation is neccesary here****
//----------Core Code-------//
class Navbar extends Component{
    
    constructor(props)
    {
        super(props);
        this.menus = this.ExtractMenus(props.pages);
        this.pages = Object.create(props.pages);
        this.navbarSecondary = React.createRef();
    }
    
    ExtractMenus = (pages) => {
        let menus = new Set([]);
        if(pages !== undefined){
            pages.map((item, index)=>(
                menus.add(item.PageCategory)));
        }
        menus.add("contact");
        menus.add("news");
        return Array.from(menus);
    }
    
    GroupPagesByMenu = () => {
        return this.menus.map((menu, i)=> (
            <ul styleName="secondaryContent" id={menu} key={i}>
                <li styleName="navbarContentTitle">{Utility.TranslatePageCategory(menu)}
                </li>
                {this.FindPagesByMenu(menu)}
            </ul>
        ))
    }
    
    FindPagesByMenu = (menu)  =>{
        if(menu !== "news")
            return this.pages.filter((page)=> page.PageCategory === menu).map((page, index) =>(
                this.CreatePageLink(`/static/${page._id}`, page.PageTitle, index)
            ));
        else
            return categoryNews.map((category, index)=>( 
                this.CreatePageLink(`/category/${category}`, category, index) 
            ));
    }
    
    CreatePageLink = (urlPath, title, id) => {
        return (
        <NavLink to={urlPath} styleName="secondaryLink" key={id} onClick={this.HideMenuPages}>
            {title}
            <div styleName="cubeContainer">
                <span styleName="secondaryCube"></span>
            </div>
        </NavLink>
        )
    }
    
    InsertMenus = (menus) => {
        return this.menus.map((menu, index) => (
        <li styleName="navbarItem" 
            onMouseEnter={this.DisplayMenuPages} 
            menu={menu}
            key={index}>
            <i styleName="navIcon" className={`icon large ${this.InsertMenuIcon(menu)}`}></i>
        </li>
        ))
    }
    
    InsertMenuIcon = (menu) => {
        switch(menu){
            case "city": return "compass";
            case "administration": return "users";
            case "services": return "book";
            case "cultures": return "futbol";
            case "finances": return "balance scale";
            case "news": return "newspaper";
            case "contact": return "mail";
            default: return "question";
        }
    }
    
    MenusOut = (menu) => {
        menu.style.backgroundColor = "#f0eeed";
        menu.style.color = "#37474F";
    }
    
    MenusOver = (menu) => {
        menu.style.backgroundColor = "#37474F";
        menu.style.color = "whitesmoke";
    }
    
    DisplayMenuPages = (e) => {
        document.querySelectorAll("." + styles.navbarItem).forEach((element)=>{this.MenusOut(element)});
        this.MenusOver(e.target);
        this.navbarSecondary.current.style.transform = "translateX(100px)";
        this.navbarSecondary.current.querySelectorAll("ul").forEach((element)=>{element.style.display = "none";})
        document.getElementById("backgroundOverlay").style.transform = "translateX(0%)";
        document.getElementById(e.target.getAttribute("menu")).style.display = "flex";
    }
    
    HideMenuPages = () => {
        document.getElementById("backgroundOverlay").style.transform = "translateX(-100%)";
        document.querySelectorAll("." + styles.navbarItem).forEach((element)=>{this.MenusOut(element)});
        this.navbarSecondary.current.style.transform = "translateX(-200px)";
    }
    
    render(){
    return(
    <div 
        id={styles.navbar} 
        onMouseLeave={this.HideMenuPages}>
        <div id={styles.navbarSecondary} ref={this.navbarSecondary}>
            {this.GroupPagesByMenu()}
        </div>
        <div id={styles.navbarPrimary} ref="navbarPrimary">
            <NavLink to="/" styleName="navbarLogo">
                <img src="/logo2_left.png" styleName="img-logo" alt="sjlm logo"/>
            </NavLink>
            <ul styleName="navbarContent">
                {this.InsertMenus()}
            </ul>
        </div>
    </div>
    )
    }
}

export default CSSModules(Navbar, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});