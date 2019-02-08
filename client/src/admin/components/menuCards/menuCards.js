//Library and modules
import React, {Component} from 'react';
import { default as MenuSchema } from '../../formSchema/menuSchema.js';

//Components
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { Accordion, Icon } from 'semantic-ui-react';
import MenuEdits from '../menuEdits/menuEdits.js';

//CSS modules
import CSSModules from 'react-css-modules';
import styles from './menuCards.module.css';

class MenuCards extends Component{
    
    constructor(props){
        super(props);
        this.state = {};
        this.PutConfig = MenuSchema.GetBindedPutConfig(props.menu._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }
    
    /**
     * Handle the bahavior when an accordion
     * is clicked by the user
     */
    handleAccordionClick = (index) => {
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }
    
    /**
     * Function that display the ui for opening up the modal form
     */
    ModalOpener = () => {
        return <span className="space-between">
                    {this.props.menu.Title.toUpperCase()} <i className={`icon ${this.props.menu.Icon}`}></i>
                </span>
    }
    
    /**
     * Method that display all the menu contained within 
     * a principal menu
     */
    DisplaySubmenu = () =>{
        return  this.props.menu.SubMenu.map((submenu, index) =>(
                    <div styleName="accordionContent" key={submenu._id}>
                        <MenuEdits 
                            menu={submenu} 
                            RefreshDataSet={this.props.RefreshDataSet}
                            />
                    </div>
                ))
    }
    
    render() {
        const { activeIndex } = this.state;
        return  <Accordion styled fluid>
                    <Accordion.Title
                        active={activeIndex === this.props.index}
                        index={this.props.index}>
                        <div styleName="accordionTitle">
                            <Icon name='dropdown' 
                                onClick={() => this.handleAccordionClick(this.props.index)}
                                />
                            <FormGenerator
                                Inputs={MenuSchema.GetBindedInputs(this.props.menu)}
                                FormStatus={new FormStatus()}
                                FormConfig={this.PutConfig}
                                RefreshDataSet={this.props.RefreshDataSet}
                                />
                        </div>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === this.props.index}>
                        {this.DisplaySubmenu()}
                    </Accordion.Content>
                </Accordion>
    }
}
export default CSSModules(MenuCards, styles, { handleNotFoundStyleName: "log", allowMultiple: true });
