import React from 'react';
import {Transition} from 'semantic-ui-react';

const NewsDescription = (props) =>{
    return <Transition
                animation="fade right"
                duration={1000}
                transitionOnMount={true}>
                <div className="component-card medium-gutters">
                    <h1>{props.Title}</h1>
                    <p>{props.Description}</p>
                </div>
            </Transition>
} 

export default NewsDescription;