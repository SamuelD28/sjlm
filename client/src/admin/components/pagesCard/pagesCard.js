//Initial Declaration and state initialisation
import React, { Component } from 'react';

//Css Module import
import CSSModules from 'react-css-modules';
import styles from './pagesCard.module.css';

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
            <div>
                <h4>{this.props.page.PageTitle.toUpperCase()}</h4>
            </div>
        )
    }

    render() {
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
export default CSSModules(PagesCard, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
