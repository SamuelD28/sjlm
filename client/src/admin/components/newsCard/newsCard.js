//Library and modules
import React from 'react';
import {Divider} from 'semantic-ui-react';
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
    return <div styleName="news" className="component-card rounded anim-bounce-up">
                <img
                    className="rounded"
                    srcSet={(props.news.Images[0] !== undefined) 
                    ?Utility.ParseSourceSet(props.news.Images[0])
                    :Utility.ParseSourceSet("https://res.cloudinary.com/dohwohspb/image/upload/v1548082844/pexels-photo-688660.jpg")}
                    sizes="25vw"
                    alt="news"
                    styleName="newsImg"
                    />
                <div styleName="newsInfo">
                    <h3>{props.news.Title}</h3>
                    {DisplayImportantTag(props.news)}
                    <span className="tag-card rounded">{props.news.Category.Title}</span>
                    <Divider />
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
