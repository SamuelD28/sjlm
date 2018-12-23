import React from 'react';

import FormComponent from '../FormComponent.js';
import Ajax from '../../../shared/ajax.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import MenuSchema from '../../formSchema/menuSchema.js';

class MenuCards extends FormComponent{

    constructor(props)
    {
        super(props);
        //Creates a new menu Schema used by the form generator
        this.menuSchema = new MenuSchema();
        //Sets the ui that will be displayed to open up the modal form
        this.menuSchema.putConfig.modalOpener = this.ModalOpener;
        //Bind the inputs to the current menu
        this.menuSchema.BindInputs(props.menu);
        //Bind the menu id to the form id. Used by the form generator for put request
        this.menuSchema.BindFormId(props.menu._id);
    }

    /**
     * Function that display the ui for opening up the modal form
     */
    ModalOpener = () =>
    {
    return(
        <div>
            <i className={`icon ${this.props.menu.Icon}`}></i>  {this.props.menu.Title.toUpperCase()}
        </div>)
    }

    render(){
    return(
        <FormGenerator
        Inputs={this.menuSchema.menuInputs}
        FormStatus={new FormStatus()}
        FormConfig={this.menuSchema.putConfig}/>
    )}
}

export default MenuCards;