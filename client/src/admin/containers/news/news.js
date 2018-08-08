//--------Declaration---------//
import React, {Component} from 'react';
import {Ajax, Utility} from '../../../shared/utility.js';

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
        this.tempState= {};
        this.AppendToTempState = this.AppendToTempState.bind(this);
        this.UpdateTempState = this.UpdateTempState.bind(this);
        this.RemoveFromTempState = this.RemoveFromTempState.bind(this);
    }

    async componentDidMount()
    {
        //GERER LE CAS OU AUCUNE ACTUALITER EST DANS LA BASE DE DONNER
        
        let news = await Ajax.GetData("/api/news"); 
        
        this.tempState = {news: news.slice()};
        this.setState(this.tempState);
    }

    AppendToTempState(formData)
    {
        try{
            Utility.IsValuesUndefinedOrNull(formData, this.tempState.news);
            this.tempState.news.push(formData);
            this.setState(this.tempState);
        }
        catch(err){
            console.log(err.message);
        }
    }
    
    RemoveFromTempState(formData)
    {
        try{
            Utility.IsValuesUndefinedOrNull(formData, this.tempState.news);
            let indexToRemoveAt = this.tempState.news.findIndex((element) =>(element._id === formData._id));
            this.tempState.news.splice(indexToRemoveAt, 1);
            this.setState(this.tempState);
        }
        catch(err){
            console.log(err.message);
        }
    }
    
    UpdateTempState(modifiedData)
    {
        try{
            Utility.IsValuesUndefinedOrNull(this.tempState.news, modifiedData);
            let oldData = this.tempState.news.findIndex((element) => {return element._id === modifiedData._id});
            this.tempState.news[oldData] = modifiedData;
            this.setState(this.tempState);
        }
        catch(err){
            console.log(err.message);
        }
    }

    DisplayNewsCard()
    {
        if(this.tempState.news !== undefined){
            let array = this.tempState.news.slice().sort((a, b) => (b.Important === true));
            // array.sort((a, b) => b.DatePublished > a.DatePublished);
            // array.sort((a, b) => b.Important === true);
            
            return array.map((item,index)=> (
                <div className="cardContainer" key={item._id}> 
                    <NewsCard news={item} />
                    <NewsEdit news={item} UpdateTempState={this.UpdateTempState} RemoveFromTempState={this.RemoveFromTempState}/>
                </div>
            ));
        }
    }

    render(){
    return(
    <div id={styles.newsPage} className={adminStyles.adminPage}> 
        <section className={adminStyles.sectionContainer} id="latestNews">
            <h4 className={adminStyles.sectionTitle}>Actualités Récentes</h4>
            <button className="btn btn-primary">Rechercher</button>
            <div className={adminStyles.sectionContent} styleName="newsContainer">
                <NewsCreate AppendToTempState={this.AppendToTempState}/>
                {this.DisplayNewsCard()}
            </div>
        </section>
    </div>
    )}
}

export default CSSModules(News, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});