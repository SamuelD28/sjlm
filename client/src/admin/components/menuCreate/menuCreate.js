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

class MenuCreate extends Component
{
    constructor(props){
        super(props);
        this.state = {
            Inputs : [
                {
                    name: "Principal",
                    type: "toggle",
                    label : "Menu principal",
                    value: false
                },
                {
                    name: "Title",
                    group: 1,
                    type: "text",
                    label: "Titre du menu",
                    value : ""
                },
                {
                    name : "Icon",
                    group: 1,
                    type: "select",
                    label: "Icon du menu",
                    value : "",
                    list : [{text: "Exemple", key: "Icon"}],
                },
                {
                    name : "LinkTo",
                    type: "select",
                    group: 2,
                    label: "Lien de navigation",
                    value : "",
                    list : [{text: "Exemple", key: "LinkTo"}],
                },
                {
                    name : "ParentMenu",
                    type: "select",
                    group: 2,
                    label: "Menu parent",
                    value : "",
                    list : [{text: "Exemple", key: "ParentMenu"}],
                },
            ],
            FormStatus : {
                open: false,
                status : ["completed", "submitting", "ongoing"],
                errors : [],
                errorsHeader : "La vérification à échoué pour les raisons suivantes : "
            },
            FormConfig : {
                url : "/api/menus/",
                httpRequest : "POST",
                elementId : "",
                size : "small"
            }
        };
    }

    handleSubmit = async() =>
    {
        let formData = {};
        this.state.Inputs.map((input, index) => {
            console.log(input.value);
            return formData = Object.assign({}, formData, {[input.name] : input.value});
        });

        let request;
        let url = this.state.FormConfig.url;
        let id = this.state.FormConfig.elementId;
        switch (this.state.FormConfig.httpRequest.toUpperCase()){
            case "POST" : request = await Ajax.PostData(url, formData); break;
            case "PUT"  : request = await Ajax.PutData(url + id , formData); break;
            case "DELETE" : request = await Ajax.DeleteData(url + id); break;
            default: throw new Error("The http request type must be specified under the FormConfig Object");
        }

        if(!request.success){
            let errors = [];

            Object.keys(request.data.errors).map(function(key, index) {
                let requestAlias = request.data.errors[key];
                return  errors.push(
                            Translate.ModelKey(requestAlias.path) + " " +
                            Translate.ModelError(requestAlias.kind, requestAlias.properties)
                );
            });

            this.updateStateKey("FormStatus" , {errors : errors});
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

    handleClose = () =>
    {
        this.updateStateKey("FormStatus" , {open : false});
        this.clearFormInputs();
    }

    clearFormInputs = () =>
    {
        if(this.TextEditor !== undefined)
            this.updateStateKey("TextEditor", {value : "" , html : ""});

        let Inputs = Array.from(this.state.Inputs);
        if(Inputs.length !== 0){
            Inputs.map((input, index) => {

                input.value =   (input.type === "toggle")? false:
                                (input.type === "uploader")? []: "";

                return this.handleChange(input);
            });
        }
    }

    updateStateKey = (stateKey, stateObj) =>
    {
        this.setState({[stateKey.valueOf()] : Object.assign({}, this.state.FormStatus, stateObj)});
    }

    updateStateInputs = (inputName, inputValueObj) =>
    {
        let index = this.state.Inputs.findIndex(input => input.name === inputName);
        let Inputs = Array.from(this.state.Inputs);
        Inputs[index] = Object.assign({}, Inputs[index], inputValueObj);
        this.setState({Inputs : Inputs});
    }

    // //-----------------//
    // GenererateMenuOptions = () =>
    // {
    //     let MenuOptions = [];
    //     if(this.props.menus !== undefined)
    //     {
    //         this.props.menus.map((menu, index) => {
    //             if(menu.Principal)
    //             {
    //                 let MenuObject = {text: menu.Title, value: menu._id};
    //                 MenuOptions.push(MenuObject);
    //             }
    //             return MenuOptions;
    //         });
    //     }
    //     return MenuOptions;
    // }

    // GenererateIconOptions = () =>
    // {
    //     let IconsArray = [
    //     "compass",
    //     "balance",
    //     "newspaper",
    //     "home",
    //     "mail",
    //     "futbol",
    //     "book",
    //     "users",
    //     "user"
    //     ];
    //     let IconsOptions = [];
    //     if(this.props.menus !== undefined)
    //     {
    //         IconsArray.map((icon, index) => {
    //             let IconsObject = {text: icon, value: icon, icon: icon};
    //             return IconsOptions.push(IconsObject);
    //         });
    //     }
    //     return IconsOptions;
    // }

    // GenerateLinksOptions = async() =>
    // {
    //     let navigationlinks = await Ajax.GetData("/api/navigationlinks");
    //     let NavigationOptions = [];
    //     if(navigationlinks.data !== undefined)
    //     {
    //         navigationlinks.data.map((navlink, index) => {
    //             console.log(navlink);
    //             let NavigationObject = {text: navlink.Category + " | " +  navlink.Title, value: navlink.Link};
    //             return NavigationOptions.push(NavigationObject);
    //         });
    //     }
    //     return NavigationOptions;
    // }
    // //---------------//

    //Need to find a way to generate it only one time when the node is beeing mount.
    GenerateForm = (FormSchema) =>
    {
        if(FormSchema.Inputs === undefined)
            throw new TypeError("The Form Schema must contain a definition for the inputs to display");

        let textEditor = FormSchema.TextEditor;
        let inputs = FormSchema.Inputs;
        let errorHandler = (FormSchema.FormStatus !== undefined)? FormSchema.FormStatus: {errors: [], errorsHeader: "Des erreurs sont survenues"};

        if(textEditor === undefined)
            return this.GenerateLayoutWithoutTextEditor(inputs, errorHandler);
        else
            return this.GenerateLayoutWithTextEditor(inputs, errorHandler, textEditor);
    }

    GenerateLayoutWithoutTextEditor = (inputs, errorHandler) =>
    {
        return(
        <Form>
            <FormError errorHandler={errorHandler} />
            {this.GenerateFormInputs(inputs)}
        </Form>)
    }

    GenerateLayoutWithTextEditor = (inputs, errorHandler, textEditor) =>
    {
        return(
        <Form>
            <Grid>
                <Grid.Column width={8}>
                    <FormError errorHandler={errorHandler} />
                    {this.GenerateFormInputs(inputs)}
                </Grid.Column>
                <Grid.Column width={8}>
                    <TextEditor input={textEditor} handleChange={this.handleChangeInTextEditor}/>
                </Grid.Column>
            </Grid>
        </Form>)
    }

    GenerateFormInputs = (inputs) =>
    {
        if(inputs !== null){
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

            return  Object.keys(groups).map((key, index) =>{
                    return(
                        <Form.Group widths="equal" key={index}>
                            {this.GenerateFormFields(groups[key])}
                        </Form.Group>
                    )
            });
        }
    }

    //It calls on update too much. Fix this
    GenerateFormFields = (inputs) =>
    {
        if(inputs !== null){
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
    }

    render()
    {
    if(this.state !== undefined)
    return(
    <Modal
    size={this.state.FormConfig.size}
    open={this.state.FormStatus.open}
    onClose={this.handleClose}
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
    <Modal.Header>Ajouter un Menu</Modal.Header>
        <Modal.Content>
            <div ref={this.FormAnchor}>
            </div>
            {this.GenerateForm(this.state)}
        </Modal.Content>
        <Modal.Actions>
            <button style={{float: "left"}} onClick={this.handleClose} className="btn btn-outline-danger">
                Annuler
            </button>
            <button onClick={this.handleSubmit} className="btn btn-outline-primary">
                Ajouter
            </button>
        </Modal.Actions>
    </Modal>)}
}

export default MenuCreate;