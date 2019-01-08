import React, {Component} from 'react';

import CSSModules from 'react-css-modules';
import styles from './newsStacked.module.css';

class NewsStacked extends Component{

    render()
    {
        return <h1>Stacked layout</h1>
    }

}

export default CSSModules(NewsStacked, styles, {handleNotFoundStyleName: "log", allowMultiple: true})