import React, {Component} from 'react';

import PageHeader from '../pageHeader/pageHeader.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import {default as MailSchema} from '../../formSchema/mailSchema.js';

class ContactForm extends Component{

    render(){
    return  <div style={{padding: "2vw"}}>
                <PageHeader title="Joindre" category="Contact"/>
                <div style={{marginTop: "2vw"}}>
                    <FormGenerator
                        Inputs={MailSchema.GetEmptyInputs()}
                        FormConfig={MailSchema.GetPostConfig()}
                        FormStatus={new FormStatus()}
                        TextEditor={MailSchema.GetEmptyEditor()}
                        />
                </div>
            </div>
    }
}

export default ContactForm;