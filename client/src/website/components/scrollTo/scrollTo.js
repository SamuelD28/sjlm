import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

/**
 * Component used to scroll the user to the desired
 * anchor using smooth scrolling behavior
 */
class ScrollTo extends Component {
    
    ScrollTo = () => {
        if(this.props.anchor)
            this.props.anchor.scrollIntoView({
                behavior: 'smooth',
                block: "start",
                inline: 'start'});
    }

    render() {
        return <Button  
                    style={(this.props.position === "left")?{left : "120px"}:{right:"20px"}}
                    color="blue" 
                    circular 
                    onClick={this.ScrollTo} 
                    className="btnTop">
                    <i 
                        style={{margin: "0"}} 
                        className={(this.props.direction === "left")? "icon chevron left" : "icon chevron up"}
                        >
                    </i>
                </Button>
    }

}

export default ScrollTo;
