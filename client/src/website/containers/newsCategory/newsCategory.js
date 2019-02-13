//Initial Declaratinon and importation
import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';

//Components import
import NewsTimeline from '../../components/newsTimeline/newsTimeline.js';
import NewsStacked from '../../components/newsStacked/newsStacked.js';
import NewsPortrait from '../../components/newsPortrait/newsPortrait.js';

import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');

/**
 * Higher order component used to display the right layout
 * for the news to be diplayed in.
 */
class NewsCategory extends Component {

    constructor(props) {
        super(props);
        this.state = { currentCategory: "", history: this.props.match.params.category };
    }

    componentDidMount() {
        this.GetCategory();
        this.GetNews();
    }
    
    componentDidUpdate() {
        this.CompareCategory();
    }
    
    /**
     * Method that gets all the category from the database
     */
    GetCategory = async() => {
        let category = await Ajax.GetData(`/api/categorynews/url/${this.props.match.params.category}`);
        if (category.success)
            this.setState({ currentCategory: category.data })
    }
    
    /**
     * Method that get all the news that correpond to the requested category
     */
    GetNews = async() => {
        let news = await Ajax.GetData(`/api/news/link/${this.props.match.params.category}`);
        if (news.success)
            await this.setState({ news: news.data });
    }
    
    /**
     * Method that compare the category beeing requested and the current category. If theres a difference
     * we request the new informations
     */
    CompareCategory = async() => {

        if (this.state.history !== this.props.match.params.category) {
            let category = await Ajax.GetData(`/api/categorynews/url/${this.props.match.params.category}`)
            if (category.success) {
                await this.setState({ currentCategory: category.data, history: this.props.match.params.category });
                await this.GetNews();
            }
        }
    }
    
    /**
     * Method that display the right layout with the news inside based
     * on the template chosen by the user.
     */
    GenerateLayout = () => {
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
                    {this.GenerateLayout()}
                </div>
    }
}

export default NewsCategory;
