import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

class ScrollTop extends Component {

    ScrollTop = () => {
        document.querySelector("body").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    render() {
        return <Button color="blue" circular inverted onClick={this.ScrollTop} className="btnTop">
                    <i style={{margin: "0"}} className="icon chevron up"></i>
                </Button>
    }

}

export default ScrollTop;
