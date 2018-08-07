import React, {Component} from 'react';

//Css module import
import CSSModules from 'react-css-modules';
import styles     from './newsCard.module.css';

class NewsCard extends Component{
    
    DisplayImportantTag(item)
    {
        if(item.Important)
            return <span styleName="newsImportant">Prioritaire</span>;
    }

    render(){
    if(this.props.news !== undefined)
    return(
    <div>
        <div styleName="news">
            <div styleName="newsImg" className="img-bg" style={{backgroundImage: `url('/${this.props.news.Image}')`}}></div>
            <h3 styleName="newsTitle">{this.props.news.Title}</h3>
            {this.DisplayImportantTag(this.props.news)}
            <span styleName="newsCategory">{this.props.news.Category}</span>
            <p styleName="newsDesc">{this.props.news.Description.substring(0, 100)}...</p>
        </div>
    </div>
    )}
}

export default CSSModules(NewsCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});


