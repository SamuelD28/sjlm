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
        return <button  
                    style={(this.props.position === "left")?{left : "120px"}:{right:"20px"}}
                    onClick={this.ScrollTo} 
                    className="btnTop btn-primary">
                    <i 
                        style={{margin: "0"}} 
                        className={(this.props.direction === "left")? "icon chevron left" : "icon chevron up"}
                        >
                    </i>
                </button>
    }

}

export default ScrollTo;
