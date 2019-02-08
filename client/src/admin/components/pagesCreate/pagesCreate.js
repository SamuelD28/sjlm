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
        return  <div className="rounded new-dataset-btn anim-bounce-up medium-gutters">
                    <i style={{margin: "0"}}className="icon plus"></i>
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
