//---------Declaration-------//
import React, {Component} from 'react';
import {Utility} from '../../../shared/utility.js';

//Css Module import
import CSSModules from 'react-css-modules';
import styles from './home.module.css';

// Component Import
import NewsCard from '../../components/newsCard/newsCard.js';
import MembersCard from '../../components/membersCard/membersCard.js';
import ContactInfo from '../contactInfo/contactInfo.js';

class Home extends Component{
    
    componentDidMount()
    {
        Utility.AdjustFullHeight(this.refs.websiteContent);
        Utility.AdjustFullHeight(this.refs.banner);
    }
    
    render(){
    return( 
        <div id={styles.websiteContent} ref="websiteContent">
            <div styleName='banner' ref="banner">
                <video styleName="bannerVideo" autoPlay muted loop>
                    <source src="/sjlm.mp4" type="video/mp4">
                    </source>
                </video>
                <div styleName='bannerContent'>
                    <h1 styleName='bannerSlogan'>Bienvenue à Saint-Jacques-le-Mineur</h1>
                    <span styleName='bannerKeyword'>Accueillante</span>
                    <form styleName='bannerSearch'>
                        <input styleName='bannerInput' placeholder='Que recherchez-vous?' type='text' />
                        <button styleName="searchBtn"><i className='icon search'></i></button>
                    </form>
                </div>
            </div>
            <section styleName='news'>
                <div styleName='sectionTitle'>
                    <h1>Les Actualités</h1>
                </div>
                <div styleName='newsContent'>
                    <NewsCard history={this.props.history} />
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
                <ContactInfo />
            </section>
        </div>
        );
    }
}
export default CSSModules(Home, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});