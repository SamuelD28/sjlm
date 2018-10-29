import React, {Component} from 'react';
import CSSModules from 'react-css-modules';
import styles from './newsColumn.module.css';

class NewsColumn extends Component{
    render(){
    return(
    <div styleName="newsSection">
        <div styleName="newsContent">
            <div styleName="newsCard">
                <span styleName="newsDate"><i className="icon clock outline"></i> Le 2018-10-28</span>
                <h1 styleName="newsTitle">Récolte Agricole de carotte</h1>
                <button className="btn btn-sm btn-outline-primary">Lire la suite</button>
            </div>
            <div styleName="newsCard">
                <span styleName="newsDate"><i className="icon clock outline"></i> Le 2018-10-28</span>
                <h1 styleName="newsTitle">Récolte Agricole de carotte</h1>
                <button className="btn btn-sm btn-outline-primary">Lire la suite</button>
            </div>
            <div styleName="newsCard">
                <span styleName="newsDate"><i className="icon clock outline"></i> Le 2018-10-28</span>
                <h1 styleName="newsTitle">Récolte Agricole de carotte</h1>
                <button className="btn btn-sm btn- -primary">Lire la suite</button>
            </div>
        </div>
    </div>
    )}
}

export default CSSModules(NewsColumn, styles, {allowMultiple: true ,handleNotFoundStyleName: "log"});