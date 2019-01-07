import React, { Component } from 'react';

//Library used by the generator
import Ajax from '../ajax.js';
import Translate from '../translate.js';

//Helper Objects and Classes
import FormSchema from './formSchema.js';
import FormConfig from './formConfig.js';
import FormStatus from './formStatus.js';
import InputSchema from './inputSchema.js';
import EditorSchema from './editorSchema.js';

//Components used for the form generation
import { Form, Modal, Grid, Button } from 'semantic-ui-react';
import FormError from './FormError/formError.js';
import TextEditor from './TextEditor/textEditor.js';
import TextInput from './TextInput/textInput.js';
import ToggleInput from './ToggleInput/toggleInput.js';
import SelectInput from './SelectInput/selectInput.js';
import FileInput from './FileInput/fileInput.js';
import ConfirmModal from './ConfirmModal/confirmModal.js';
import DatePicker from './DatePicker/datePicker.js';

class FormGenerator extends Component {
    /**
     * Constructor for the form generator. The constructor
     * needs a form config, form status and at least one
     * input in order to work. Otherwise the component
     * will throw an error. The text editor is optionnal.
     */
    constructor(props) {
        super(props);

        //Verification that all the required props are there
        if (props.Inputs === undefined || props.FormConfig === undefined || props.FormStatus === undefined)
            throw new TypeError("Missing required props for the form generator");

        this.RefreshDataSet = props.RefreshDataSet;

        this.state = {
            FormConfig: Object.assign({}, props.FormConfig),
            FormStatus: Object.assign({}, props.FormStatus),
            Inputs: props.Inputs,
            TextEditor: props.TextEditor
        };
        this.CloneInputs();
    }

    /**
     * Method that clones all the inputs inside the form and place them
     * in a property called initial data.
     */
    CloneInputs = () => {
        this.InitialInputs = Array.from(this.state.Inputs);

        if (this.state.TextEditor !== undefined)
            this.InitialEditor = Object.assign({}, this.state.TextEditor);
    }

    /**
     * Method that handle the submission of the form based on the inputs and configuration
     * inputs : Inputs used in the form
     * formConfig : Configuration used to determine wich action to take for submitting the form
     */
    HandleSubmit = async() => {
        let formData = await this.ParseFormData();
        let request = await this.HandleRequest(formData);
        this.HandleRequestResponse(request);
    }

    /**
     * Method that extract the value out of the inputs in order to process the information in a database
     * inputs : Inputs to retrieve the data form
     * return : Raw form data used by the backend server. JSON format.
     */
    ParseFormData = () => {
        let formData = {};
        //Extracts all the inputs data from the form
        this.state.Inputs.map((input, index) => {
            if (!input.disabled(this.state.Inputs))
                formData = Object.assign({}, formData, {
                    [input.name]: input.value
                });
            return formData;
        });
        //Extract the data from the form editor. We dont verify that the html key has
        //a value because it is linked to the value key. if value key has a value then
        //we can assume html key has a value haswell
        let textEditor = this.state.TextEditor;
        if (textEditor !== undefined) {
            formData = Object.assign({},
                formData, {
                    [textEditor.name]: textEditor.value,
                });
        }
        return formData;
    }

    /**
     * Method responsible for making the request to a database
     * formData : Data to trough the request
     * p_httpRequest : Optionnal argument used to explicitly specified the
     * type of request to make
     */
    HandleRequest = async(formData, p_httpRequest) => {

        await this.UpdateStateKey("FormStatus", { loading: true });

        //Quick fix for using a delete request. Need to be reworked
        let httpRequest =
            (p_httpRequest !== undefined) ?
            p_httpRequest :
            this.state.FormConfig.httpRequest;

        let request;
        let url = this.state.FormConfig.url;
        let id = this.state.FormConfig.elementId;
        switch (httpRequest) {
        case "post":
            request = await Ajax.PostData(url, formData);
            break;
        case "put":
            request = await Ajax.PutData(url + id, formData);
            break;
        case "delete":
            request = await Ajax.DeleteData(url + id);
            break;
        default:
            throw new Error("The http request type must be specified under the FormConfig Object");
        }
        return request;
    }

    /**
     * Method that handle the response from the server.
     * request : Request that was sent back from the server
     */
    HandleRequestResponse = async(request) => {

        if (!request.success) {

            if (request.data.errors !== undefined)
                this.PushErrorsToFormStatus(request.data.errors);
            else if (request.data.kind !== undefined)
                this.PushErrorsToFormStatus({ 0: request.data });
            else
                this.UpdateStateKey("FormStatus", { errors: ["Une erreur c'est produite."] });

        }
        else {
            this.CloneInputs();
            this.RefreshDataSet();
            this.CloseModal();

            if (this.state.FormConfig.httpRequest === "post")
                this.ClearForm();
        }

        this.UpdateStateKey("FormStatus", { loading: false});
    }

    /**
     * Method that push the errors send from the server to the
     * form status errors key and update the state.
     */
    PushErrorsToFormStatus = (errors) => {
        let errorList = [];
        for (var key in errors) {
            errorList.push(
                Translate.ModelKey(errors[key].path) + " " + Translate.ModelError(errors[key].kind, errors[key].properties)
            )
        }
        this.UpdateStateKey("FormStatus", { errors: errorList });
    }

    /**
     * Method used to handle the change in a quill text editor
     * textEditor : React ref to the text editor. Mendatory in order to retrieve the information
     * inputName : Name of the text editor that triggered the change
     * target : Optionnal parameter, represents an already made target object. Used
     * when using simple texte edtior that his based on the the textarea
     */
    HandleChangeEditor = (TextEditor, inputName) => {

        let targetObject;
        if (TextEditor.current !== null) {
            const editor = TextEditor.current.getEditor();
            const editorFull = TextEditor.current.makeUnprivilegedEditor(editor);
            targetObject = {
                name: inputName,
                value: editorFull.getHTML(),
            }
        }
        this.UpdateStateKey("TextEditor", targetObject);
        this.MarkFormAsModified();
    }

    /**
     * Method used to handle change in text area input.
     * target : event object triggered by the on change listener
     */
    HandleChangeTextArea = (target) => {
        let targetObject = {
            name: target.name,
            value: target.value
        }
        this.UpdateStateKey("TextEditor", targetObject);
        this.MarkFormAsModified();
    }

    /**
     * Method for handling changes in a datepicker input
     */
    HandleDateChange = (date, inputName) =>
    {
        const target = {
            name : inputName,
            value :  date
        };

        this.HandleChange(target);
    }

    /**
     * Method used to handle the change made in a form input
     * target : The input object that triggered the event
     */
    HandleChange = (target) => {
        // console.log(this.state.FormStatus);
        let inputName = target.name;
        let inputValue = (target.value != null) ? target.value : target.checked;
        this.UpdateStateInputs(inputName, { value: inputValue });
    }

    /**
     * Method used to handle the cancel click
     */
    HandleCancel = () => {
        this.setState({ "Inputs": this.InitialInputs });
        this.setState({ "TextEditor": this.InitialEditor });
        this.UpdateStateKey("FormStatus", { modified: false });
        this.CloseModal();
    }

    /**
     *  Method that handle the negative button click.
     *  Close the modal or delete the current dataset
     * from the database.
     */
    HandleNegativeAction = () => {
        if (this.state.FormConfig.httpRequest === "post")
            this.HandleCancel();
        else if (this.state.FormConfig.httpRequest === "put")
            this.UpdateStateKey("FormStatus", { openConfirm: true });
    }

    /**
     * Delete the current dataset from the database.
     */
    HandleDelete = async() => {

        await this.UpdateStateKey("FormStatus", {openConfirm : false});
        //Need to be reworked
        let request = await this.HandleRequest(null, "delete");
        this.HandleRequestResponse(request);
    }

    /**
     * Method used to handle the opening of the modal
     */
    HandleOpen = () => {
        this.UpdateStateKey("FormStatus", { open: true });
    }

    /**
     * Method used to handle the closing of the modal
     */
    CloseModal = () => {
        this.UpdateStateKey("FormStatus", { open: false, errors: [] });
    }

    /**
     * Method for closing the confirm dialog when deleting a dataset
     */
    CloseConfirm = () => {
        this.UpdateStateKey("FormStatus", { openConfirm: false });
    }

    /**
     * Method that clears all the data inside the inputs of the form
     */
    ClearForm = async() => {
        if (this.state.TextEditor !== undefined)
            await this.UpdateStateKey("TextEditor", { value: "", html: "" });

        this.state.Inputs.map((input, index) => {

            input.value = (input.type === "toggle") ? false :
                (input.type === "uploader") ? [] : "";

            return this.HandleChange(input);
        });

        if (this.state.FormStatus !== undefined)
            await this.UpdateStateKey("FormStatus", { errors: [] });
    }

    /**
     * Method that marks the form as modified. Enable the submit button.
     */
    MarkFormAsModified = () => {
        if (!this.state.FormStatus.modified)
            this.UpdateStateKey("FormStatus", { modified: true });
    }

    /**
     * Method that update a key inside the state Object
     * stateKey: Name of the key to update
     * stateObj : New state value for the specified key
     */
    UpdateStateKey = (stateKey, stateObj) => {
        this.setState({
            [stateKey.valueOf()]: Object.assign({}, this.state[stateKey.valueOf()], stateObj)
        });
    }

    /**
     * Method that update the inputs inside the state object
     * inputName : Name of the input to update
     * inputValueObj : New state value for the specified input name
     */
    UpdateStateInputs = async(inputName, inputValueObj) => {

        let index = this.state.Inputs.findIndex(input => input.name === inputName);
        let Inputs = Array.from(this.state.Inputs);
        Inputs[index] = Object.assign({}, Inputs[index], inputValueObj);
        await this.setState({ Inputs: Inputs });
        this.MarkFormAsModified();
    }

    /*-----Generator Methods for the Form. Responsible for the UI creation------*/

    /**
     * Method that generates the negative button for the modal form
     */
    GenerateNegativeButton = () => {
        if(this.state.FormConfig.modal)
        {
            return (
                <Button
                style={{float: "left"}}
                onClick={this.HandleNegativeAction}
                color="red"
                size="large"
                >
                <i  className={
                    (this.state.FormConfig.httpRequest === "put")
                    ? 'icon trash'
                    : 'icon close'}>
                </i>
                {
                    (this.state.FormConfig.httpRequest === "put") ?
                    'Supprimer' :
                    'Annuler'
                }
            </Button>)
        }
    }

    /**
     * Method that generates the postive button for the modal form
     */
    GeneratePositiveButton = () => {
        return (
            <Button
            style={{marginLeft: "auto"}}
            disabled={!this.state.FormStatus.modified}
            onClick={this.HandleSubmit}
            color="orange"
            size="large"
            >
            {(this.state.FormConfig.httpRequest === "put")
            ? 'Modifier'
            : 'Ajouter'}
        </Button>
        )
    }

    /**
     * Method that initiate the generation of the entire form generator component
     * Acts as the entry point.
     */
    Generate = () => {
        if (this.state.FormConfig.modal) {
            return this.CreateModalForm();
        }
        else
            return this.CreatePlainForm();
    }

    /**
     * Method that generate a plain form.
     */
    CreatePlainForm = () => {
        return (
            <Form
                style={{display : "flex", flexDirection: "column"}}
                loading={this.state.FormStatus.loading}>
                {this.GenerateForm()}
                {this.GenerateNegativeButton()}
                {this.GeneratePositiveButton()}
            </Form>
        )
    }

    /**
     * Method that generate a form that uses a modal to display its content
     */
    CreateModalForm = () => {
        return (
            <Modal
            centered={true}
            closeIcon
        size={this.state.FormConfig.size}
        open={this.state.FormStatus.open}
        onClose={this.HandleCancel}
        trigger={
        <div onClick={this.HandleOpen} className="cardContainer">
            {this.state.FormConfig.modalOpener()}
        </div>
        }>
        <Modal.Header>{this.state.FormConfig.title}</Modal.Header>
            <Modal.Content>
                <Form loading={this.state.FormStatus.loading}>
                    {this.GenerateForm()}
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <ConfirmModal
                    open={this.state.FormStatus.openConfirm}
                    trigger={this.GenerateNegativeButton}
                    NegativeAction={this.CloseConfirm}
                    PositiveAction={this.HandleDelete}
                />
                {this.GeneratePositiveButton()}
            </Modal.Actions>
        </Modal>
        )
    }

    /**
     * Method that generate the form components
     * formSchema : Schema used to generate the form. See the documentation for more information.
     */
    GenerateForm = () => {
        //Generate a from without a text edtior
        if (this.state.TextEditor === undefined) {
            return (
            <Grid>
                <Grid.Column width={16}>
                    <FormError errorHandler={this.state.FormStatus} />
                    {this.GenerateFormInputs()}
                </Grid.Column>
            </Grid>)
        }
        //Generate a form with a text editor
        else if(!this.state.TextEditor.inline){
            return  <Grid columns='equal'>
                        <Grid.Column>
                            <FormError errorHandler={this.state.FormStatus} /> { this.GenerateFormInputs() }
                        </Grid.Column>
                        <Grid.Column width={this.state.TextEditor.width}>
                            <TextEditor
                                input={this.state.TextEditor}
                                handleChangeEditor={this.HandleChangeEditor}
                                handleChangeTextArea={this.HandleChangeTextArea}
                                />
                        </Grid.Column>
                    </Grid>
        }
        else{
            return <Grid>
                        <Grid.Column width={16}>
                            <FormError errorHandler={this.state.FormStatus} />
                            { this.GenerateFormInputs() }
                            <TextEditor
                                input={this.state.TextEditor}
                                handleChangeEditor={this.HandleChangeEditor}
                                handleChangeTextArea={this.HandleChangeTextArea}
                                />
                        </Grid.Column>
                    </Grid>
        }
    }

    /**
     * Method that generate the form inputs
     */
    GenerateFormInputs = () => {
        let groups = this.GenerateFormGroups();
        return Object.keys(groups).map((key, index) => {
            return (

                <Form.Group key={index}>
                        {this.GenerateFormFields(groups[key])}
                    </Form.Group>
            )
        });
    }

    /**
     * Method that grouped all the inputs together based on their group key attribute.
     */
    GenerateFormGroups = () => {
        let groups = {};
        let negativeCount = 0;
        this.state.Inputs.map((input, index) => {

            if (input.group === undefined) {
                input.group = negativeCount;
                negativeCount--;
            }

            if (groups[input.group] === undefined)
                groups[input.group] = [];

            return groups[input.group].push(input);
        });
        return groups;
    }

    /**
     * Method that generate the appropriate input type based on their key type attribute. Add your own component here
     */
    GenerateFormFields = (groupedInputs) => {
        return groupedInputs.map((input, index) => {
            switch (input.type) {
            case "email":
            case "password":
            case "tel":
            case "number":
            case "text":
                return (
                    <TextInput
                                    key={index}
                                    inputs={this.state.Inputs}
                                    input={input}
                                    handleChange={this.HandleChange}/>
                );
            case "toggle":
                return (
                    <ToggleInput
                                    key={index}
                                    inputs={this.state.Inputs}
                                    input={input}
                                    handleChange={this.HandleChange}/>
                );
            case "date":
                return (
                    <DatePicker
                                    key={index}
                                    inputs={this.state.Inputs}
                                    input={input}
                                    handleDateChange={this.HandleDateChange} />
                );
            case "uploader":
                return (
                    <FileInput
                                    key={index}
                                    inputs={this.state.Inputs}
                                    input={input}
                                    updateStateInputs={this.UpdateStateInputs} />
                );
            case "select":
                return (
                    <SelectInput
                                    key={index}
                                    inputs={this.state.Inputs}
                                    input={input}
                                    handleChange={this.HandleChange}/>
                );
            default:
                throw new Error("No input correspond to the specified type.");
            }
        });
    }

    /**
     * This is a temporary workaround to fix a bug. This
     * is performance heavy and needs to be improved
     */
    componentWillReceiveProps(props)
    {
        this.setState({Inputs : props.Inputs});
    }

    render() {
        if (this.state !== undefined){
            return this.Generate();
        }
    }
}

export { FormGenerator, FormConfig, FormStatus, InputSchema, EditorSchema, FormSchema };
