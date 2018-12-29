//Initial Declaration and importation
import React, { Component } from 'react';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as MenuSchema } from '../../formSchema/menuSchema.js';

//Component responsible for creating new page
class MenuCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.PostConfig = MenuSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
    }

    ModalOpener = () => {
        return (
            <div className="cardOverlay">
            <div className="cardOverlayBtn">
                <i className="icon plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>)
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
