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
        if(this.props.menu.Icon !== undefined){
            return(
                <span>
                    {this.props.menu.Title.toUpperCase()} <i style={{float: "right"}}className={`icon ${this.props.menu.Icon}`}></i>
                </span>)
        }
        else{
            return <span>{this.props.menu.Title}</span>
        }
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