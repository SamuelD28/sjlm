import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';
import { Transition } from 'semantic-ui-react';

import CSSModules from 'react-css-modules';
import styles from './importantNews.module.css';

class ImportantNews extends Component {

    state = { news: [] }

    async componentDidMount() {
        let request = await Ajax.GetData("/api/news/important");
        this.setState({ news: request.data });
    }

    render() {
        if (this.state.news.length > 0)
            return <Transition
                        duration={1000}
                        animation="fade down"
                        transitionOnMount>
                        <div styleName="importantNews">
                        {this.state.news.map((news)=>(
                            <span>Important : {news.Title}   <b><a styleName="importantLink" href="">En savoir plus</a></b></span>
                        ))}
                        </div>
                    </Transition>
    }

}

export default CSSModules(ImportantNews, styles, { handleNotFoundStyleName: "log", allowMultiple: true });
