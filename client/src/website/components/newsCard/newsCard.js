import React, {Component} from 'react';

import CSSModules from 'react-css-modules';
import styles from './newsCard.module.css';

class NewsCard extends Component{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.GetLatestNews = this.GetLatestNews.bind(this);
    }
    
    async componentDidMount()
    {
        await this.GetLatestNews();
        console.log(this.state);
    }
    
    //Methode dupliquer. Extraire dans un fichier utilitaires
    GetLatestNews()
    {
        let Url = "/api/news/6";
        // let UI_LatestNewsContainer  = document.querySelector(".news-container");
        // let UI_EditNewsContainer    = document.getElementById("edit-news-container");
        return (fetch(Url)
        .then(res =>{
            if(res.status === 404 || res.status === 500)
                throw new Error("[-Server is unavailable at this moment-]");
            else
                return res.json();
        })
        .then(news =>{
            this.setState({news});
        })
        .catch(err =>{
            return(err);
        }));
    }
    
    render(){
    if(this.state.news !== undefined){
    return(
    this.state.news.map((item, index)=> (
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