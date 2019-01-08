//Initial Declaration and state initialisation
import React, { Component } from 'react';

import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as VerbalSchema } from '../../formSchema/verbalSchema.js';

class VerbalCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.PutConfig = VerbalSchema.GetBindedPutConfig(props.verbal._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }

    ModalOpener = () => {
        return (
            <div className="pagesCard">
                <h4>Proces verbaux</h4>
            </div>
        )
    }

    render(){
        return (
            <FormGenerator
                Inputs={VerbalSchema.GetBindedInputs(this.props.verbal)}
                FormConfig={this.PutConfig}
                FormStatus={new FormStatus()}
                RefreshDataSet={this.props.RefreshDataSet}
                />
        )
    }
}

export default VerbalCard;
