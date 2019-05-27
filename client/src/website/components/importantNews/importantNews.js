import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';
import { Transition } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import CSSModules from 'react-css-modules';
import styles from './importantNews.module.css';

class ImportantNews extends Component {

    state = { news: [], close: false }

    async componentDidMount() {
        let request = await Ajax.GetData("/api/news/important");
        this.setState({ news: request.data });
    }

    CloseImportant = () => {
        this.setState({ close: true });
    }

    render() {
        if (this.state.news.length > 0)
            return <Transition
                duration={1000}
                animation="fly down"
                transitionOnMount={true}
                visible={!this.state.close}>
                <div styleName="importantTransition">
                    <div styleName="importantNews">
                        <h3 styleName="importantTitle">Annonces Importantes
                            <i className="icon close" styleName="closeBtn" onClick={this.CloseImportant}>
                            </i>
                        </h3>
                        {this.state.news.map((news) => (
                            <span styleName="important" key={news._id}>
                                {news.Title}
                                <NavLink to={`/news/${news._id}`} styleName="importantLink">En savoir plus</NavLink>
                            </span>
                        ))}
                    </div>
                </div>
            </Transition>
    }

}

export default CSSModules(ImportantNews, styles, { handleNotFoundStyleName: "log", allowMultiple: true });
