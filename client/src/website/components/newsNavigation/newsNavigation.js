import React, {Component} from 'react';
import {Transition, Button} from 'semantic-ui-react';

class NewsNavigation extends Component{
    
    ScrollToSection = (e, target) => {
        e.preventDefault();
        let target_EL = document.getElementById(target);
        if(target_EL !== undefined && target_EL !== null){
            target_EL.scrollIntoView({
                behavior: 'smooth',
                block: "start",
                inline: 'start'
            });
        }
    }
    
    render(){
         return <Transition
                    animation="fade right"
                    duration={1000}
                    transitionOnMount={true}>
                    <div className="component-card medium-gutters">
                        <h1>Naviguez</h1>
                        <div style={{display: "flex", flexWrap: "wrap"}}>
                        { Object.keys(this.props.targets).reverse().map((target, index) => (
                            <Transition
                                key={index} 
                                duration={500}
                                visible={this.props.itemsVisible[index]}
                                animation="fade right"
                                >
                                    <Button style={{marginBottom :".25vw"}} onClick={(e) => this.ScrollToSection(e, target)}>
                                    {target}
                                    </Button>
                            </Transition>
                        ))}
                        </div>
                    </div>
                </Transition>
    }    
    
}

export default NewsNavigation;