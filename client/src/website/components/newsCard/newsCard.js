import React, {Component} from 'react';
import {Ajax} from '../../../shared/utility.js';

import CSSModules from 'react-css-modules';
import styles from './newsCard.module.css';

class NewsCard extends Component{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.GetLatestNews = Ajax.GetData.bind(this);
    }
    
    componentDidMount()
    {
        this.GetLatestNews("/api/news/6");        
    }
    
    render(){
    if(this.state.data !== undefined){
    return(
    this.state.data.map((item, index)=> (
    <div styleName='newsCard' key={index}>
        <div styleName='newsImg' style={{backgroundImage: `url('/${item.Image}')`}}>
            <h3 styleName='newsCategory'>{item.Category}</h3>
        </div>
        <div styleName='newsInfo'>
            <h2 styleName='newsTitle'>{item.Title}</h2>
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