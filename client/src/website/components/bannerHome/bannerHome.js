import React, { Component } from 'react';
import { Transition, Dropdown } from 'semantic-ui-react';

import Ajax from '../../../shared/ajax.js';

import CSSModules from 'react-css-modules';
import styles from './bannerHome.module.css';

class BannerHome extends Component {

    Keywords = ['Accueillante', 'Culturelle', 'Ouverte']

    constructor(props) {
        super(props);
        this.state = { searchQuery: "", currentKeyword: 0 };
        this.GenerateSearchOptions();
        this.ChangeCurrentKeyword();
    }

    ChangeCurrentKeyword = () => {
        setInterval(() => {
            let nextIndex = (this.state.currentKeyword + 1 >= this.Keywords.length) ? 0 : this.state.currentKeyword + 1;
            this.setState({ currentKeyword: nextIndex })
        }, 1000);

    }

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

    ChangeSearchQuery = async(data) => {
        this.setState({ searchQuery: data.value });
    }

    Search = () => {
        if (this.state.searchQuery !== "") {
            this.props.history.push(this.state.searchQuery);
        }
    }

    render() {
        if (this.state.options !== undefined && this.state.options !== null)
            return <div>
                <video styleName="bannerVideo" autoPlay muted loop>
                    <source src="/sjlm.mp4" type="video/mp4">
                    </source>
                </video>
                <Transition
                    transitionOnMount={true}
                    animation="fade up"
                    duration={1000}
                    >
                    <div style={{width: "8"}}>
                        <div styleName="bannerContent">
                            <h1 styleName='bannerSlogan'>Bienvenue à Saint-Jacques-le-Mineur</h1>
                            <span styleName='bannerKeyword'>{this.Keywords[this.state.currentKeyword]}</span>
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
