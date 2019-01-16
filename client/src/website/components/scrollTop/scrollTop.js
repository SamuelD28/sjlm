import React, { Component } from 'react';

import CSSModules from 'react-css-modules';
import styles from './scrollTop.module.css';

class ScrollTop extends Component {

    ScrollTop = () => {
        document.querySelector("body").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    render() {
        return <button onClick={this.ScrollTop} styleName="btnTop" className="btn btn-outline-primary">
            <i style={{margin: "0"}} className="icon chevron up"></i>
        </button>
    }

}

export default CSSModules(ScrollTop, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
