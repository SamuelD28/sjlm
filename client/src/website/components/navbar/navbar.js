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
    
    //Method tha extract the menus from the pages. Will be extracted later on in his own api 
    ExtractMenus = (pages) => {
        let menus = new Set([]);
        if(pages !== undefined){
            pages.map((item, index)=>(
                menus.add(item.PageCategory)));
        }
        menus.add("news");
        menus.add("contact");
        return Array.from(menus);
    }
    
    //Method that groups the pages in a UL based on the menu they belong
    GroupPagesByMenu = () => {
        return this.menus.map((menu, i)=> (this.IsTherePagesForThisMenu(menu)))
    }
    
    IsTherePagesForThisMenu = (menu) => {
        let page = this.pages.find((page)=>{return page.PageCategory === menu});
        if(page !== undefined || menu === "news") //Hardcoded for the news section. Not Ideal
        return (
        <ul styleName="secondaryContent" id={menu} key={menu}>
            <li styleName="navbarContentTitle">{Utility.TranslatePageCategory(menu)}
            </li>
            {this.FindPagesByMenu(menu)}
        </ul>
        )
    }
    
    //Method that find the pages based on the menu
    FindPagesByMenu = (menu)  => {
        if(menu !== "news")
            return this.pages.filter((page)=> page.PageCategory === menu).map((page, index) =>(
                this.CreatePageLink(`/static/${page._id}`, page.PageTitle, index)
            ));
        else
            return categoryNews.map((category, index)=>( 
                this.CreatePageLink(`/category/${category}`, Utility.TranslateNewsCategory(category), index) 
            ));
    }
    
    //Method that create the page link that will be inserted in the menu
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
    
    //Method that insert the menu LI
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
    
    //Method used to display the right icon for the right menu. Will be extracted with the api later on
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
    
    //Ui effect when the mouse leaves the menu
    MenusOut = (menu) => {
        menu.style.backgroundColor = "#f0eeed";
        menu.style.color = "#37474F";
    }
    
    //UI effect when the mouse enters the menu
    MenusOver = (menu) => {
        menu.style.backgroundColor = "#37474F";
        menu.style.color = "whitesmoke";
    }
    
    //Method that display the pages link based on the menu choosen
    DisplayMenuPages = (e) => {
        document.querySelectorAll("." + styles.navbarItem).forEach((element)=>{this.MenusOut(element)});
        this.navbarSecondary.current.querySelectorAll("ul").forEach((element)=>{element.style.display = "none";})
        
        this.MenusOver(e.target);
        let menuPages = document.getElementById(e.target.getAttribute("menu"));
        if(menuPages !== null)
        {
            document.getElementById("backgroundOverlay").style.transform = "translateX(0%)";
            this.navbarSecondary.current.style.transform = "translateX(100px)";
            menuPages.style.display = "flex";
        }
        else{
            this.HideMenuPages();
            this.MenusOver(e.target);
        }
    }
    
    //Method that hides the menu when the mouse leaves it
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
            <NavLink to="/" styleName="navbarLogo" onClick={this.HideMenuPages}>
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