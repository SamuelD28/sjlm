import React, {Component} from 'react';
import {Form, Checkbox, Select, Input, Modal, Message} from 'semantic-ui-react';

import Ajax from '../../../shared/ajax.js';
import Translate from '../../../shared/translate.js';
import ReactQuill from 'react-quill';
import CloudinaryUpload from '../cloudinaryUpload/cloudinaryUpload.js';

const modules = {
    toolbar:[
      [{ 'header': [1, 2, 3, 4, 5 ,6] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'link'],
      [{'list': 'ordered'}, {'list': 'bullet'},{'indent': '-1'}, {'indent': '+1'},{ 'align': [] }],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
};
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'indent','link',
    'align'
];

class MenuCreate extends Component
{
    constructor(props){
        super(props);
        this.TextEditor     = React.createRef();
        this.ErrorConsole  = React.createRef();

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
                errors : []
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

    updateStateFormStatus = (formObject) => {
        this.setState({FormStatus : formObject});
    }

    updateStateInputs = (keyName, keyValue) =>
    {
        let index = this.state.Inputs.findIndex(input => input.name === keyName);
        let Inputs = Array.from(this.state.Inputs);
        Inputs[index] = Object.assign({}, Inputs[index], keyValue);
        this.setState({Inputs : Inputs});
    }

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

    //It calls on update too much. Fix this
    GenerateFormInputs = () =>
    {
        if(this.state !== undefined){

            return this.state.Inputs.map((input, index) => {
                    switch(input.type){
                        case "text": return this.GenerateTextInput(input);
                        case "toggle": return this.GenerateToggleInput(input);
                        case "texteditor": return this.GenerateTextEditor(input);
                        case "uploader": return this.GenerateUploader(input);
                        case "select": return this.GenerateSelectInput(input);
                        default: throw new Error("Input Type must be specified.");
                    }

            });
        }
    }

    GenerateTextInput = (input) => {
        if(input !== undefined)
        return(
        <Form.Field>
            <label>{input.label}</label>
            <Input
                name={input.name}
                placeholder={Translate.ModelKey(input.name) + "..."}
                onChange={(e, data) => {this.handleChange(data)}}
                value={input.value}
                type={input.type}
                ref={this[input.name]}/>
        </Form.Field>
        )
    }

    GenerateToggleInput = (input) => {
        if(input !== undefined)
        return(
        <Form.Field>
            <label>{input.label}</label>
            <Checkbox
            name={input.name}
            onChange={(e, data) => {this.handleChange(data)}}
            checked={input.value}
            toggle />
        </Form.Field>
        )
    }

    GenerateTextEditor = (input) => {
        if(input !== undefined)
        return(
        <Form.Field>
            <ReactQuill
            modules={modules}
            formats={formats}
            onChange={() => {this.handleChangeInTextEditor(this.TextEditor, input.name)}}
            ref={this.TextEditor}
            />
        </Form.Field>
        )
    }

    GenerateSelectInput = (input) => {
        if(input !== undefined)
        return(
        <Form.Field>
            <label>{input.label}</label>
            <Select
                name={input.name}
                clearable
                placeholder={Translate.ModelKey(input.name) + "..."}
                selection
                value={input.value}
                onChange={(e, data) =>  {this.handleChange(data)}}
                options={input.generator()} />
        </Form.Field>
        )
    }

    GenerateUploader = (input) => {
        if(input !== undefined)
        return(
         <Form.Field>
            <CloudinaryUpload
                input={input}
                updateStateInputs={this.updateStateInputs}
                />
        </Form.Field>
        )
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
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Message
                            negative
                            hidden={(this.state.FormStatus.errors.length === 0)}
                            header="La validation à échoué pour les informations suivantes"
                            list={this.state.FormStatus.errors}
                            />
                    </Form.Field>
                    {this.GenerateFormInputs()}
                    <Form.Field>
                        <button type="submit" className="btn btn-primary">Ajouter</button>
                    </Form.Field>
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>)}
}

export default MenuCreate;