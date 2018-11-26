import React, {Component} from 'react';
import {Form, Modal, Grid} from 'semantic-ui-react';

import Ajax from '../../../shared/ajax.js';
import Translate from '../../../shared/translate.js';

import FormError from '../FormError/formError.js';
import TextEditor from '../TextEditor/textEditor.js';
import TextInput from '../TextInput/textInput.js';
import ToggleInput from '../ToggleInput/toggleInput.js';
import SelectInput from '../SelectInput/selectInput.js';
import FileInput from '../FileInput/fileInput.js';

class FormGenerator extends Component
{
    constructor(props){
        super(props);
        this.state = Object.assign({}, this.props.FormSchema);
        console.log(this.state);
    }

    handleSubmit = async(inputs, formConfig) =>
    {
        if(inputs === null || inputs === undefined)
            throw new Error("Inputs must be specified in order to process the form");

        if(formConfig === null || formConfig === null)
            throw new Error("Form Configuration must be specified in order to process the form");

        await this.updateStateKey("FormStatus", {loading: true});

        let formData = await this.handleFormData(inputs);
        let request = await this.handleRequest(formData, formConfig);

        this.handleRequestResponse(request);
    }

    handleFormData = (inputs) =>
    {
        let formData = {};
        inputs.map((input, index) => {
            return formData = Object.assign({}, formData, {[input.name] : input.value});
        });
        return formData;
    }

    handleRequest = async(formData, formConfig) =>
    {
        let request;
        let url = formConfig.url;
        let id = formConfig.elementId;
        switch (formConfig.httpRequest.toUpperCase()){
            case "POST" : request = await Ajax.PostData(url, formData); break;
            case "PUT"  : request = await Ajax.PutData(url + id , formData); break;
            case "DELETE" : request = await Ajax.DeleteData(url + id); break;
            default: throw new Error("The http request type must be specified under the FormConfig Object");
        }
        return request;
    }

    handleRequestResponse = async(request) =>
    {
        if(!request.success){
            let errors = [];

            Object.keys(request.data.errors).map((key, index) =>
            {
                let requestAlias = request.data.errors[key];
                return  errors.push(
                            Translate.ModelKey(requestAlias.path) + " " +
                            Translate.ModelError(requestAlias.kind, requestAlias.properties)
                );
            });

            this.updateStateKey("FormStatus" , {loading : false, errors : errors});
        }
        else{
            await this.updateStateKey("FormStatus" , {loading: false});
            this.HandeClose();
        }
    }

    handleChangeInTextEditor = (TextEditor, inputName) =>
    {
        if(TextEditor.current === null)
            throw new TypeError("Null, Reference to a text editor must be passed as a parameter");

        const editor = TextEditor.current.getEditor();
        const editorFull = TextEditor.current.makeUnprivilegedEditor(editor);

        let targetObject ={
            name: inputName,
            value: editorFull.getText(),
            html: editorFull.getHTML()
        }

        this.handleChange(targetObject);
    }

    handleChange = async(target) =>
    {
        let inputName = target.name;
        let inputValue = (target.value != null) ? target.value: target.checked;
        this.updateStateInputs(inputName, {value : inputValue});
    }

    handleOpen = () =>
    {
        this.updateStateKey("FormStatus" , {open : true});
    }

    HandeClose = async() =>
    {
        await this.updateStateKey("FormStatus" , {open : false});
        this.ClearForm();
    }

    ClearForm = async() =>
    {
        if(this.state.TextEditor !== undefined)
            await this.updateStateKey("TextEditor", {value : "" , html : ""});

        let Inputs = Array.from(this.state.Inputs);
        if(Inputs.length !== 0){
            Inputs.map((input, index) => {

                input.value =   (input.type === "toggle")? false:
                                (input.type === "uploader")? []: "";

                return this.handleChange(input);
            });
        }

        if(this.state.FormStatus !== undefined)
            await this.updateStateKey("FormStatus" , {errors : []});
    }

    updateStateKey = (stateKey, stateObj) =>
    {
        this.setState({[stateKey.valueOf()] : Object.assign({}, this.state[stateKey.valueOf()], stateObj)});
    }

    updateStateInputs = (inputName, inputValueObj) =>
    {
        let index = this.state.Inputs.findIndex(input => input.name === inputName);
        let Inputs = Array.from(this.state.Inputs);
        Inputs[index] = Object.assign({}, Inputs[index], inputValueObj);
        this.setState({Inputs : Inputs});
    }

    //Need to find a way to generate it only one time when the node is beeing mount.
    GenerateForm = (FormSchema) =>
    {
        if(FormSchema.Inputs === undefined)
            throw new TypeError("The Form Schema must contain a definition for the inputs to display");

        let textEditor = FormSchema.TextEditor;
        let inputs = FormSchema.Inputs;

        if(textEditor === undefined)
            return this.GenerateLayoutWithoutTextEditor(inputs);
        else
            return this.GenerateLayoutWithTextEditor(inputs, textEditor);
    }

    GenerateLayoutWithoutTextEditor = (inputs) =>
    {
        return(
        <Grid>
            <Grid.Column width={16}>
                <FormError errorHandler={this.state.FormStatus} />
                {this.GenerateFormInputs(inputs)}
            </Grid.Column>
        </Grid>)
    }

    GenerateLayoutWithTextEditor = (inputs, textEditor) =>
    {
        return(
        <Grid>
            <Grid.Column width={8}>
                <FormError errorHandler={this.state.FormStatus} />
                {this.GenerateFormInputs(inputs)}
            </Grid.Column>
            <Grid.Column width={8}>
                <TextEditor input={textEditor} handleChange={this.handleChangeInTextEditor}/>
            </Grid.Column>
        </Grid>)
    }

    GenerateFormInputs = (inputs) =>
    {
        let groups = this.GenerateFormGroups(inputs);
        return  Object.keys(groups).map((key, index) =>{
                return(
                    <Form.Group key={index}>
                        {this.GenerateFormFields(groups[key])}
                    </Form.Group>
                )
        });
    }

    GenerateFormGroups = (inputs) =>
    {
        let groups = {};
        let negativeCount = 0;
        inputs.map((input, index) =>{

            if(input.group === undefined){
                input.group = negativeCount;
                negativeCount--;
            }

            if(groups[input.group] === undefined)
                groups[input.group] = [];

            return groups[input.group].push(input);
        });
        return groups;
    }

    GenerateFormFields = (inputs) =>
    {
        return inputs.map((input, index) => {
            switch(input.type){
                case "text": return <TextInput key={index} input={input} handleChange={this.handleChange}/>;
                case "toggle": return <ToggleInput key={index} input={input} handleChange={this.handleChange}/>;
                case "uploader": return <FileInput key={index} input={input} updateStateInputs={this.updateStateInputs} />;
                case "select": return <SelectInput key={index} input={input} handleChange={this.handleChange}/>;
                case "texteditor" : return <TextEditor key={index} input={input} handleChange={this.handleChangeInTextEditor}/>;
                default: throw new Error("Input Type must be specified.");
            }
        });
    }

    render()
    {
    if(this.state !== undefined)
    return(
    <Modal
    size={(this.state.FormConfig !== undefined)? this.state.FormConfig.size: "small"}
    open={this.state.FormStatus.open}
    onClose={this.HandeClose}
    trigger={
    <div onClick={this.handleOpen} className="cardContainer">
        <div className="cardOverlay">
            <div className="cardOverlayBtn">
                <i className="icon plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>
    </div>
    }>
    <Modal.Header>{(this.state.FormConfig !== undefined)? this.state.FormConfig.title : "Formulaire"}</Modal.Header>
        <Modal.Content>
            <Form loading={this.state.FormStatus.loading}>
                {this.GenerateForm(this.state)}
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <button style={{float: "left"}} onClick={this.HandeClose} className="btn btn-danger">
                Annuler
            </button>
            <button onClick={() => {this.handleSubmit(this.state.Inputs, this.state.FormConfig)}} className="btn btn-primary">
                Ajouter
            </button>
        </Modal.Actions>
    </Modal>)}
}

export default FormGenerator;