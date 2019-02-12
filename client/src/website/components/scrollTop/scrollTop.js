import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

class ScrollTop extends Component {

    ScrollTop = () => {
        this.props.anchor.scrollIntoView({
            behavior: 'smooth',
            block: "start",
            inline: 'start'});
    }

    render() {
        return <Button  
                    style={(this.props.position == "left")?{left : "120px"}:{right:"20px"}}
                    color="blue" 
                    circular 
                    inverted 
                    onClick={this.ScrollTop} 
                    className="btnTop">
                    <i 
                        style={{margin: "0"}} 
                        className={(this.props.direction === "left")? "icon chevron left" : "icon chevron up"}
                        >
                    </i>
                </Button>
    }

}

export default ScrollTop;
