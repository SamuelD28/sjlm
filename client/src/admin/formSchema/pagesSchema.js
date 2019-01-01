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
            size: "fullscreen",
            title: "Ajouter une page"
        });
        this.putConfig = new FormConfig({
            url: "/api/pages/",
            httpRequest: "PUT",
            modal: true,
            title: "Modifier une page",
            size: "fullscreen"
        });
        this.inputs = [new InputSchema({
                name: "PageTitle",
                type: "text",
                label: "Titre de la page",
                value: "",
                width: 8,
                group: 1
            }),
            new InputSchema({
                name: "Template",
                type: "select",
                label: "Template de la page",
                value: "",
                width: 8,
                group: 1,
                generator: () => this.GenerateTemplateOptions()
            }),
            new InputSchema({
                name: "PageGallery",
                type: "uploader",
                allowedExt : ["jpg" , "png", "gif"],
                label: "Gallerie",
                width: 16,
                group: 2,
                value: [],
                multiple: true
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
