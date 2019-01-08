//Initial Declaration and importation
import React, { Component } from 'react';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as VerbalSchema } from '../../formSchema/verbalSchema.js';

//Component responsible for creating new page
class VerbalCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.PostConfig = VerbalSchema.GetPostConfig();
    }

    render() {
        return (
            <FormGenerator
                Inputs={VerbalSchema.GetEmptyInputs()}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    RefreshDataSet={this.props.RefreshDataSet}
                />
        )
    }
}

export default VerbalCreate;
