import React from 'react';
import moment from 'moment';

//Css module import
import CSSModules from 'react-css-modules';
import styles     from './newsCard.module.css';

//Function that displa an important tag if the news important property is set to true.
function DisplayImportantTag(item)
{
    if(item.Important)
        return <span styleName="newsImportant">Prioritaire</span>;
}

const NewsCard = (props) =>{
    
    if(props.news !== undefined)
    return(
    <div styleName="news">
        <div styleName="newsImg" className="img-bg" style={{backgroundImage: `url('${props.news.Images[0]}')`}}></div>
        <h2 styleName="newsTitle">{props.news.Title}</h2>
        {DisplayImportantTag(props.news)}
        <p styleName="newsCategory">Catégorie : {props.news.Category}</p>
        <p styleName="newsDate">Publié le : {`${moment(props.DatePublished).format("YYYY-MM-DD")}`} <i className="clock outline icon"></i></p>
    </div>
    )
}

export default CSSModules(NewsCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});


