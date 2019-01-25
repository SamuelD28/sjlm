//Library and modules
import React, { Component } from 'react';
import { default as PagesSchema } from '../../formSchema/pagesSchema.js';

//Components
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';

/**
 * Component used to open up a modal
 * form for adding a new page
 */
class PagesCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.PostConfig = PagesSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
    }

    /**
     * UI that triggers the opening of the form
     */
    ModalOpener = () => {
        return  <div className="cardContainer cardOverlay">
                    <div className="cardOverlayBtn">
                        <i className="icon plus"></i>
                        <h4>Ajouter</h4>
                    </div>
                </div>
    }

    render() {
        return  <FormGenerator
                    Inputs={PagesSchema.GetEmptyInputs()}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={PagesSchema.GetEmptyEditor()}
                    RefreshDataSet={this.props.RefreshDataSet}
                    />
    }
}

export default PagesCreate;
