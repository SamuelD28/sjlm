import React from 'react';
import { Transition } from 'semantic-ui-react';

const ImgGalleryColumn = (props) => {
    if (props.images !== undefined && props.images !== null)
        return props.images.map((item, index) => (
            <Transition
                key={item}
                animation="fade right"
                duration={1000}
                transitionOnMount={true}>
                <a href={item} target="_blank" rel="noopener noreferrer">
                    <img alt="gallerie" key={index} src={item} className="img-sepia"/>
                </a>
            </Transition>
        ))
}

export default ImgGalleryColumn;
