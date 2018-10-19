//Initial Declaratinon and importation
import React, {Component} from 'react';
import {Ajax} from '../../../shared/utility.js';

//Css Modules Importation
import CSSModules from 'react-css-modules';
import styles from "./newsCategory.module.css";

class NewsCategory extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
        this.news = {};
    }
    
    async componentDidMount()
    {
        this.news = await Ajax.GetData(`/api/news/category/${this.props.match.params.category}`);
        this.setState({news : this.news});
    }
    
    //OPTIMISATION NECESSAIRE. APPELLER UNE REQUETE AJAX A CHAQUE QUE LE COMPONENT UPDATE EST TRES COUTEUX
    async componentDidUpdate()
    {
        let categoryHistory = this.props.match.params.category;
        
        
        if(this.news !== undefined && this.news.length !== 0){
            // console.log("Category News : " + this.news[0].Category + " | Category History : " + categoryHistory);
            if(this.news[0].Category !== categoryHistory){
                console.log(true);
                this.news = await Ajax.GetData(`/api/news/category/${this.props.match.params.category}`);
                this.setState({news : this.news});
            }
        }
    }
    
    render()
    {
    if(this.state.news !== undefined){
    return  this.state.news.map((item, index)=>(
    <div styleName="newsCategory" key={index}>
        <h1>{item.Title}</h1>
    </div>
    ))
    }}
}

export default CSSModules(NewsCategory, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});