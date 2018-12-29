//Initial Declaration and importation
import React, { Component } from 'react';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as PagesSchema } from '../../formSchema/pagesSchema.js';

//Component responsible for creating new page
class PagesCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.PostConfig = PagesSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
    }

    ModalOpener = () => {
        return (
            <div className="cardContainer cardOverlay">
            <div className="cardOverlayBtn">
                <i className="icon plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>
        )
    }

    render() {
        return (
            <FormGenerator
                Inputs={PagesSchema.GetEmptyInputs()}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={PagesSchema.GetEmptyEditor()}
                    RefreshDataSet={this.props.RefreshDataSet}
                />
        )
    }
}

export default PagesCreate;
