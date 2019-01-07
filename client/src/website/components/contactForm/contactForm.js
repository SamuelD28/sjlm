import React, {Component} from 'react';
import {Form, Label, Input} from 'semantic-ui-react';

import CSSModules from 'react-css-modules';
import style from './contactForm.module.css';
import PageHeader from '../pageHeader/pageHeader.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import {default as MailSchema} from '../../formSchema/mailSchema.js';

class ContactForm extends Component{

    constructor(props){
        super(props);
    }

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

export default CSSModules(ContactForm, style, {handleNotFoundStyleName: "log", allowMultiple: true});