import React from 'react';

import FormComponent from '../FormComponent.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import {default as MenuSchema} from '../../formSchema/menuSchema.js';
import {Accordion, Icon} from 'semantic-ui-react';

import CSSModules from 'react-css-modules';
import styles from './menuCards.module.css';

class MenuCards extends FormComponent{

    constructor(props)
    {
        super(props);
        this.state = {};
        this.PutConfig = MenuSchema.GetBindedPutConfig(props.menu._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }

    handleAccordionClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }

    DisplaySubmenu = (submenu) => {
        if (submenu.length > 0)
            return submenu.map((menu) => (
                <div styleName="menuTitle" key={menu._id}>
                    <FormGenerator
                        Inputs={this.Inputs}
                        FormStatus={new FormStatus()}
                        FormConfig={this.PutConfig}
                        RefreshDataSet={this.props.RefreshDataSet}
                        />
                </div>
            ));
        else
            return  <div styleName="menuTitle">
                        Aucun menu présent
                    </div>
    }

    RefreshInputs = () =>
    {
        this.Inputs = MenuSchema.GetBindedInputs(this.props.menu);
    }

    /**
     * Function that display the ui for opening up the modal form
     */
    ModalOpener = () =>
    {
        if(this.props.menu.Icon !== undefined)
            return  <span>
                        {this.props.menu.Title.toUpperCase()} <i style={{float: "right"}}className={`icon ${this.props.menu.Icon}`}></i>
                    </span>
        else
            return <span>{this.props.menu.Title}</span>
    }

    render(){
    this.RefreshInputs();

    console.log("Rendering Menu Cards");
    console.log(this.Inputs);

    const { activeIndex } = this.state;
    if (this.props.menu.Principal)
        return  <Accordion
                    styled
                    fluid>
                    <Accordion.Title
                        active={activeIndex === this.props.index}
                        index={this.props.index}
                        onClick={this.handleAccordionClick}>
                        <div styleName="accordionTitle">
                            <Icon name='dropdown' />
                            <FormGenerator
                                Inputs={this.Inputs}
                                FormStatus={new FormStatus()}
                                FormConfig={this.PutConfig}
                                RefreshDataSet={this.props.RefreshDataSet}
                                />
                        </div>
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === this.props.index}>
                            {this.DisplaySubmenu(this.props.menu.SubMenu)}
                    </Accordion.Content>
                </Accordion>
    }
}

export default CSSModules(MenuCards, styles, {handleNotFoundStyleName: "log", allowMultiple: true});