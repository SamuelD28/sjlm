import React from 'react';
import { Transition } from 'semantic-ui-react'
import moment from 'moment';

/**
 * Method that display the date if a date was passed as a props
 */
const DisplayDate = (date) => {
    if (date !== null && date !== undefined)
        return  <h3>
                    <i className="icon clock"></i>Le {moment(date).format("dddd, Do MMMM, YYYY" )}
                </h3>
}

/**
 * Functionnal component that display the page Header
 */
const PageHeader = (props) => {
    return <Transition
                animation="fade right"
                duration={1000}
                transitionOnMount={true}>
                <div>
                    <h2 className="page-category">{props.category}</h2>
                    <h1 className="page-title">{props.title}</h1>
                    {DisplayDate(props.date)}
                </div>
            </Transition>
}

export default PageHeader;
