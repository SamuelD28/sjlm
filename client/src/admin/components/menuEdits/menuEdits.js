import React, {Component} from 'react';
import { default as MenuSchema } from '../../formSchema/menuSchema.js';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';

class MenuEdits extends Component{
    
    constructor(props){
        super(props);
        this.state = {};
        this.PutConfig = MenuSchema.GetBindedPutConfig(props.menu._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }
    
    ModalOpener = () => {
        return <span> - {this.props.menu.Title}</span>
    }
    
    render(){
        return <FormGenerator
                    Inputs={MenuSchema.GetBindedInputs(this.props.menu)}
                    FormStatus={new FormStatus()}
                    FormConfig={this.PutConfig}
                    RefreshDataSet={this.props.RefreshDataSet}
                    />
    }
}

export default MenuEdits;