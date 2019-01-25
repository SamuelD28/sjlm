//--------Declaration---------//
import React, { Component } from 'react';
import { Dropdown, Placeholder } from 'semantic-ui-react';
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
        value: 1,
        key: 0
  },
    {
        text: "Février",
        value: 2,
        key: 1
  },
    {
        text: "Mars",
        value: 3,
        key: 2
  },
    {
        text: "Avril",
        value: 4,
        key: 3
  },
    {
        text: "Mai",
        value: 5,
        key: 4
  },
    {
        text: "Juin",
        value: 6,
        key: 5
  },
    {
        text: "Juillet",
        value: 7,
        key: 6
  },
    {
        text: "Août",
        value: 8,
        key: 7
  },
    {
        text: "Septembre",
        value: 9,
        key: 8
  },
    {
        text: "Octobre",
        value: 10,
        key: 9
  },
    {
        text: "Novembre",
        value: 11,
        key: 11,
  },
    {
        text: "Décembre",
        value: 12,
        key: 12
  }
];
let YearOptions = [
    {
        text: "2020",
        value: 2020,
        key: 0
    },
    {
        text: "2019",
        value: 2019,
        key: 1
    },
    {
        text: "2018",
        value: 2018,
        key: 2
    },
    {
        text: "2018",
        value: 2018,
        key: 3
    },
    {
        text: "2017",
        value: 2017,
        key: 4
    },
    {
        text: "2016",
        value: 2016,
        key: 5
    },
    {
        text: "2015",
        value: 2015,
        key: 6
    },
    {
        text: "2014",
        value: 2014,
        key: 7
    },
    {
        text: "2013",
        value: 2013,
        key: 8
    }
];

class News extends Component {

    state = {};

    constructor(props) {
        super(props);
        const today = new Date();
        this.state = {
            loading: true,
            selectedYear: today.getFullYear(),
            selectedMonth: today.getMonth() + 1,
            selectedCategory: ""
        };
    }

    componentDidMount = async() => {
        let categoryNews = await Ajax.GetData("/api/categorynews");
        let CategoryOptions = [];
        if (categoryNews.data !== undefined) {
            categoryNews.data.map((category) => {
                let item = { text: category.Title, value: category._id, key: category._id };
                return CategoryOptions.push(item);
            });
        }
        this.setState({ categories: CategoryOptions });
        this.GetNews();
    }

    GetNews = async() => {

        if (this.state.selectedCategory !== "") {
            let request = await Ajax.GetData(`/api/news/category/${this.state.selectedCategory}`);
            this.setState({ news: request.data });
        }
        else {
            let request = await Ajax.GetData(`/api/news/date/${this.state.selectedYear}/${this.state.selectedMonth}`);
            this.setState({ news: request.data });
        }
    }

    RefreshNews = async(e, data) => {
        if (data.name === "month") {
            await this.setState({ selectedMonth: data.value });
        }
        else if (data.name === "year") {
            await this.setState({ selectedYear: data.value });
        }
        else {
            await this.setState({ selectedCategory: data.value })
        }

        this.GetNews();
    }

    //Function that display an array for every news card hold in the tempstate array.
    DisplayNewsCard() {
        if (this.state.news !== undefined) {
            if (this.state.news.length > 0)
                return this.state.news.map((item) => (
                    <NewsEdit
                        key={item._id}
                        news={item}
                        RefreshDataSet={this.GetNews}/>
                ));
            else
                return <h2>Aucun résultat trouvé</h2>
        }
    }

    render() {
        if (this.state.categories !== undefined)
            return (
                <div className={adminStyles.adminPage}>
                <section className="section-row">
                    <div className="left-column">
                        <div className="section-style section-btn">
                            <NewsCreate RefreshDataSet={this.GetNews}/>
                        </div>
                        <CategoryNews/>
                    </div>
                    <div className="right-column section-style">
                        <h2>Les Actualités</h2>
                        <div style={{marginBottom: "2rem"}}>
                            <Dropdown
                                name="month"
                                style={{marginRight: "1.5vw"}}
                                onChange={this.RefreshNews}
                                selection
                                placeholder="Mois"
                                defaultValue={this.state.selectedMonth}
                                options={MonthOptions} />
                            <Dropdown
                                name="year"
                                style={{marginRight: "1.5vw"}}
                                selection
                                onChange={this.RefreshNews}
                                placeholder="Annee"
                                defaultValue={this.state.selectedYear}
                                options={YearOptions} />
                            <Dropdown
                                name="category"
                                selection
                                clearable
                                defaultValue={this.state.selectedCategory}
                                onChange={this.RefreshNews}
                                placeholder="Categorie"
                                options={this.state.categories}
                                />
                        </div>
                        <div styleName="newsContainer">
                            {this.DisplayNewsCard()}
                        </div>
                    </div>
                </section>
            </div>
            )
    }
}

export default CSSModules(News, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
