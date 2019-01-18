import React from 'react';
import { Transition } from 'semantic-ui-react';

const pageContentStyle = {
    margin: '3vw 0'
}

const CreateMarkup = (content) => {
    return { __html: content }
}

const PageContent = (props) => {
    return (
        <Transition
            animation="fade up"
            duration={1000}
            transitionOnMount={true}>
            <div style={pageContentStyle} dangerouslySetInnerHTML={CreateMarkup(props.content)}>
            </div>
        </Transition>
    )
}

export default PageContent;
