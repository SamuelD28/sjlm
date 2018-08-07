//--------Declaration---------//
import React, {Component} from 'react';
import {Utility} from "../../../shared/utility.js";

// Css module improt
import CSSModules from 'react-css-modules';
import styles from './news.module.css';
import adminStyles from "../index.module.css";
//Components
import NewsCard from '../../components/newsCard/newsCard.js';
import NewsCreate from '../../components/newsCreate/newsCreate.js';

class News extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render(){
    
    return(
    <div id={styles.newsPage} className={adminStyles.adminPage}> 
        <section className={adminStyles.sectionContainer} id="latestNews">
            <h4 className={adminStyles.sectionTitle}>Actualités Récentes</h4>
            <button className="btn btn-primary">Rechercher</button>
            <div className={adminStyles.sectionContent} styleName="newsContainer">
                <NewsCreate />
                <NewsCard news={this.state.news} />
            </div>
        </section>
    </div>
    )
    }
}

export default CSSModules(News, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});