//--------Declaration---------//
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import Ajax from '../../../shared/ajax.js';

// Css module improt
import CSSModules from 'react-css-modules';
import styles from './news.module.css';
import adminStyles from "../index.module.css";

//Components
import NewsCreate from '../../components/newsCreate/newsCreate.js';
import NewsEdit from '../../components/newsEdit/newsEdit.js';
import CategoryNews from '../categoryNews/categoryNews.js';

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

class News extends Component {

    state = {};

    componentDidMount() {
        this.GetNews();
    }

    GetNews = async() => {
        let request = await Ajax.GetData("/api/news/limit/15");
        this.setState({ news: request.data });
    }

    //Function that display an array for every news card hold in the tempstate array.
    DisplayNewsCard() {
        if (this.state.news !== undefined) {
            if(this.state.news.length > 0){
                return this.state.news.map((item) => (
                    <NewsEdit
                        key={item._id}
                        news={item}
                        RefreshDataSet={this.GetNews}/>
                ));
            }
            else
            {
                return(
                    <h2>Aucun résultat trouvé</h2>
                )
            }
        }
    }

    render() {
        return (
            <div className={adminStyles.adminPage}>
                <section className="section-row">
                    <div styleName="columnContainer">
                        <NewsCreate RefreshDataSet={this.GetNews}/>
                    </div>
                    <div styleName="columnContainer">
                        <div style={{padding: '1vw'}}>
                            <Dropdown style={{marginRight: "1.5vw"}} selection placeholder="Mois" defaultValue="Novembre" options={MonthOptions} />
                            <Dropdown selection placeholder="Annee" defaultValue={2018} options={YearOptions} />
                        </div>
                        <div className={adminStyles.sectionContent} styleName="newsContainer">
                            {this.DisplayNewsCard()}
                        </div>
                    </div>
                    <CategoryNews />
                </section>
            </div>
        )
    }
}

export default CSSModules(News, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
