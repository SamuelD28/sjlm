import React, { Component } from 'react';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as MemberSchema } from '../../formSchema/memberSchema.js';

/**
 * Component used to open up a modal form
 * with information about a council memmber.
 * 
 */
class MembersCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.PostConfig = MemberSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
    }
    
    
    /**
     * UI used as the trigger to open up
     * the modal form
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
