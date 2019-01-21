import React from 'react';
import { Transition } from 'semantic-ui-react';

import CSSModules from 'react-css-modules';
import style from './imgGalleryColumn.module.css';

//Pourrait eventuellement etre transformer en carousel
const ImgGalleryColumn = (props) => {
    if (props.images !== undefined && props.images !== null)
        return props.images.map((item, index) => (
            <Transition
                key={item}
                animation="fade right"
                duration={1000}
                transitionOnMount={true}>
                <a href={item} target="_blank" rel="noopener noreferrer">
                    <img alt="gallerie" key={index} src={item} className="img-full" styleName="pageImgGallery"/>
                </a>
            </Transition>
        ))
}

export default CSSModules(ImgGalleryColumn, style, { allowMultiple: true, handleNotFoundStyleName: "log" });
