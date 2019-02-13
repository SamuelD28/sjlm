/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

import { FormConfig, InputSchema, FormSchema, EditorSchema } from '../../shared/FormGenerator/formGenerator.js';

class ScheduleSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/schedule/",
            httpRequest: "POST",
            modal : true,
            size: "small"
        });
        this.putConfig = new FormConfig({
            url: "/api/schedule/",
            httpRequest: "PUT",
            modal : true,
            size: "small"
        });
        this.inputs = [
            new InputSchema({
                name: "Title",
                label: "Titre",
                type: "text",
                value: "",
                width: 16,
                group: 1
            })
        ];
        this.textEditor = new EditorSchema({
            name: "Description",
            placeholder: "Horaire",
            type: "full",
            inline: true
        })
    }
}

const Instance = new ScheduleSchema();
export default Instance;
