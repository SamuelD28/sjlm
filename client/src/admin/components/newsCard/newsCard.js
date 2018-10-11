import React from 'react';

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
        <h3 styleName="newsTitle">{props.news.Title}</h3>
        {DisplayImportantTag(props.news)}
        <span styleName="newsCategory">{props.news.Category}</span>
        <p styleName="newsDesc">{props.news.Description.substring(0, 100)}...</p>
    </div>
    )
}

export default CSSModules(NewsCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});


