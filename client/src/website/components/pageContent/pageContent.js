import React from 'react';
import { Transition } from 'semantic-ui-react';

const CreateMarkup = (content) => {
    return { __html: content }
}

/**
 * Functionnal component used to display the page content
 */
const PageContent = (props) => {
    return  <Transition
                animation="fade up"
                duration={1000}
                transitionOnMount={true}>
                <div className="page-content" dangerouslySetInnerHTML={CreateMarkup(props.content)}>
                </div>
            </Transition>
}

export default PageContent;
