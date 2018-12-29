import React, { Component } from 'react';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as MemberSchema } from '../../formSchema/memberSchema.js';

//Component responsible for creating new page
class MembersCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.PostConfig = MemberSchema.GetPostConfig();
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
                    Inputs={MemberSchema.GetEmptyInputs()}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={MemberSchema.GetEmptyEditor()}
                    RefreshDataSet={this.props.RefreshDataSet}
                    />
        )
    }
}

export default MembersCreate;
