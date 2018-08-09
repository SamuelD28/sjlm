import React, {Component} from 'react';

//Css module import
import CSSModules from 'react-css-modules';
import styles     from './newsCard.module.css';

//This Component is responsible for displaying a card holding the information aobut a news object. The data is passed by the parent container.
class NewsCard extends Component{
    
    //Function that displa an important tag if the news important property is set to true.
    DisplayImportantTag(item)
    {
        if(item.Important)
            return <span styleName="newsImportant">Prioritaire</span>;
    }

    render(){
    if(this.props.news !== undefined)
    return(
    <div styleName="news">
        <div styleName="newsImg" className="img-bg" style={{backgroundImage: `url('/${this.props.news.Image}')`}}></div>
        <h3 styleName="newsTitle">{this.props.news.Title}</h3>
        {this.DisplayImportantTag(this.props.news)}
        <span styleName="newsCategory">{this.props.news.Category}</span>
        <p styleName="newsDesc">{this.props.news.Description.substring(0, 100)}...</p>
    </div>
    )}
}

export default CSSModules(NewsCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});


