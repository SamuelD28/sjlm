/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import { FormConfig, InputSchema, FormSchema } from '../../shared/FormGenerator/formGenerator.js';

class NavigationSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/navigationlinks/",
            httpRequest: "POST",
            modal: true,
            title: "Ajouter un lien",
            size: "mini"
        });
        this.putConfig = new FormConfig({
            url: "/api/navigationlinks/",
            httpRequest: "PUT",
            modal: true,
            title: "Modifier un lien",
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
                name: "Category",
                type: "text",
                label: "Categorie",
                value: "",
                width: 16,
                group: 2,
            }),
            new InputSchema({
                name: "Link",
                type: "text",
                label: "Lien",
                width: 16,
                group: 3,
                value: ""
            })
        ];
    }
}

const Instance = new NavigationSchema();
export default Instance;
