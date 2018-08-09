//--------Declaration---------//
import React from 'react';
import CrudComponent from '../../../shared/CrudComponent.js';

// Css module improt
import CSSModules from 'react-css-modules';
import styles from './news.module.css';
import adminStyles from "../index.module.css";
//Components
import NewsCard from '../../components/newsCard/newsCard.js';
import NewsCreate from '../../components/newsCreate/newsCreate.js';
import NewsEdit from '../../components/newsEdit/newsEdit.js';

//This components holds the state for all the other components to interact with. Function are created here to give services to other components
class News extends CrudComponent{
    
    //Creates a get request to the server to initiliase the state with data.
    componentDidMount()
    {
        this.ReadInTempState("/api/news");
    }
    
    //Function that display an array for every news card hold in the tempstate array.
    DisplayNewsCard()
    {
        if(this.tempState.db !== undefined){
            //BUG WITH SORTING OF THE ARRAY. IT BREAKS PAST 10 ELEMENTS
            let array = this.tempState.db.slice().sort((a, b) => (b.Important === true));
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
                <NewsCreate CreateInTempState={this.CreateInTempState}/>
                {this.DisplayNewsCard()}
            </div>
        </section>
    </div>
    )}
}

export default CSSModules(News, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});