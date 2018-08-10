//---------Declaration-------//
import React, {Component} from 'react';
import Navbar from "../components/navbar/navbar.js";
import {Utility} from '../../shared/utility.js';
//Css Module import
import CSSModules from 'react-css-modules';
import styles from './index.module.css';
// Component Import
import NewsCard from '../components/newsCard/newsCard.js';
import MembersCard from '../components/membersCard/membersCard.js';

//----------Core Code-------//
class Index extends Component{
    //Life cycle methods
    componentDidMount()
    {
        let UI_HomeContent              = document.getElementById(styles.websiteContent),
            UI_Banner                   = document.querySelector("." + styles.banner);
        Utility.AdjustFullHeight(UI_Banner);
        Utility.AdjustFullHeight(UI_HomeContent);
    }
    
    render(){
    return( 
        <div id={styles.websiteContent}>
            <Navbar />
            <div styleName='banner'>
                <video styleName="bannerVideo" autoPlay muted loop>
                    <source src="/sjlm.mp4" type="video/mp4">
                    </source>
                </video>
                <div styleName='bannerContent'>
                    <h1 styleName='bannerSlogan'>Bienvenue à Saint-Jacques-le-Mineur</h1>
                    <span styleName='bannerKeyword'>Accueillante</span>
                    <form styleName='bannerSearch'>
                        <input styleName='bannerInput' placeholder='Que recherchez-vous?' type='text' />
                        <button><i className='icon search'></i></button>
                    </form>
                </div>
            </div>
            <section styleName='news'>
                <div styleName='sectionTitle'>
                    <h1>Les Actualités</h1>
                </div>
                <div styleName='newsContent'>
                    <NewsCard />
                </div>
            </section>
            <section styleName="members">
                <div styleName='sectionTitle'>
                    <h1>Le Conseil</h1>
                </div>
                <div styleName="membersContent">
                    <MembersCard />
                </div>
            </section>
            <section styleName="contact">
                <div styleName='sectionTitle'>
                    <h1>Nous Joindres</h1>
                </div>
                <div styleName="contactContent">
                    <div styleName="contactInfo">
                        <div>
                            <h2>Hôtel de Ville</h2>
                            <p>91 Rue Principale, <br />
                            Saint-Jacques-le-Mineur, <br /> 
                            QC J0J 1Z0 <br />
                            tél: (450) 347-5446
                            </p>
                        </div>
                        <div>
                            <h2>Horaire Régulier</h2>
                            <p>91 Rue Principale, <br />
                            Saint-Jacques-le-Mineur, <br />
                            QC J0J 1Z0 <br />
                            tél: (450) 347-5446
                            </p>
                        </div>
                        <div>
                            <h2>Horaire de Saison (du 7 mai au 7 octobre)</h2>
                            <p>Du Lundi au Jeudi, 8h à 16h00. <br />
                            Le Vendredi, 8h à 14h.
                            </p>
                        </div>
                    </div>
                    <form styleName="contactForm">
                        <input type="text" placeholder="Nom" styleName="firstNameInput"/>
                        <input type="text" placeholder="Prénom" styleName="lastNameInput"/>
                        <input type="email" placeholder="Adresse Courriel" styleName="emailInput"/>
                        <input type="tel" placeholder="Téléphone" styleName="phoneInput"/>
                        <select defaultValue="Sujet" styleName="subjectInput">
                            <option>Demande d'information</option>
                            <option>Commentaire et suggestion</option>
                            <option>Entretiens des rues</option>
                            <option>Aqueduc et egout</option>
                            <option>Plainte</option>
                            <option>Autre</option>
                        </select>
                        <textarea styleName="messageInput">Description</textarea>
                        <button className="btn"  styleName="send">Envoyer</button>
                    </form>
                </div>
            </section>
        </div>
        );
    }
}
export default CSSModules(Index, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});