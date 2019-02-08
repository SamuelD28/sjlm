//Initial Declaration and importation
import React, { Component } from 'react';
import { default as MemberSchema } from '../../formSchema/memberSchema.js';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import MembersCard from '../../components/membersCard/membersCard.js';

/**
 * Component used to open up a modal form
 * with information about a council member
 * with the possibility of modifying the values
 */
class MembersEdit extends Component {

    constructor(props) {
        super(props);
        this.PutConfig = MemberSchema.GetBindedPutConfig(props.member._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }

    /**
     * Ui used to trigger the opening of the form
     */
    ModalOpener = () => {
        return  <MembersCard members={this.props.member}/>
    }

    render() {
        return  <FormGenerator
                    Inputs={MemberSchema.GetBindedInputs(this.props.member)}
                    FormConfig={this.PutConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={MemberSchema.GetBindedEditor(this.props.member.PersonnalNote)}
                    RefreshDataSet={this.props.RefreshDataSet}
                    />
    }
}

export default MembersEdit;
