import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './newsColumn.module.css';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';  // without this line it didn't work
moment.locale('fr');

function ItterateNews(news)
{
    if(news !== undefined)
    return news.map((item, index) =>(
    <div styleName="newsCard" key={index}>
        <span styleName="newsDate"><i className="icon clock outline"></i> Le {moment(item.DatePublished).format("dddd, Do MMMM")}</span>
        <h1 styleName="newsTitle">{item.Title}</h1>
        <NavLink to={`/news/${item._id}`} >
            <button className="btn btn-sm btn-outline-primary">Lire la suite</button>
        </NavLink>
    </div>
    ))
}

const NewsColumn = (props) =>
{
    return(
    <div styleName="newsSection">
        {ItterateNews(props.news)}
    </div>
    )
}

export default CSSModules(NewsColumn, styles, {allowMultiple: true ,handleNotFoundStyleName: "log"});