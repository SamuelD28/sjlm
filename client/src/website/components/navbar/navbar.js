//---------Declaration-------//
import React, {Component} from "react";
import {Utility, Ajax} from '../../../shared/utility.js';
import {NavLink} from 'react-router-dom';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';

//----------Core Code-------//
class Navbar extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    
    HideSecondMenu = () =>
    {
        this.refs.navbarSecondary.style.transform = "translateX(0%)";
    }
    
    DisplaySecondMenu =  (event) =>
    {
        this.TogglePrimaryLinks(event);
        
        this.refs.navbarSecondary.style.transform = "translateX(100%)";
        
        let menuAttribute       = event.target.getAttribute("menu");
        let secondaryContent    = document.getElementById(menuAttribute);
        let allNavBarContent    = Array.from(document.getElementsByClassName(styles.secondaryContent));
        this.ToggleNavbarContent(allNavBarContent, secondaryContent);
    }
    
    TogglePrimaryLinks = (event) => {
        
        let primaryLinks = Array.from(document.querySelectorAll("." + styles.primaryLink));
        primaryLinks.forEach((element) => {
            element.style.backgroundColor = "#f0eeed";
            element.style.color = "#37474F";
        });
        
        event.target.style.backgroundColor = "#37474F";
        event.target.style.color = "white";
    }
    
    ToggleNavbarContent = (allNavarContent, singleNavbarContent) =>
    {
        try{
            Utility.IsValuesUndefinedOrNull(allNavarContent, singleNavbarContent);
            allNavarContent.forEach((element) => {
                element.style.display = "none"; 
            });
            
            if(singleNavbarContent !== undefined)
                singleNavbarContent.style.display = "flex";
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
    
    async componentDidMount()
    {
        Utility.AdjustFullHeight(this.refs.navbar);  
        let pages = await Ajax.GetData("/api/pages");
        this.setState({pages});
        
    }
   
    InsertInMenu()
    {
        let category = new Set([]);
        if(this.state.pages !== undefined){
            
            this.state.pages.map((item, index)=>(
            category.add(item.PageCategory)
            ));
            
            return(
            Array.from(category).map((item, i)=> (
            <ul styleName="navbarContent secondaryContent" ref="secondaryContent" id={item} key={i}>
                <li styleName="navbarContentTitle">{Utility.TranslatePageCategory(item)}
                </li>
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
    <div id={styles.navbar} onMouseLeave={this.HideSecondMenu} ref="navbar">
        <div id={styles.navbarSecondary} onMouseLeave={this.TogglePrimaryLinks} ref="navbarSecondary">
            {this.InsertInMenu()}
        </div>
        <div id={styles.navbarPrimary} ref="navbarPrimary">
            <NavLink to="/" styleName="navbarLogo">
                <div className="img-logo  img-bg" style={{backgroundImage:'url(/logo2_bga.png'}}>
                </div>
            </NavLink>
            <ul styleName="navbarContent">
                <li styleName="navbarItem primaryLink" onMouseEnter={this.DisplaySecondMenu} menu="city">
                    Découvrir la ville
                    <i className="icon large compass"></i>
                </li>
                <li styleName="navbarItem primaryLink" onMouseEnter={this.DisplaySecondMenu} menu="administration">
                    Administration
                    <i className="icon large users"></i>
                </li>
                <li styleName="navbarItem primaryLink" onMouseEnter={this.DisplaySecondMenu} menu="services">
                    Les Services
                    <i className="icon large book"></i>
                </li>
                <li styleName="navbarItem primaryLink" onMouseEnter={this.DisplaySecondMenu} menu="cultures">
                    Cultures et Loisirs
                    <i className="icon large futbol"></i>
                </li>
                <li styleName="navbarItem primaryLink" onMouseEnter={this.DisplaySecondMenu} menu="finances">
                    Finances
                    <i className="icon large balance scale"></i>
                </li>
                <li styleName="navbarItem primaryLink" onMouseEnter={this.DisplaySecondMenu} menu="news">
                    Actualités
                    <i className="icon large newspaper"></i>
                </li>
                <li styleName="navbarItem primaryLink" onMouseEnter={this.DisplaySecondMenu} menu="others">
                    Autres
                    <i className="icon large help"></i>
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