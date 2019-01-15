import React from 'react';
import moment from 'moment';

const pageCategoryStyle = {
    fontSize: '2.25em',
    margin: '0'
}

const pageTitleStyle = {
    fontWeight: 'bold',
    fontSize: '2.85em',
    borderLeft: '.3vw solid #37474F',
    paddingLeft: '1vw',
    margin: '0'
}

const DisplayDate = (date) => {
    if (date !== null && date !== undefined)
        return (
            <h3>
        <i className="icon clock"></i>Le {moment(date).format("dddd, Do MMMM, YYYY" )}
    </h3>
        )
}

const PageHeader = (props) => {
    return (
        <div>
        <h2 style={pageCategoryStyle}>{props.category}</h2>
        <h1 style={pageTitleStyle}>{props.title}</h1>
        {DisplayDate(props.date)}
    </div>
    )
}

export default PageHeader;
