/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import { FormConfig, InputSchema, FormSchema } from '../../shared/FormGenerator/formGenerator.js';

class PagesSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/user/",
            httpRequest: "POST",
            title: "Ajouter un utilisateur"
        });
        this.putConfig = new FormConfig({
            url: "/api/user/",
            httpRequest: "PUT",
            title: "Modifier un utilisateur",
        });
        this.inputs = [new InputSchema({
                name: "firstName",
                type: "text",
                label: "Nom",
                value: "",
                width: 8,
                group: 1
            }),
            new InputSchema({
                name: "lastName",
                type: "text",
                label: "Prénom",
                value: "",
                width: 8,
                group: 1,
            }),
            new InputSchema({
                name: "password",
                type: "password",
                label: "Mot de passe",
                value : "",
                width: 16,
                group: 2,
            }),
            new InputSchema({
                name: "email",
                type: "email",
                label: "Adresse courriel",
                width: 16,
                group: 3,
                value : ""
            })
        ];
    }
}

const Instance = new PagesSchema();
export default Instance;
