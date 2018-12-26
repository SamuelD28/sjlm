/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import Ajax from '../../shared/ajax.js';
import {FormConfig, InputSchema, EditorSchema} from '../../shared/FormGenerator/formGenerator.js';

//Variables and object declaration that is going to be used by the form
let m_postConfig    = new FormConfig({url: "/api/members/",
                                 httpRequest : "POST",
                                 modal: true,
                                 size: "large",
                                 title: "Ajouter un Membre"}),
    m_putConfig     = new FormConfig({url: "/api/members/",
                                httpRequest : "PUT",
                                modal: true,
                                title: "Modifier un Membre",
                                size: "small"}),
    m_memberInputs  =   [new InputSchema({
                                    name: "FirstName",
                                    type: "text",
                                    label : "Nom",
                                    width: 16,
                                    group: 1,
                                    value: ""}),
                    new InputSchema({
                                    name: "LastName",
                                    type: "text",
                                    width: 16,
                                    group: 1,
                                    label: "Prénom",
                                    value : ""}),
                    new InputSchema({
                                    name : "Email",
                                    group: 2,
                                    width: 16,
                                    type: "email",
                                    label: "Email",
                                    value : "",
                    }),
                    new InputSchema({
                                    name : "Phone",
                                    group: 2,
                                    width: 16,
                                    type: "tel",
                                    label: "Téléphone",
                                    value : "",
                    }),
                    new InputSchema({
                                    name : "Occupation",
                                    type: "select",
                                    label: "Occupation",
                                    value : "",
                                    generator : () =>  { return [{text: "Test", value: "Test"}]; }
                    }),
                    new InputSchema({
                                    name : "Photo",
                                    type: "uploader",
                                    label: "Photo de Profil",
                                    value : [],
                    })
    ],
    m_textEditor    = new EditorSchema({
                                    name: "PersonnalNote",
                                    label: "Note Personnel",
                                    type: "simple"
    })

class MemberSchema
{
    /**
     * Function that creates a deep copy of the menu inputs and
     * returns the copy in the form of an array. Necessary in order
     * to avoid having collision betweens inputs and different forms.
     */
    Clone = () =>
    {
        let newArray = [];
        m_memberInputs.forEach((input) =>
        {
            newArray.push(Object.assign({}, input));
        });
        return newArray;
    }

    /**
     * Methods that returns a new array with empty inputs
     */
    GetEmptyInputs = () =>
    {
        return this.Clone();
    }

    GetEmptyEditor = () =>
    {
        return Object.assign({}, m_textEditor);
    }

    /**
     * Method that return a new object based on the put config
     */
    GetPutConfig = () =>
    {
        return Object.assign({}, m_putConfig);
    }

    /**
     * Method that return a new object based on the post config
     */
    GetPostConfig = () =>
    {
        return Object.assign({}, m_postConfig);
    }

    /**
     * Method that populate the inputs with an existing menu.
     * return a set of inputs with value in them and modify returns
     * a putconfig with the menu id.
     * menu : menu object to bind the inputs to
     * return : array of all the binded inputs
     */
    GetBindedInputs = (member) =>
    {
        let bindedInputs = this.Clone();
        bindedInputs.forEach((input) =>{
            if(member[input.name] !== undefined){
                input.value = member[input.name];
                this.ApplyCustomConstraints(input);
            }
        });
        return bindedInputs;
    }

    /**
     * Method that return a new object based on the put config and
     * assign the elementid property to the parameter id
     * id : id to assign the config to
     * return : the binded put configuration
     */
    GetBindedPutConfig = (id) =>
    {
        let bindedPutConfig = this.GetPutConfig();
        bindedPutConfig.elementId = id;
        return bindedPutConfig;
    }

    /**
     * Method that apply a custom constraits to the inputs.
     * Can be left empty
     */
    ApplyCustomConstraints = (input) =>
    {
        //Custom constaints...
    }
}

const Instance = new MemberSchema();
Object.freeze(Instance);

export default Instance;