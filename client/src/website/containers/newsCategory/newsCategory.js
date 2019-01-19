//Initial Declaratinon and importation
import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';

//Css Modules Importation
import CSSModules from 'react-css-modules';
import styles from "./newsCategory.module.css";

//Components import
import NewsTimeline from '../../components/newsTimeline/newsTimeline.js';
import NewsStacked from '../../components/newsStacked/newsStacked.js';
import NewsPortrait from '../../components/newsPortrait/newsPortrait.js';

import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
moment.locale('fr');

class NewsCategory extends Component {

    constructor(props) {
        super(props);
        this.state = { currentCategory: "", history: this.props.match.params.category };
    }

    async componentDidMount() {
        let category = await Ajax.GetData(`/api/categorynews/url/${this.props.match.params.category}`);
        if (category.success)
            this.setState({ currentCategory: category.data })

        this.GetNews();
    }

    componentDidUpdate() {
        this.CompareCategory();
    }

    CompareCategory = async() => {

        if (this.state.history !== this.props.match.params.category) {
            let category = await Ajax.GetData(`/api/categorynews/url/${this.props.match.params.category}`)
            if (category.success) {
                await this.setState({ currentCategory: category.data, history: this.props.match.params.category });
                await this.GetNews();
            }
        }
    }

    GetNews = async() => {
        let news = await Ajax.GetData(`/api/news/link/${this.props.match.params.category}`);
        if (news.success)
            await this.setState({ news: news.data });
    }


    GenerateNewsGrid = () => {
        if (this.state.news !== undefined && this.state.currentCategory !== "") {

            let template = this.state.currentCategory.Template;
            if (template === "timeline")
                return <NewsTimeline news={this.state.news} />
            else if (template === "stacked")
                return <NewsStacked category={this.state.currentCategory} news={this.state.news} />
            else
                return <NewsPortrait category={this.state.currentCategory} news={this.state.news} />
        }
    }

    render() {
        return <div>
                    {this.GenerateNewsGrid()}
                </div>
    }
}

export default CSSModules(NewsCategory, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
