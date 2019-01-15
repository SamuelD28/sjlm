import React from 'react';
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

    if (props.news !== undefined)
        return (
            <div styleName="news">
        <div styleName="newsImg"
            className="img-bg"
            style={
                (props.news.Images[0] !== undefined)
                ?{backgroundImage: `url('${props.news.Images[0]}')`}
                :{background: "#d4d4d5"}}>
        </div>
        <div styleName="newsInfo">
            <h2>{props.news.Title}</h2>
            {DisplayImportantTag(props.news)}
            <p styleName="newsCategory">{props.news.Category.Title}</p>
            <p styleName="newsDate"><i className="clock outline icon"></i> {
            (props.news.DateFrom !== null)
            ?moment(props.news.DateFrom).format("dddd, Do MMMM, YYYY")
            :moment(props.news.createdAt).format("dddd, Do MMMM, YYYY")
            }</p>
        </div>
    </div>
        )
}

export default CSSModules(NewsCard, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
