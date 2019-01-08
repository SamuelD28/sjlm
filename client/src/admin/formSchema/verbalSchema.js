/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import { FormConfig, InputSchema, FormSchema } from '../../shared/FormGenerator/formGenerator.js';

class VerbalSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/verbal/",
            httpRequest: "POST",
            title: "Ajouter un procès"
        });
        this.putConfig = new FormConfig({
            url: "/api/verbal/",
            httpRequest: "PUT",
            modal: true,
            title: "Modifier un procès",
            size: "mini"
        });
        this.inputs = [new InputSchema({
                name: "Title",
                type: "text",
                label: "Titre",
                value: "",
                width: 16,
                group: 1
            }),
            new InputSchema({
                name: "Date",
                type: "date",
                label: "Date",
                value: "",
                width: 16,
                group: 2,
            }),
            new InputSchema({
                name: "File",
                type: "uploader",
                label: "Fichier",
                width: 16,
                group: 3,
                value: []
            })
        ];
    }
}

const Instance = new VerbalSchema();
export default Instance;
