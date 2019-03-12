import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';

import { Transition, Dropdown } from 'semantic-ui-react';

import CSSModules from 'react-css-modules';
import styles from './bannerHome.module.css';

class BannerHome extends Component {
    
    //Should extract these into the website config api
    Keywords = ['Accueillante', 'Culturelle', 'Ouverte']
    Duration = 2000;

    constructor(props) {
        super(props);
        this.state = { searchQuery: "", currentKeyword: 0, lastKeyword: 0 };
        this.GenerateSearchOptions();
    }

    /**
     * Method that hides all the keywords that are
     * not currently beeing picked
     */
    HideCurrentKeyword = (index) => {
        this.setState({ currentKeyword: -1, lastKeyword: index });
    }
    
    /**
     * Method that change the keyword to display inside
     * the banner
     */
    ChangeCurrentKeyword = (e) => {
        let nextIndex = (this.state.lastKeyword + 1 >= this.Keywords.length) ? 0 : this.state.lastKeyword + 1;
        this.setState({ currentKeyword: nextIndex })
    }
    
    /**
     * Method that generate all the search options for the search input.
     * Filters trough all the value.
     */
    GenerateSearchOptions = async() => {
        let links = await Ajax.GetData("/api/navigationlinks/");
        let news = await Ajax.GetData("/api/news/");

        let options = [];
        if (links.success) {
            links.data.map((link) => {
                let option = { text: link.Title, value: link.Link };
                return options.push(option);
            })
        }
        if (news.success) {
            news.data.map((news) => {
                let option = { text: news.Title, value: "/news/" + news._id };
                return options.push(option);
            })
        }
        this.setState({ options: options })
    }
    
    /**
     * Method that refhesh the search values
     * based on the input value.
     */
    ChangeSearchQuery = async(data) => {
        this.setState({ searchQuery: data.value });
    }
    
    /**
     * Method that send the user to the selected
     * search input.
     */
    Search = () => {
        if (this.state.searchQuery !== "") {
            this.props.history.push(this.state.searchQuery);
        }
    }

    render() {
        if (this.state.options !== undefined && this.state.options !== null)
            return <div styleName="bannerBody" className="fill-height">
                        <video styleName="bannerVideo" autoPlay muted loop>
                            <source src="/sjlm.mp4" type="video/mp4">
                            </source>
                        </video>
                        <Transition
                        transitionOnMount={true}
                        animation="fade up"
                        duration={1000}
                        >
                        <div>
                            <div styleName="bannerContent">
                                <h1 styleName='bannerSlogan'>Bienvenue à Saint-Jacques-le-Mineur</h1>
                                <div styleName='bannerKeyword'>
                                    {this.Keywords.map((keyword, index)=>{
                                        let hide = this.Duration/6;
                                        let show = this.Duration;
                                        return  <Transition
                                                    key={keyword}
                                                    animation="fade up"
                                                    duration={{ hide, show }}
                                                    onComplete={() => this.HideCurrentKeyword(index)}
                                                    onHide={this.ChangeCurrentKeyword}
                                                    transitionOnMount={true}
                                                    visible={index === this.state.currentKeyword}
                                                    >
                                                    <span>{keyword}</span>
                                                </Transition>
                                    })}
                                </div>
                                <div styleName='bannerSearch'>
                                    <Dropdown
                                        icon={false}
                                        search
                                        fluid
                                        scrolling={false}
                                        onChange={(e, data) =>this.ChangeSearchQuery(data)}
                                        searchInput={{ className: 'test' }}
                                        placeholder="Que recherchez-vous?"
                                        minCharacters={2}
                                        noResultsMessage="Aucun résultat"
                                        styleName="dropdown"
                                        options={this.state.options}
                                        selection
                                        >
                                    </Dropdown>
                                    <i onClick={this.Search} className="icon search" styleName="searchIcon">
                                    </i>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
    }
}

export default CSSModules(BannerHome, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
