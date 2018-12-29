/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import Ajax from '../../shared/ajax.js';
import { FormConfig, InputSchema, FormSchema } from '../../shared/FormGenerator/formGenerator.js';

class NewsSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/menus/",
            httpRequest: "POST",
            modal: true,
            size: "small",
            title: "Ajouter un Menu"
        });
        this.putConfig = new FormConfig({
            url: "/api/menus/",
            httpRequest: "PUT",
            modal: true,
            title: "Modifier un menu",
            size: "small"
        });
        this.inputs = [new InputSchema({
                name: "Principal",
                type: "toggle",
                label: "Menu principal",
                value: false
            }),
                        new InputSchema({
                name: "Title",
                group: 1,
                width: 10,
                type: "text",
                label: "Titre du menu",
                value: ""
            }),
                        new InputSchema({
                name: "Icon",
                group: 1,
                width: 6,
                type: "select",
                label: "Icon du menu",
                disabled: (inputs) => {
                    return !inputs[0].value;
                },
                value: "",
                generator: () => { return this.iconOptions; }
            }),
                        new InputSchema({
                name: "LinkTo",
                type: "select",
                group: 2,
                label: "Lien de navigation",
                value: "",
                generator: () => { return this.linkOptions; }
            }),
                        new InputSchema({
                name: "ParentMenu",
                disabled: (inputs) => {
                    return inputs[0].value;
                },
                type: "select",
                group: 2,
                label: "Menu parent",
                value: "",
                generator: () => { return this.menuOptions; }
            })
        ];
        this.Init();
    }

    /**
     * Method that apply a custom constraits to the inputs.
     * Can be left empty
     */
    ApplyCustomConstraints = (input) => {
        //Custom constaints
    }
}

const Instance = new NewsSchema();
export default Instance;
