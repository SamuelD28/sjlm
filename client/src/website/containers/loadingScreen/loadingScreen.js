import React, { Component } from 'react';

import CSSModules from 'react-css-modules';
import styles from './loadingScreen.module.css';

/**
 * Component used to display the laoding screen
 * when the user first enter the website
 */
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
                    <img styleName="loadingLogo" alt="logo" src="https://res.cloudinary.com/dohwohspb/image/upload/v1548355121/images/website/logo2_bga.png"/>
                </div>
    }
}

export default CSSModules(LoadingScreen, styles, { handleNotFoundStyleName: "log", allowMultiple: true });
