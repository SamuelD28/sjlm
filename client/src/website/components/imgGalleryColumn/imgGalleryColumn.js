import React from 'react';

import CSSModules from 'react-css-modules';
import style from './imgGalleryColumn.module.css';

//Pourrait eventuellement etre transformer en carousel
const ImgGalleryColumn = (props) =>
{
    if(props.images !== undefined && props.images !== null)
    return props.images.map((item, index) =>(
    <a href={item} target="_blank" rel="noopener noreferrer" key={index}>    
        <img alt="gallerie" key={index} src={item} className="img-full" styleName="pageImgGallery"/>
    </a>
    ))
}

export default CSSModules(ImgGalleryColumn, style, {allowMultiple: true, handleNotFoundStyleName: "log"});