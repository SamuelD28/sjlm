import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './newsCardStacked.module.css';
import CSSModules from 'react-css-modules';

import moment from 'moment';

const NewsStackedCard = (props) =>{
    return  <NavLink 
                to={`/news/${props.news._id}`} 
                styleName="newsCard" 
                className="component-card rounded big-spacing-bot anim-bounce-up">
                <div styleName="newsDate" className="rounded-left">
                    <h4 style={{color: "white"}}>{moment(props.news.DateFrom).format("Do MMMM")} </h4>
                </div>
                <div styleName="newsCardInfo" className="big-gutters">
                    <h3>{props.news.Title}</h3>
                    <div>
                    {props.news.Files.map((file, index)=>(
                        <a key={index} href={file}><i className="icon file alternate outline"></i>{file.substring(file.lastIndexOf("/") + 1 ,file.length)}</a>
                    ))}
                    </div>
                </div>
            </NavLink>
}

export default CSSModules(NewsStackedCard, styles , {handleNotFoundStyleName: "log", allowMultiple: true});