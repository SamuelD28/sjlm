//Library and modules
import React from 'react';
import {Utility} from '../../../shared/utility.js';
import moment from 'moment';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './newsCard.module.css';

//Function that displa an important tag if the news important property is set to true.
function DisplayImportantTag(item) {
    if (item.Important)
        return <span styleName="newsImportant">Prioritaire</span>;
}

const NewsCard = (props) => {
    return <div styleName="news">
                <img
                    srcSet={(props.news.Images[0] !== undefined) 
                    ?Utility.ParseSourceSet(props.news.Images[0])
                    :Utility.ParseSourceSet("https://res.cloudinary.com/dohwohspb/image/upload/v1548082844/pexels-photo-688660.jpg")}
                    sizes="25vw"
                    alt="news"
                    styleName="newsImg"
                    />
                <div styleName="newsInfo">
                    <h2>{props.news.Title}</h2>
                    {DisplayImportantTag(props.news)}
                    <p>
                        <b>
                        {(props.news.Category !== null)
                        ?props.news.Category.Title
                        :"Aucune categorie"}
                        </b>
                    </p>
                    <p>
                        <i className="clock outline icon"></i> 
                        {(props.news.DateFrom !== null)
                        ?moment(props.news.DateFrom).format("dddd, Do MMMM, YYYY")
                        :moment(props.news.createdAt).format("dddd, Do MMMM, YYYY")}
                    </p>
                </div>
            </div>
}

export default CSSModules(NewsCard, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
