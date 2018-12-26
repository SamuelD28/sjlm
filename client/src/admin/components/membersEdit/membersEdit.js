//Initial Declaration and importation
import React, {Component} from 'react';
import {default as MemberSchema} from '../../formSchema/memberSchema.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';

class MembersEdit extends Component{

    //Initilaise the form data with a new reference to the member data object
    constructor(props)
    {
        super(props);
        this.PutConfig = MemberSchema.GetBindedPutConfig(props.member._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }

    ModalOpener = () =>
    {
        return(
        <div className="cardOverlay cardEdit">
            <div className="cardOverlayBtn">
                <i className="icon edit"></i>
                <h4>Modifier</h4>
            </div>
        </div>
        )
    }

    render(){
    return(
        <FormGenerator
            Inputs={MemberSchema.GetBindedInputs(this.props.member)}
            FormConfig={this.PutConfig}
            FormStatus={new FormStatus()}
            TextEditor={MemberSchema.GetBindedEditor(this.props.member.PersonnalNote)}
            RefreshDataSet={this.props.RefreshDataSet}
            />
    )}
}

export default MembersEdit;