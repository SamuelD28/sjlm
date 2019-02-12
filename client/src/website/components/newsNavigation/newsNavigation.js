import React, {Component} from 'react';
import {Transition, Button} from 'semantic-ui-react';

class NewsNavigation extends Component{
    
    ScrollToSection = (e, id) => {
        e.preventDefault();
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth',
            block: "start",
            inline: 'start'
        });
    }
    
    render(){
         return <Transition
                    animation="fade right"
                    duration={1000}
                    transitionOnMount={true}>
                    <div className="component-card medium-gutters">
                        <h1>Naviguez</h1>
                        <div>
                        { Object.keys(this.props.targets).reverse().map((target) => (
                            <Button onClick={(e) => this.ScrollToSection(e, target)}>
                                {target}
                            </Button>
                        ))}
                        </div>
                    </div>
                </Transition>
    }    
    
}

export default NewsNavigation;