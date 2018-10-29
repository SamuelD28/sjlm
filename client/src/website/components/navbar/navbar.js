//---------Declaration-------//
import React, {Component} from "react";
import {Utility, Ajax} from '../../../shared/utility.js';
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
        this.state = {};
        this.navbar = React.createRef();
        this.navbarSecondary = React.createRef();
    }
    
    async componentDidMount() {
        Utility.AdjustFullHeight(this.navbar.current);  
        let pages = await Ajax.GetData("/api/pages");
        let menus = this.ExtractMenus(pages);
        
        
        this.setState({pages, menus});
        this.ShownavbarBig();
    }
    
    ExtractMenus = (pages) => {
        let menus = new Set([]);
        if(pages !== undefined){
            pages.map((item, index)=>(
                menus.add(item.PageCategory)));
        }
        menus.add("contact");
        return Array.from(menus);
    }
    
    InsertPages = () => {
        if(this.state.menus !== undefined){
            return(
            this.state.menus.map((item, i)=> (
            <ul styleName="secondaryContent" id={item} key={i}>
                <li styleName="navbarContentTitle">{Utility.TranslatePageCategory(item)}
                </li>
                {this.FindPagesByMenu(item)}
            </ul>
            )))
        }
    }
    
    FindPagesByMenu = (menu)  =>{
        return(
        this.state.pages.filter((item)=> item.PageCategory === menu).map((item, index) =>
        (
            <NavLink to={`/static/${item._id}`} styleName="secondaryLink" key={item._id} onClick={this.HideMenuPages}>
                {item.PageTitle}
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </NavLink>
        )));
    }
    
    InsertMenus = () => {
        if(this.state.menus !== undefined){
        return this.state.menus.map((item, index) => (
        <li styleName="navbarItem" 
            onMouseEnter={this.DisplayMenuPages} 
            menu={item}>
            <span className="navbarBig">{Utility.TranslatePageCategory(item)}</span>
            {this.InsertMenuIcon(item)}
        </li>
        ))
        }
    }
    
    InsertMenuIcon = (menu) => {
        switch(menu){
            case "city": return(<i styleName="navIcon" className="icon large compass"></i>);
            case "administration": return(<i styleName="navIcon" className="icon large users"></i>);
            case "services": return(<i styleName="navIcon" className="icon large book"></i>);
            case "cultures": return(<i styleName="navIcon" className="icon large futbol"></i>);
            case "finances": return(<i styleName="navIcon" className="icon large balance scale"></i>);
            case "news": return(<i styleName="navIcon" className="icon large newspaper"></i>);
            case "contact": return(<i styleName="navIcon" className="icon large mail"></i>);
            default: return(<i styleName="navIcon" className="icon large compass"></i>) ;
        }
    }
    
    MenusOut = (menu) =>
    {
        menu.style.backgroundColor = "#f0eeed";
        menu.style.color = "#37474F";
    }
    
    MenusOver = (menu) =>
    {
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
    
    ShowNewsCategory = () =>{
        return(categoryNews.map((item, index)=>(
            <NavLink to={`/category/${item}`} styleName="secondaryLink" key={item} onClick={this.HideMenuPages}>
                {Utility.TranslateNewsCategory(item)}
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </NavLink>
        )))
    }    
    
    ShownavbarBig = () => {
        if(this.props.navbarLite)
        {
            document.querySelectorAll(".navbarBig").forEach((element)=> {
                element.style.display = "none";
            });
        }
    }
    
    render(){
    return(
    <div 
        id={styles.navbar} 
        ref={this.navbar}
        onMouseLeave={this.HideMenuPages}>
        <div id={styles.navbarSecondary} ref={this.navbarSecondary}>
            {this.InsertPages()}
            <ul styleName="secondaryContent" id="news">
                <li styleName="navbarContentTitle">Actualités
                </li>
                {this.ShowNewsCategory()}
            </ul>
        </div>
        <div id={styles.navbarPrimary} ref="navbarPrimary">
            <NavLink to="/" styleName="navbarLogo">
                <img src="/logo2_left.png" styleName="img-logo" />
            </NavLink>
            <ul styleName="navbarContent">
                <li styleName="navbarItem" onMouseEnter={this.DisplayMenuPages} menu="news">
                    <span className="navbarBig">Actualites</span>
                    {this.InsertMenuIcon("news")}
                </li>
                {this.InsertMenus()}
            </ul>
        </div>
    </div>
    )
    }
}

export default CSSModules(Navbar, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});