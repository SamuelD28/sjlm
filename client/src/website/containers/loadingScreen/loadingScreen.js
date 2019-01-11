import React, { Component } from 'react';

import CSSModules from 'react-css-modules';
import styles from './loadingScreen.module.css';
import { Transition } from 'semantic-ui-react';

class LoadingScreen extends Component {

    constructor(props) {
        super(props);
        this.loading = React.createRef();
    }

    componentDidUpdate() {
        if (this.props.swipeUp)
            this.loading.current.style.transform = "translateY(-100%)"
    }

    render() {
        return <div ref={this.loading} styleName="loadingBody">
                    <img styleName="loadingLogo" src="/logo2.png"/>
                </div>
    }
}

export default CSSModules(LoadingScreen, styles, { handleNotFoundStyleName: "log", allowMultiple: true });
