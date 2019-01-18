import React, { Component } from 'react';

import CSSModules from 'react-css-modules';
import styles from './scrollTop.module.css';

class ScrollTop extends Component {

    ScrollTop = () => {
        document.querySelector("body").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    render() {
        return <div onClick={this.ScrollTop} styleName="btnTop" className="">
            <i style={{margin: "0"}} className="icon chevron up"></i>
        </div>
    }

}

export default CSSModules(ScrollTop, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
