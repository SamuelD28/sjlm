import React from 'react';

import FormComponent from '../FormComponent.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import {default as MenuSchema} from '../../formSchema/menuSchema.js';

class MenuCards extends FormComponent{

    constructor(props)
    {
        super(props);
        this.PutConfig = MenuSchema.GetBindedPutConfig(props.menu._id);
        this.PutConfig.modalOpener = this.ModalOpener;
        this.Inputs = MenuSchema.GetBindedInputs(props.menu);
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
        Inputs={this.Inputs}
        FormStatus={new FormStatus()}
        FormConfig={this.PutConfig}
        RefreshDataSet={this.props.RefreshDataSet}
        />
    )}
}

export default MenuCards;