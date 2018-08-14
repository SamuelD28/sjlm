//---------Declaration-------//
import React, {Component} from "react";
import {Utility, Ajax} from '../../../shared/utility.js';
import {NavLink} from 'react-router-dom';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';

const test = ` <NavLink to="/static" styleName="navbarItem secondaryLink">
            {item.PageTitle}
            <div styleName="cubeContainer">
                <span styleName="secondaryCube"></span>
            </div>
        </NavLink>`;

//----------Core Code-------//
class Navbar extends Component{
    
    //DOIT EXTRAIRE TOUTES CES METHODES
    HideSecondMenu = function(UI_NavbarSecondary, UI_PrimaryLinks)
    {
        
        UI_NavbarSecondary.style.transform = "translateX(0%)";
        this.ToggleNavbarLink(UI_PrimaryLinks);
    }
    
    DisplaySecondMenu =  function(event, UI_NavbarSecondary, UI_NavbarSecondaryContent, UI_PrimaryLinks)
    {
        UI_NavbarSecondary.style.transform = "translateX(100%)";
        
        let menuAttribute = event.target.getAttribute("menu");
        let secondaryContent = document.getElementById(menuAttribute);
        let allNavBarContent   = Array.from(document.getElementsByClassName(styles.secondaryContent));
        
        
        // let navbarLink = UI_PrimaryLinks.find(function(navbar){
        //     return navbar.getAttribute("menu") === event.target.getAttribute("menu");
        // });
        
        this.ToggleNavbarContent(allNavBarContent, secondaryContent);
        
        //used for the hover effect on primary link
        // this.ToggleNavbarLink(UI_PrimaryLinks, navbarLink);
    }
    
    ToggleNavbarLink = function(allNavbarLink, singleNavbarLink)
    {
        allNavbarLink.forEach((element) =>{
            element.style.backgroundColor = "transparent";
            element.style.color = "#37474F";
        })
        
        if(singleNavbarLink !== undefined)
        {
            singleNavbarLink.style.backgroundColor = "#37474F";
            singleNavbarLink.style.color = "white";
        }
    }
    
    ToggleNavbarContent = function(allNavarContent, singleNavbarContent)
    {
         allNavarContent.forEach((element) => {
            element.style.display = "none"; 
        });
        
        if(singleNavbarContent !== undefined)
        {
            singleNavbarContent.style.display = "flex";
        }
    }
    //DOIT EXTRAIRE TOUTES CES METHODES
    
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    
    //Life Cycle methods
    async componentDidMount()
    {
        //DOIT EXTRAIRE TOUTE CES METHODES
        let UI_Navbar                   = document.getElementById(styles.navbar),
            UI_NavbarSecondary          = document.getElementById(styles.navbarSecondary),
            UI_PrimaryLinks             = Array.from(document.getElementsByClassName(styles.primaryLink));
            
        UI_Navbar.addEventListener("mouseleave" , () => {
            this.HideSecondMenu(UI_NavbarSecondary, UI_PrimaryLinks)
            });
        UI_PrimaryLinks.forEach((element) =>{
            // element.addEventListener("mouseleave" , RemoveNavbarStyle);
            element.addEventListener("mouseenter" , (event) =>{
                this.DisplaySecondMenu(event, UI_NavbarSecondary, UI_PrimaryLinks);
            });
        });
        Utility.AdjustFullHeight(UI_Navbar);   
        //DOIT EXTRAIRE TOUTE CES METHODES
        
        let pages = await Ajax.GetData("/api/pages");
        this.setState({pages});
        
    }
   
    InsertInMenu()
    {
        let category = new Set([]);
        
        if(this.state.pages !== undefined){
            
            this.state.pages.map((item, index)=> {
            category.add(item.PageCategory);
            });
            
            return(
            Array.from(category).map((item, i)=> (
            <ul styleName="navbarContent secondaryContent" id={item} key={i}>
                <li styleName="navbarContentTitle">{item}</li>
                {this.FindPagesBasedOnCategory(item)}
            </ul>
            )))
        }
    }
    
    FindPagesBasedOnCategory(category)
    {
        return(
        this.state.pages.filter((item)=> item.PageCategory === category).map((item, index) =>(
        <NavLink to={`/static/${item._id}`} styleName="navbarItem secondaryLink" key={item._id}>
            {item.PageTitle}
            <div styleName="cubeContainer">
                <span styleName="secondaryCube"></span>
            </div>
        </NavLink>
        )));
    }
    
    render(){
    return(
    <div id={styles.navbar}>
    <div id={styles.navbarSecondary}>
            {this.InsertInMenu()}
    </div>
    <div id={styles.navbarPrimary}>
        <NavLink to="/" styleName="navbarLogo">
            <div className="img-bg" style={{backgroundImage:'url(/logo2_bga.png'}}>
            </div>
        </NavLink>
        <ul styleName="navbarContent">
            <li styleName="navbarItem primaryLink" menu="city">
                Découvrir la ville
                <i className="icon large compass"></i>
            </li>
            <li styleName="navbarItem primaryLink" menu="administration">
                Administration
                <i className="icon large users"></i>
            </li>
            <li styleName="navbarItem primaryLink" menu="services">
                Les Services
                <i className="icon large book"></i>
            </li>
            <li styleName="navbarItem primaryLink" menu="cultures">
                Cultures et Loisirs
                <i className="icon large futbol"></i>
            </li>
            <li styleName="navbarItem primaryLink" menu="finances">
                Finances
                <i className="icon large balance scale"></i>
            </li>
            <li styleName="navbarItem primaryLink" menu="news">
                Actualités
                <i className="icon large newspaper"></i>
            </li>
        </ul>
        <div styleName="navbarSocial">
            <h4 styleName="menuTitle">Suivez-nous !</h4>
            <div styleName="navbarSocialItems">
                <i styleName="navbarSocialItem" className="icon instagram"></i>
                <i styleName="navbarSocialItem" className="icon twitter square"></i>
                <i styleName="navbarSocialItem" className="icon facebook  square"></i>
            </div>
        </div>
    </div>
    </div>
    )
    }
}

export default CSSModules(Navbar, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});