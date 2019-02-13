/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

import { FormConfig, InputSchema, FormSchema } from '../../shared/FormGenerator/formGenerator.js';

class OccupationsSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/occupations/",
            httpRequest: "POST",
            modal : true,
            size: "small"
        });
        this.putConfig = new FormConfig({
            url: "/api/occupations/",
            httpRequest: "PUT",
            modal : true,
            size: "small"
        });
        this.inputs = [
            new InputSchema({
                name: "Title",
                label: "Nom du poste",
                type: "text",
                value: "",
                width: 16,
                group: 1
            })];
    }
}

const Instance = new OccupationsSchema();
export default Instance;
