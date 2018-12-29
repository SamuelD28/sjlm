/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import { FormConfig, InputSchema, FormSchema, EditorSchema } from '../../shared/FormGenerator/formGenerator.js';

class PagesSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/pages/",
            httpRequest: "POST",
            modal: true,
            size: "large",
            title: "Ajouter une page"
        });
        this.putConfig = new FormConfig({
            url: "/api/pages/",
            httpRequest: "PUT",
            modal: true,
            title: "Modifier une page",
            size: "large"
        });
        this.inputs = [new InputSchema({
                name: "PageTitle",
                type: "text",
                label: "Titre de la page",
                value: "",
                width: 16
            }),
                        new InputSchema({
                name: "Template",
                type: "select",
                label: "Template de la page",
                value: "",
                width: 16,
                generator: () => this.GenerateTemplateOptions()
            }),
            new InputSchema({
                name: "PageGallery",
                type: "uploader",
                label: "Gallerie",
                value: [],
            })
        ];
        this.textEditor = new EditorSchema({
            name: "PageContent",
            placeholder: "Contenu de la page",
            type: "full",
            width: 10
        })
    }

    GenerateTemplateOptions = () => {
        return [
            { text: "Defaut", value: 0 },
            { text: "Sans bannière", value: 1 },
            { text: "Bannière sur côté", value: 2 }
            ];

    }

    /**
     * Method that apply a custom constraits to the inputs.
     * Can be left empty
     */
    ApplyCustomConstraints = (input) => {
        //Custom constaints
    }
}

const Instance = new PagesSchema();
export default Instance;
