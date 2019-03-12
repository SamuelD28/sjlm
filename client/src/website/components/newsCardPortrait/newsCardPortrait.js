import React from 'react';
import {NavLink} from 'react-router-dom';
import moment from 'moment';
 
import {Transition} from 'semantic-ui-react';

import styles from './newsCardPortrait.module.css';
import CSSModules from 'react-css-modules';

function StripHtml(html){
    
    if(html === undefined)
        return "";
    
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

const NewsCardPortrait = (props) => {
    
    return <Transition
                animation="fade left"
                duration={1000}
                transitionOnMount={true}>
                <NavLink to={`/news/${props.news._id}`} className="component-card rounded anim-bounce-up">
                    <div styleName="newsImg" className="img-bg rounded" style={{backgroundImage : `url('${props.news.Images[0]}')`}}></div>
                    <div className="medium-gutters ">
                        <h2>{props.news.Title}</h2>
                        <h3>{moment(props.news.DateFrom).format("Do MMMM YYYY")}</h3>
                        <p styleName="newsDesc">{StripHtml(props.news.Description).substring(0, 300)}...</p>
                    </div>
                </NavLink>
            </Transition>
    
}

export default CSSModules(NewsCardPortrait, styles, {handleNotFoundStyleName: "log", allowMultiple: true});