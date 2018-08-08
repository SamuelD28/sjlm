//--------Declaration---------//
import React, {Component} from 'react';
import {Ajax} from '../../../shared/utility.js';

// Css module improt
import CSSModules from 'react-css-modules';
import styles from './news.module.css';
import adminStyles from "../index.module.css";
//Components
import NewsCard from '../../components/newsCard/newsCard.js';
import NewsCreate from '../../components/newsCreate/newsCreate.js';
import NewsEdit from '../../components/newsEdit/newsEdit.js';

class News extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
        this.previousState = {};
        this.GetNewsData = Ajax.GetData.bind(this);
        this.UpdateNews = this.UpdateNews.bind(this);
        this.AddNewsToPreviousState = this.AddNewsToPreviousState.bind(this);
        this.UpdateNewsInPreviousState = this.UpdateNewsInPreviousState.bind(this);
    }

    async componentDidMount()
    {
        await this.GetNewsData("/api/news"); //Set the state with the retrieve data
        this.previousState = {data: this.state.data.slice()};
    }

    AddNewsToPreviousState(formData)
    {
        this.previousState.data.push(formData);
    }
    
    UpdateNewsInPreviousState(modifiedData)
    {
        let oldData = this.previousState.data.findIndex((element) => {return element._id === modifiedData._id});
        this.previousState.data[oldData] = modifiedData;
    }

    UpdateNews()
    {
        this.setState(this.previousState);
    }
    
    DisplayNewsCard()
    {
        return this.state.data.map((item,index)=> (
            <div className="cardContainer" key={index}> 
                <NewsCard news={item} UpdateNews={this.UpdateNews}/>
                <NewsEdit news={item} UpdateNews={this.UpdateNews} UpdateNewsInPreviousState={this.UpdateNewsInPreviousState}/>
            </div>
        ));
    }

    render(){
    if(this.state.data !== undefined)
    return(
    <div id={styles.newsPage} className={adminStyles.adminPage}> 
        <section className={adminStyles.sectionContainer} id="latestNews">
            <h4 className={adminStyles.sectionTitle}>Actualités Récentes</h4>
            <button className="btn btn-primary">Rechercher</button>
            <div className={adminStyles.sectionContent} styleName="newsContainer">
                <NewsCreate AddNewsToPreviousState={this.AddNewsToPreviousState} UpdateNews={this.UpdateNews}/>
                {this.DisplayNewsCard()}
            </div>
        </section>
    </div>
    )}
}

export default CSSModules(News, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});