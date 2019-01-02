/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import { FormConfig, InputSchema, FormSchema } from '../../shared/FormGenerator/formGenerator.js';

class CategoryNewsSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/categorynews/",
            httpRequest: "POST",
            modal : true,
            size: "small"
        });
        this.putConfig = new FormConfig({
            url: "/api/categorynews/",
            httpRequest: "PUT",
            modal : true,
            size: "small"
        });
        this.inputs = [
            new InputSchema({
                name: "Title",
                label: "Nom de la catégorie",
                type: "text",
                value: "",
                width: 8,
                group: 1
            }),
            new InputSchema({
                name: "Template",
                label: "Template",
                type: "select",
                value: "",
                width: 8,
                group: 1,
                list : [
                    {text: "Empilé", value : "stacked", key: 0},
                    {text : "Ligne du temps", value : "timeline", key: 1},
                    {text: "Portrait", value: "portrait", key: 2}
                ]
            })
            ];
    }
}

const Instance = new CategoryNewsSchema();
export default Instance;
