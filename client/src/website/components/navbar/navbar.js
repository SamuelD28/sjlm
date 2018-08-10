//---------Declaration-------//
import React, {Component} from "react";
import {Utility} from '../../../shared/utility.js';
//Css module import
import CSSModules from 'react-css-modules';
import styles from './navbar.module.css';

//----------Core Code-------//
class Navbar extends Component{
    //Life Cycle methods
    componentDidMount()
    {
        let UI_Navbar                   = document.getElementById(styles.navbar),
            UI_NavbarSecondary          = document.getElementById(styles.navbarSecondary),
            UI_PrimaryLinks             = Array.from(document.getElementsByClassName(styles.primaryLink)),
            UI_NavbarSecondaryContent   = Array.from(document.getElementsByClassName(styles.secondaryContent));
            
        UI_Navbar.addEventListener("mouseleave" , () => {
            this.HideSecondMenu(UI_NavbarSecondary, UI_PrimaryLinks)
            });
        UI_PrimaryLinks.forEach((element) =>{
            // element.addEventListener("mouseleave" , RemoveNavbarStyle);
            element.addEventListener("mouseenter" , (event) =>{
                this.DisplaySecondMenu(event, UI_NavbarSecondary, UI_NavbarSecondaryContent, UI_PrimaryLinks);
            });
        });
        Utility.AdjustFullHeight(UI_Navbar);    
    }
    
    //UI Ineractions Functions
    HideSecondMenu = function(UI_NavbarSecondary, UI_PrimaryLinks)
    {
        console.log("mouse left");
        UI_NavbarSecondary.style.transform = "translateX(0%)";
        this.ToggleNavbarLink(UI_PrimaryLinks);
    }
    
    DisplaySecondMenu =  function(event, UI_NavbarSecondary, UI_NavbarSecondaryContent, UI_PrimaryLinks)
    {
        UI_NavbarSecondary.style.transform = "translateX(100%)";
        
        let secondaryContent = UI_NavbarSecondaryContent.find(function(content){
            return content.getAttribute("id") === event.target.getAttribute("menu");
        });
        let navbarLink = UI_PrimaryLinks.find(function(navbar){
            return navbar.getAttribute("menu") === event.target.getAttribute("menu");
        });
        
        this.ToggleNavbarContent(UI_NavbarSecondaryContent, secondaryContent);
        
        this.ToggleNavbarLink(UI_PrimaryLinks, navbarLink);
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
    
    render(){
    return(
    <div id={styles.navbar}>
    <div id={styles.navbarSecondary}>
        <ul styleName="navbarContent secondaryContent" id="city">
            <li styleName="navbarContentTitle">Découvrir la ville</li>
            
            <li styleName="navbarItem secondaryLink">
                <a>Logo & Armoirie</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Histoire</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                 </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Une ville verte</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                 </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Développement commercial</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                 </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Artisans & Entreprises</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                 </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Organismes de la région</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                 </div>
            </li>
        </ul>
        <ul styleName="navbarContent secondaryContent" id="administration">
            <li styleName="navbarContentTitle">Administration</li>
            <li styleName="navbarItem secondaryLink">
                <a>Accès à l'information</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Règlements municipaux</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Conseil municipale</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Bottin</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
        </ul>
        <ul styleName="navbarContent secondaryContent" id="service">
            <li styleName="navbarContentTitle">Les Services</li>
            <li styleName="navbarItem secondaryLink">
                <a>Permis</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Éducation</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Prévention incendie</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Circulation et transport</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Réseaux d'eau potable</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Collecte de branches</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Vieux électroniques</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Matière résiduel+</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
        </ul>
        <ul styleName="navbarContent secondaryContent" id="culture">
            <li styleName="navbarContentTitle">Cultures et Loisirs
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Programmation des loisirs</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Bibliothèque</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Chalet des loisirs</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Location de salle</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Piste cyclabe</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Plateaux sportifs</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
        </ul>
        <ul styleName="navbarContent secondaryContent" id="finance">
            <li styleName="navbarContentTitle">Finances
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Budget annuel</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Taxes et évaluations foncières</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Contrats</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
        </ul>
        <ul styleName="navbarContent secondaryContent" id="news">
            <li styleName="navbarContentTitle">Actualités
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Séance du conseil</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Avis publics</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Procès-Verbaux</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Offres emplois</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Activités</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
            <li styleName="navbarItem secondaryLink">
                <a>Travaux routiers</a>
                <div styleName="cubeContainer">
                    <span styleName="secondaryCube"></span>
                </div>
            </li>
        </ul>
    </div>
        <div id={styles.navbarPrimary}>
            <div styleName="navbarLogo" style={{backgroundImage:'url(/logo2_bga.png'}}>
            </div>
            <ul styleName="navbarContent">
                <li styleName="navbarItem primaryLink" menu="city">
                    Découvrir la ville
                    <i className="icon large compass"></i>
                </li>
                <li styleName="navbarItem primaryLink" menu="administration">
                    Administration
                    <i className="icon large users"></i>
                </li>
                <li styleName="navbarItem primaryLink" menu="service">
                    Les Services
                    <i className="icon large book"></i>
                </li>
                <li styleName="navbarItem primaryLink" menu="culture">
                    Cultures et Loisirs
                    <i className="icon large futbol"></i>
                </li>
                <li styleName="navbarItem primaryLink" menu="finance">
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