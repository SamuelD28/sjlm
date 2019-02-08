//Library and modules
import React, { Component } from 'react';
import { default as NewsSchema } from '../../formSchema/newsSchema.js';

//Components
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';

/**
 * Component used to open up a modal form
 * that can add a new news in the database
 */
class NewsCreate extends Component {

    constructor(props) {
        super(props);
        this.PostConfig = NewsSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
    }
    
    /**
     * UI that triggers the opening of 
     * the modal form
     */
    ModalOpener = () => {
        return  <div className="rounded new-dataset-btn anim-bounce-up medium-gutters">
                    <i style={{margin: "0"}} className="icon plus"></i>
                </div>
    }

    render() {
        return  <FormGenerator
                    Inputs={NewsSchema.GetEmptyInputs()}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={NewsSchema.GetEmptyEditor()}
                    RefreshDataSet={this.props.RefreshDataSet}
                    />
    }
}

export default NewsCreate;
