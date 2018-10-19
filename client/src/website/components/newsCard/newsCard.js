import React, {Component} from 'react';
import {Ajax, Utility} from '../../../shared/utility.js';

import CSSModules from 'react-css-modules';
import styles from './newsCard.module.css';

class NewsCard extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    
    async componentDidMount()
    {
        let news =  await Ajax.GetData("/api/news/limit/6");   
        this.setState({news});
    }
    
    LoadNewsPage(id)
    {
        this.props.history.push("/news/" + id);
    }
    
    render(){
    if(this.state.news !== undefined){
    return(
    this.state.news.map((item, index)=> (
    <div styleName='newsCard' key={index} onClick={() => {this.LoadNewsPage(item._id)}}>
        <div styleName='newsImg' style={{backgroundImage: `url('${item.Images[0]}')`}}>
            <h3 styleName='newsCategory'>{Utility.TranslateNewsCategory(item.Category)}</h3>
        </div>
        <div styleName='newsInfo'>
            <h2>{item.Title}</h2>
            <p styleName='newsDesc'>{item.Description.substring(0, 200)}...</p>
        </div>
        <div styleName='arrowContainer'>
            <div styleName='newsArrow'></div>
        </div>
    </div>
    ))
    )}
    }
}

export default CSSModules(NewsCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"})