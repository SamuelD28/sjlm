//Initial Declaration and importation
import React, { Component } from 'react';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as MenuSchema } from '../../formSchema/menuSchema.js';
import {Button} from 'semantic-ui-react';

/**
 * Component responsible for creating new
 * menu for the website
 */
class MenuCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.PostConfig = MenuSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
    }
    
    /**
     * UI that triggers a modal form used
     * to add a new menu
     */
    ModalOpener = () => {
        return <Button color="teal" className="rounded-right">Ajouter un menu</Button>
    }

    render() {
        return (
            <FormGenerator
                    Inputs={MenuSchema.GetEmptyInputs()}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    RefreshDataSet={this.props.RefreshDataSet}/>
        )
    }
}

export default MenuCreate;
