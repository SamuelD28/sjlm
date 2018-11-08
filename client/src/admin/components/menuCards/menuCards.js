import React,{Component} from 'react';
import {Accordion} from 'semantic-ui-react';

class MenuCards extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    
    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }
    
    DisplayMenuCards = () => 
    {
        const { activeIndex } = this.state;
        if(this.props.menus !== undefined)
        return this.props.menus.map((menu, index)=>(
        <Accordion fluid styled style={{margin: '1vw 0'}} key={index}>
            <Accordion.Title active={activeIndex === index}  index={index} onClick={this.handleClick}>
                  <i className="icon dropdown" ></i>
                  <h3 style={{display: 'inline'}}>{menu.Title}</h3>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
                <p>This is a test</p>
            </Accordion.Content>
        </Accordion>
        ))          
    }
    
    render(){
    return(
    <div>
        {this.DisplayMenuCards()}
    </div>
    )}
}

export default MenuCards;