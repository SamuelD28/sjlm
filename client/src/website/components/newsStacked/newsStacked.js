import React, { Component } from 'react';

import CSSModules from 'react-css-modules';
import styles from './newsStacked.module.css';

import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
moment.locale('fr');

class NewsStacked extends Component {


    render() {
        return this.props.news.map((news, index) => (
            <div>
                <div style={{backgroundImage: `url('${news.Images[0]}')`}}></div>
                <div>
                    <h2>{news.Title}</h2>
                    <h4>{news.createdAt}</h4>
                    <ul>
                    {news.Files.map((file)=>(
                        <li>{file}</li>
                    ))}
                    </ul>
                </div>
            </div>
        ))
    }
}

export default CSSModules(NewsStacked, styles, { handleNotFoundStyleName: "log", allowMultiple: true })
