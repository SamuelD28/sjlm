//--------Declaration---------//
import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';
import {Dropdown} from 'semantic-ui-react';

// Css module improt
import CSSModules from 'react-css-modules';
import styles from './news.module.css';
import adminStyles from "../index.module.css";
//Components
import NewsCard from '../../components/newsCard/newsCard.js';
import NewsCreate from '../../components/newsCreate/newsCreate.js';
import NewsEdit from '../../components/newsEdit/newsEdit.js';

let MonthOptions = [
  {
    text: "Janvier",
    key: 0
  },
  {
    text: "Février",
    key: 1
  },
  {
    text: "Mars",
    key: 2
  },
  {
    text: "Avril",
    key: 3
  },
  {
    text: "Mai",
    key: 4
  },
  {
    text: "Juin",
    key: 5
  },
  {
    text: "Juillet",
    key: 6
  },
  {
    text: "Août",
    key: 7
  },
  {
    text: "Septembre",
    key: 8
  },
  {
    text: "Octobre",
    key: 9
  },
  {
    text: "Novembre",
    key: 11,
    value: "Novembre"
  },
  {
    text: "Décembre",
    key: 12
  }
];
let YearOptions = [
    {
        text: "2018",
        key: 0,
        value: 2018
    },
    {
        text: "2017",   
        key: 1
    },
    {
        text: "2016",
        key: 2
    }
];

//This components holds the state for all the other components to interact with. Function are created here to give services to other components
class News extends CrudComponent{
    
    //Creates a get request to the server to initiliase the state with data.
    componentDidMount()
    {
        this.ReadInTempState("/api/news/limit/15");
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
    <div className={adminStyles.adminPage}> 
        <section className="section-row">
            <div styleName="pagesLeftColumn columnContainer">
                <NewsCreate CreateInTempState={this.CreateInTempState}/>
            </div>
            <div styleName="pagesRightColumn columnContainer">
                <div style={{marginBottom: '1.5vw'}}>
                    <Dropdown style={{marginRight: "1.5vw"}} selection placeholder="Mois" defaultValue="Novembre" options={MonthOptions} />
                    <Dropdown selection placeholder="Annee" defaultValue={2018} options={YearOptions} />
                </div>
                <div className={adminStyles.sectionContent} styleName="newsContainer">
                    {this.DisplayNewsCard()}
                </div>
            </div>
        </section>
    </div>
    )}
}

export default CSSModules(News, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});