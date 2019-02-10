//Library and modules
import React, { Component } from 'react';
import { default as PagesSchema } from '../../formSchema/pagesSchema.js';

//Components
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';

/**
 * Component used to open up a modal
 * form for editing an existing page
 */
class PagesCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.PutConfig = PagesSchema.GetBindedPutConfig(props.page._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }
    
    /**
     * UI that triggers the opening of the form
     */
    ModalOpener = () => {
        return  <div className="item-card-shadow img-fit anim-bounce-up">
                    <i className="icon file text"></i>
                    <br />
                    <span>{this.props.page.PageTitle.toUpperCase()}</span>
                </div>
    }

    render() {
        return  <FormGenerator
                    Inputs={PagesSchema.GetBindedInputs(this.props.page)}
                    FormConfig={this.PutConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={PagesSchema.GetBindedEditor(this.props.page.PageContent)}
                    RefreshDataSet={this.props.RefreshDataSet}
                    />
    }
}
export default PagesCard;
