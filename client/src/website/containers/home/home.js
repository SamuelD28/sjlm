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
                        <i className='icon search'></i>
                    </form>
                </div>
                <div styleName="newsSection">
                    <div styleName="newsContent">
                        <div styleName="newsCard">
                            <span styleName="newsDate"><i className="icon clock outline"></i> Le 2018-10-28</span>
                            <h1 styleName="newsTitle">Récolte Agricole de carotte</h1>
                            <button className="btn btn-sm btn-outline-primary">Lire la suite</button>
                        </div>
                        <div styleName="newsCard">
                            <span styleName="newsDate"><i className="icon clock outline"></i> Le 2018-10-28</span>
                            <h1 styleName="newsTitle">Récolte Agricole de carotte</h1>
                            <button className="btn btn-sm btn-outline-primary">Lire la suite</button>
                        </div>
                        <div styleName="newsCard">
                            <span styleName="newsDate"><i className="icon clock outline"></i> Le 2018-10-28</span>
                            <h1 styleName="newsTitle">Récolte Agricole de carotte</h1>
                            <button className="btn btn-sm btn-outline-primary">Lire la suite</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default CSSModules(Home, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});