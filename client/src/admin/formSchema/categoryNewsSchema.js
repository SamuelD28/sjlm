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
        });
        this.inputs = [
            new InputSchema({
                name: "Title",
                type: "text",
                size :"small",
                value: "",
                width: 16,
            })];
    }
}

const Instance = new CategoryNewsSchema();
export default Instance;
