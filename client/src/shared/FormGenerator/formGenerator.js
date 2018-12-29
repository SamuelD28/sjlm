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
import { Form, Modal, Grid } from 'semantic-ui-react';
import FormError from './FormError/formError.js';
import TextEditor from './TextEditor/textEditor.js';
import TextInput from './TextInput/textInput.js';
import ToggleInput from './ToggleInput/toggleInput.js';
import SelectInput from './SelectInput/selectInput.js';
import FileInput from './FileInput/fileInput.js';
import ConfirmModal from './ConfirmModal/confirmModal.js';

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
    }

    /**
     * Method that handle the submission of the form based on the inputs and configuration
     * inputs : Inputs used in the form
     * formConfig : Configuration used to determine wich action to take for submitting the form
     */
    HandleSubmit = async() => {
        await this.UpdateStateKey("FormStatus", { loading: true });
        let formData = await this.ParseFormData();
        console.log(formData);
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
                    [textEditor.name + "Html"]: textEditor.html
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

        this.UpdateStateKey("FormStatus", { loading: false });
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
    HandleChangeEditor = ({ TextEditor, inputName, target }) => {

        let targetObject;
        if (this.state.TextEditor.type === "full") {
            if (TextEditor.current !== null) {
                const editor = TextEditor.current.getEditor();
                const editorFull = TextEditor.current.makeUnprivilegedEditor(editor);
                targetObject = {
                    name: inputName,
                    value: editorFull.getText(),
                    html: editorFull.getHTML()
                }
            }
        }
        else {
            targetObject = {
                name: target.name,
                value: target.value
            }
        }
        this.UpdateStateKey("TextEditor", targetObject);
        this.MarkFormAsModified();
    }

    // HandleChangeTextArea = () =>
    // {
    //     targetObject = {
    //         name: target.name,
    //         value: target.value
    //     }
    //     this.UpdateStateKey("TextEditor", targetObject);
    //     this.MarkFormAsModified();
    // }

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
        return (
            <button
            style={{float: "left"}}
            onClick={this.HandleNegativeAction}
            className="btn btn-danger">
            {(this.state.FormConfig.httpRequest === "put")
            ?'Supprimer'
            :'Annuler'}
        </button>)
    }

    /**
     * Method that generates the postive button for the modal form
     */
    GeneratePositiveButton = () => {
        return (
            <button
            disabled={!this.state.FormStatus.modified}
            onClick={this.HandleSubmit}
            className=
                {(!this.state.FormStatus.modified)
                ? "btn"
                : "btn btn-primary"}>
            {(this.state.FormConfig.httpRequest === "put")
            ? 'Modifier'
            : 'Ajouter'}
        </button>
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
            <Form loading={this.state.FormStatus.loading}>
                {this.GenerateForm()}
                <button style={{float: "left"}} onClick={this.HandleCancel} className="btn btn-danger">
                    Annuler
                </button>
                <button onClick={() => {this.HandleSubmit()}} className="btn btn-primary">
                    Ajouter
                </button>
            </Form>
        )
    }

    /**
     * Method that generate a form that uses a modal to display its content
     */
    CreateModalForm = () => {
        return (
            <Modal
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
        else {
            return (
                <Grid columns='equal'>
                <Grid.Column>
                    <FormError errorHandler={this.state.FormStatus} />
                    {this.GenerateFormInputs()}
                </Grid.Column>
                <Grid.Column width={this.state.TextEditor.width}>
                    <TextEditor
                        input={this.state.TextEditor}
                        handleChangeEditor={this.HandleChangeEditor}
                        />
                </Grid.Column>
            </Grid>)
        }
    }

    /**
     * Method that generate the form inputs
     */
    GenerateFormInputs = () => {
        let groups = this.GenerateFormGroups(this.state.FormInputs);
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

    render() {
        if (this.state !== undefined)
            return this.Generate();
    }
}

export { FormGenerator, FormConfig, FormStatus, InputSchema, EditorSchema, FormSchema };
