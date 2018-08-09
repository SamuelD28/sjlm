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

//This components holds the state for all the other components to interact with. Function are created here to give services to other components
class News extends Component{
    
    //We initialise a tempState here. Everytime we want to update the state we first update the tempstate.
    constructor(props)
    {
        super(props);
        this.state = {};
        this.tempState= {};
        this.AppendToTempState = this.AppendToTempState.bind(this);
        this.UpdateTempState = this.UpdateTempState.bind(this);
        this.RemoveFromTempState = this.RemoveFromTempState.bind(this);
    }

    //Creates a get request to the server to initiliase the state with data.
    async componentDidMount()
    {
        //GERER LE CAS OU AUCUNE ACTUALITER EST DANS LA BASE DE DONNER
        
        let news = await Ajax.GetData("/api/news"); 
        this.tempState = {news: news.slice()};
        this.setState(this.tempState);
    }

    //Function that push a new object to the tempState array.
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
    
    //Function that removes an object from the tempState array.
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
    
    //Function that updates an object in the tempstate array.
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

    //Function that display an array for every news card hold in the tempstate array.
    DisplayNewsCard()
    {
        if(this.tempState.news !== undefined){
            //BUG WITH SORTING OF THE ARRAY. IT BREAKS PAST 10 ELEMENTS
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