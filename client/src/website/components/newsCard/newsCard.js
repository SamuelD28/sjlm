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
    
    LoadNewsPage(id)
    {
        this.props.history.push("/news/" + id);
    }
    
    render(){
    if(this.props.news !== undefined){
    return(
    <div styleName='newsCard' key={this.props.index} onClick={() => {this.LoadNewsPage(this.props.news._id)}}>
        <div styleName='newsImg' style={{backgroundImage: `url('${this.props.news.Images[0]}')`}}>
        </div>
        <div styleName='newsInfo'>
            <h2 styleName="newsTitle">{this.props.news.Title}</h2>
            <p styleName='newsDesc'>{this.props.news.Description.substring(0, 200)}...</p>
        </div>
        <div styleName='arrowContainer'>
            <div styleName='newsArrow'></div>
        </div>
    </div>
    )}
    }
}

export default CSSModules(NewsCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"})