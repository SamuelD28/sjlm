import React, {Component} from 'react';

import CSSModules from 'react-css-modules';
import styles from './newsPortrait.module.css';

class NewsPortrait extends Component{

    render()
    {
        return <h1>Portrait layout</h1>
    }

}

export default CSSModules(NewsPortrait, styles, {handleNotFoundStyleName: "log", allowMultiple: true})