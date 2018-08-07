//-----------Declaration-------------//
import React, {Component} from 'react';
//Css Module import
import CSSModules from 'react-css-modules';
import styles from './home.module.css';
import generalStyle from '../index.module.css';

class Home extends Component{
    render(){
    return(
    <div id={styles.homePage} className={generalStyle.adminPage}>
        <section styleName="statistic" className={generalStyle.sectionContainer}>
            <h4 styleName="statTitle"><i className="fas fa-user"></i> Visiteurs Hebdomadaire</h4>
            <h1 styleName="statData">168</h1>
            <span styleName="statPourcentage decrease">-11%</span>
        </section>
        <section styleName="statistic" className={generalStyle.sectionContainer}>
            <h4 styleName="statTitle"><i className="fas fa-user"></i> Nombres D'utilisateurs</h4>
            <h1 styleName="statData">2500</h1>
            <span styleName="statPourcentage increase">+22%</span>
        </section>
        <section styleName="statistic" className={generalStyle.sectionContainer}>
            <h4 styleName="statTitle"><i className="fas fa-clock"></i> Temps de Chargement</h4>
            <h1 styleName="statData">1.82</h1>
            <span styleName="statPourcentage increase">+17%</span>
        </section>
        <section styleName="statistic" className={generalStyle.sectionContainer}>
            <h4 styleName="statTitle"><i className="fas fa-angry"></i> Nombre de Plainte</h4>
            <h1 styleName="statData">12</h1>
            <span styleName="statPourcentage decrease">-9%</span>
        </section>
        <section id={styles.maps} className={generalStyle.sectionContainer}>
            <h4  className={generalStyle.sectionTitle}>Charte du traffic</h4>
            <div className={generalStyle.sectionContent}></div>
        </section>
        <section id={styles.todos} className={generalStyle.sectionContainer}>
            <h4 className={generalStyle.sectionTitle}>Liste À Faire</h4>
            <a className={generalStyle.sectionBtn} href="">
                <button className="btn btn-blue float-right">Ajouter</button>
            </a>
            <ul className={generalStyle.sectionContent}>
                <li styleName="todoItem">
                    <input type="checkbox" />
                    <span>Remplir Formulaire Plainte</span>
                    <div>
                        <i className="far fa-clock"></i>
                        <span>6 Juillet</span>
                    </div>
                </li>
                <li styleName="todoItem">
                    <input type="checkbox" />
                    <span>Laver mon Chat</span>
                    <div>
                        <i className="far fa-clock"></i>
                        <span>12 Juillet</span>
                    </div>
                </li>
                <li styleName="todoItem">
                    <input type="checkbox" />
                    <span>Faire l'epicerie</span>
                    <div>
                        <i className="far fa-clock"></i>
                        <span>7 Juillet</span>
                    </div>
                </li>
                <li styleName="todoItem">
                    <input type="checkbox" />
                    <span>Completer le permis</span>
                    <div>
                        <i className="far fa-clock"></i>
                        <span>8 Juillet</span>
                    </div>
                </li>
            </ul>
        </section>
        <section id={styles.mails} className={generalStyle.sectionContainer}>
            <h4 className={generalStyle.sectionTitle}>Mail</h4>
            <a className={generalStyle.sectionBtn} href="">
                <button className="btn btn-blue float-right">Consulter</button>
            </a>
            <div className={generalStyle.sectionContent}>
                <div styleName="mailItem mailUnread">
                    <img styleName="mailAvatar" src="/avatar.jpg" alt="avatar"/>
                    <div styleName="mailInfo">
                        <span>John Doe</span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et mauris massa. Maecenas eget velit iaculis...</span>
                        <span styleName="mailTime"><i className="far fa-clock"></i> 5 minutes</span>
                    </div>
                </div>
                 <div styleName="mailItem">
                    <img styleName="mailAvatar" src="/avatar.jpg" alt="avatar"/>
                    <div styleName="mailInfo">
                        <span>John Doe</span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et mauris massa. Maecenas eget velit iaculis...</span>
                        <span styleName="mailTime"><i className="far fa-clock"></i> 8 minutes</span>
                    </div>
                </div>
                 <div styleName="mailItem">
                    <img styleName="mailAvatar" src="/avatar.jpg" alt="avatar"/>
                    <div styleName="mailInfo">
                        <span>John Doe</span>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et mauris massa. Maecenas eget velit iaculis...</span>
                        <span styleName="mailTime"><i className="far fa-clock"></i> 18 minutes</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
    )
    }
}

export default CSSModules(Home, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});