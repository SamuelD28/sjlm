import React, {Component} from 'react';
import {Form, Modal, Grid} from 'semantic-ui-react';

import Ajax from '../../../shared/ajax.js';
import Translate from '../../../shared/translate.js';

import FormError from '../FormError/formError.js';
import TextEditor from '../TextEditor/textEditor.js';
import TextInput from '../TextInput/textInput.js';
import ToggleInput from '../ToggleInput/toggleInput.js';
import SelectInput from '../SelectInput/selectInput.js';
import SubmitBtn from '../SubmitBtn/submitBtn.js';
import FileInput from '../FileInput/fileInput.js';

class MenuCreate extends Component
{
    constructor(props){
        super(props);
        this.TextEditor     = React.createRef();

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
                    type: "text",
                    label: "Titre du menu",
                    value : ""
                },
                {
                    name : "Icon",
                    type: "select",
                    label: "Icon du menu",
                    value : "",
                    list : [],
                    generator : this.GenererateIconOptions
                },
                {
                    name: "Description",
                    type: "texteditor",
                    label: "Contenu de la page",
                    value: "",
                    html : ""
                },
                {
                    name: "Images",
                    type: "uploader",
                    value: [],
                    label: "Choisir des images"
                },
            ],
            FormStatus : {
                status : ["completed", "submitting", "ongoing"],
                errors : [],
                errorsHeader : "La vérification à échoué pour les raisons suivantes : "
            }
        };
    }

    handleSubmit = async() =>
    {
        let postData = {};
        this.state.Inputs.map((input, index) => {
            console.log(input.value);
            postData = Object.assign({}, postData, {[input.name] : input.value});
        });

        let request = await Ajax.PostData("/api/menus", postData);

        if(!request.success){
            let errors = [];

            Object.keys(request.data.errors).map(function(key, index) {
                let requestAlias = request.data.errors[key];
                errors.push(
                    Translate.ModelKey(requestAlias.path) + " " +
                    Translate.ModelError(requestAlias.kind, requestAlias.properties)
                );
            });

            this.updateStateFormStatus({errors : errors});
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

    updateStateFormStatus = (formObject) =>
    {
        this.setState({FormStatus : formObject});
    }

    updateStateInputs = (keyName, keyValue) =>
    {
        let index = this.state.Inputs.findIndex(input => input.name === keyName);
        let Inputs = Array.from(this.state.Inputs);
        Inputs[index] = Object.assign({}, Inputs[index], keyValue);
        this.setState({Inputs : Inputs});
    }

    //-----------------//
    GenererateMenuOptions = () =>
    {
        let MenuOptions = [];
        if(this.props.menus !== undefined)
        {
            this.props.menus.map((menu, index) => {
                if(menu.Principal)
                {
                    let MenuObject = {text: menu.Title, value: menu._id};
                    return MenuOptions.push(MenuObject);
                }
            });
        }
        return MenuOptions;
    }

    GenererateIconOptions = () =>
    {
        let IconsArray = [
        "compass",
        "balance",
        "newspaper",
        "home",
        "mail",
        "futbol",
        "book",
        "users",
        "user"
        ];
        let IconsOptions = [];
        if(this.props.menus !== undefined)
        {
            IconsArray.map((icon, index) => {
                let IconsObject = {text: icon, value: icon, icon: icon};
                return IconsOptions.push(IconsObject);
            });
        }
        return IconsOptions;
    }

    GenerateLinksOptions = () =>
    {
        let NavigationOptions = [];
        if(this.state.navLinks !== undefined)
        {
            this.state.navLinks.map((navlink, index) => {
                let NavigationObject = {text: navlink.Category + " | " +  navlink.Title, value: navlink.Link};
                return NavigationOptions.push(NavigationObject);
            });
        }
        return NavigationOptions;
    }
    //---------------//

    componentDidUpdate = () =>
    {
        console.warn("||--UPDATING--||");
    }

    //Need optimisation
    GenerateForm = (FormSchema) =>
    {
        //Throw new error if the forms schema doesnt contain inputs
        if(FormSchema.Inputs === undefined)
            throw new TypeError("The Form Schema must contain a definition for the inputs to display");

        let textEditor = FormSchema.Inputs.find(obj => obj.type === "texteditor");

        let inputsWithGroup = FormSchema.Inputs.filter(obj => obj.group !== undefined);
        let inputsWithoutGroup = FormSchema.Inputs.filter(obj => obj.group === undefined && obj.type !== "texteditor"); //Could Improve!

        let errorHandler = (FormSchema.FormStatus !== undefined)? FormSchema.FormStatus: {errors: [], errorsHeader: "Des erreurs sont survenues"};

        if(textEditor === null)
            return this.GenerateFormNoTextEditor(inputsWithGroup, inputsWithoutGroup, errorHandler);
        else
            return this.GenerateFormWithTextEditor(inputsWithGroup, inputsWithoutGroup, textEditor, errorHandler);
    }

    GenerateFormNoTextEditor = (inputsWithGroup, inputsWithoutGroup, errorHandler) =>
    {
        return(
        <Form onSubmit={this.handleSubmit}>
            <FormError errorHandler={errorHandler} />
            {this.GenerateFormFields(inputsWithoutGroup)}
            {this.GenerateFormGroups(inputsWithGroup)}
            <SubmitBtn btnText="Ajouter" btnClassStyle="btn btn-outline-primary" />
        </Form>)
    }

    GenerateFormWithTextEditor = (inputsWithGroup, inputsWithoutGroup, textEditor, errorHandler) =>
    {
        return(
        <Form onSubmit={this.handleSubmit}>
            <Grid>
                <Grid.Column width={8}>
                    <FormError errorHandler={errorHandler} />
                    {this.GenerateFormFields(inputsWithoutGroup)}
                    {this.GenerateFormGroups(inputsWithGroup)}
                    <SubmitBtn btnText="Ajouter" btnClassStyle="btn btn-outline-primary" />
                </Grid.Column>
                <Grid.Column width={8}>
                    <TextEditor input={textEditor} handleChange={this.handleChangeInTextEditor}/>
                </Grid.Column>
            </Grid>
        </Form>)
    }

    GenerateFormGroups = (inputsWithGroup) =>
    {
        if(inputsWithGroup !== null){
            let groups = {};
            inputsWithGroup.map((input, index) =>{

                if(groups[input.group] === undefined)
                    groups[input.group] = [];

                groups[input.group].push(input);
            });

            return  Object.keys(groups).map((key, index) =>{
                    return(
                        <Form.Group widths="equal">
                            {this.GenerateFormFields(groups[key])}
                        </Form.Group>
                    )
            });
        }
    }

    //It calls on update too much. Fix this
    GenerateFormFields = (inputsAlone) =>
    {
        if(inputsAlone !== null){
            return inputsAlone.map((input, index) => {
                switch(input.type){
                    case "text": return <TextInput input={input} handleChange={this.handleChange}/>;
                    case "toggle": return <ToggleInput input={input} handleChange={this.handleChange}/>;
                    case "uploader": return <FileInput input={input} updateStateInputs={this.updateStateInputs} />;
                    case "select": return <SelectInput input={input} handleChange={this.handleChange}/>;
                    case "texteditor" : return <TextEditor input={input} handleChange={this.handleChangeInTextEditor}/>;
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
    size="small"
    trigger={
    <div className="cardContainer">
        <div className="cardOverlay">
            <div className="cardOverlayBtn">
                <i className="icon plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>
    </div>
    }
    closeIcon>
    <Modal.Header>Ajouter un Menu</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                {this.GenerateForm(this.state)}
            </Modal.Description>
        </Modal.Content>
    </Modal>)}
}

export default MenuCreate;