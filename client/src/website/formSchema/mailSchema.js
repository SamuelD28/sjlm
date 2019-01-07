/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import { FormConfig, InputSchema, FormSchema, EditorSchema } from '../../shared/FormGenerator/formGenerator.js';

class MailSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/categorynews/",
            httpRequest: "POST",
        });
        this.inputs = [
            new InputSchema({
                name: "FirstName",
                label: "Nom",
                type: "text",
                value: "",
                group: 1,
                width: 8
            }),
            new InputSchema({
                name: "LastName",
                label: "Prénom",
                type: "text",
                value: "",
                group : 1,
                width: 8
            }),
            new InputSchema({
                name: "Email",
                label: "Adresse Courriel",
                type: "email",
                value: "",
                group: 2,
                width: 8
            }),
            new InputSchema({
                name: "Phone",
                label: "Téléphone",
                type: "tel",
                value: "",
                group: 2,
                width: 8
            }),
            new InputSchema({
                name: "Subject",
                label: "Sujet",
                type: "select",
                value: "",
                list: [
                    {text: "Information" ,value:"information"},
                    {text: "Commentaire",value:"comment"},
                    {text: "Entretiens des rues",value:"maintenance"},
                    {text: "Aqueduc et égout",value:"sewer"},
                    {text: "Plainte",value:"complaint"},
                    {text: "Autre",value:"other"}
                ],
                group: 3,
                width: 16
            }),
        ];
        this.textEditor = new EditorSchema({
            name: "Message",
            placeholder: "Message...",
            type: "simple",
            inline: true
        })
    }
}

const Instance = new MailSchema();
export default Instance;
