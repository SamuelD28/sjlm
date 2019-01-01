//Initial Declaration and state initialisation
import React, { Component } from 'react';

import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as PagesSchema } from '../../formSchema/pagesSchema.js';


class PagesCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.PutConfig = PagesSchema.GetBindedPutConfig(props.page._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }

    ModalOpener = () => {
        return (
            <div className="pagesCard">
                <h4>{this.props.page.PageTitle.toUpperCase()}</h4>
            </div>
        )
    }

    render(){
        return (
            <FormGenerator
                Inputs={PagesSchema.GetBindedInputs(this.props.page)}
                    FormConfig={this.PutConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={PagesSchema.GetBindedEditor(this.props.page.PageContent)}
                    RefreshDataSet={this.props.RefreshDataSet}
                />
        )
    }
}
export default PagesCard;
