import React, {Component} from 'react';
import {Utility, Ajax} from '../../../shared/utility.js';
//Css module import
import CSSModules from 'react-css-modules';
import styles     from './newsCard.module.css';
//Components import
import NewsEdit from '../newsEdit/newsEdit.js';

class NewsCard extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
        this.GetData =  Ajax.GetData.bind(this)
    }
    
    componentDidMount()
    {
        this.GetData("/api/news");
    }
    
    render(){
        if(this.state.data !== undefined)
        {
            return(
            this.state.data.map((item,index) =>(
                <div key={item._id}>
                    <div styleName="news">
                        <div styleName="newsImg" className="img-bg" style={{backgroundImage: `url('/${item.Image}')`}}></div>
                        <h4 styleName="newsTitle">{item.Title}</h4>
                        <span styleName="newsCategory">{item.Category}</span>
                        <p styleName="newsDesc">{item.Description.substring(0, 100)}...</p>
                        <div className="cardOverlay cardEdit" onClick={Utility.OpenModal.bind(this)} modal={item._id}>
                            <div className="cardOverlayBtn">
                                <i className="fas fa-edit"></i>
                                <h4>Modifier</h4>
                            </div>
                        </div>
                    </div>
                    <NewsEdit item={item}/>
                </div>
            )))    
        }
    }
}

export default CSSModules(NewsCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});


