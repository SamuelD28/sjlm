/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import Ajax from '../../shared/ajax.js';
import { FormConfig, InputSchema, FormSchema, EditorSchema } from '../../shared/FormGenerator/formGenerator.js';

class NewsSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/news/",
            httpRequest: "POST",
            modal: true,
            size: "large",
            title: "Ajouter une actualitée"
        });
        this.putConfig = new FormConfig({
            url: "/api/news/",
            httpRequest: "PUT",
            modal: true,
            title: "Modifier une actualitée",
            size: "large"
        });
        this.inputs = [
                        new InputSchema({
                name: "Category",
                type: "select",
                label: "Catégorie",
                value: "",
                group: 2,
                width: 8,
                generator: () => this.GenerateCategoryOptions()
            }),
                        new InputSchema({
                name: "Important",
                type: "toggle",
                label: "Actualitée Prioritaire",
                group: 3,
                width: 8,
                value: ""
            }),
            new InputSchema({
                name: "Title",
                type: "text",
                label: "Titre",
                width: 16,
                group: 1,
                value: ""
            }),
                        new InputSchema({
                name: "Images",
                type: "uploader",
                label: "Gallerie",
                value: [],
                group: 4,
                multiple: true
            })
        ];
        this.textEditor = new EditorSchema({
            name: "Description",
            placeholder: "Contenu de l'actualitée",
            type: "full",
            width: 10
        })
    }

    GenerateCategoryOptions = () => {
        return [
            { text: "Évenement", value: "events" },
            { text: "Activité", value: "activity" },
            { text: "Communiqué", value: "communicate" },
            { text: "Travaux Routiers", value: "roadwork" },
            { text: "Offre Emploi", value: "jobs" },
            { text: "Avis Public", value: "public" },
            { text: "Séance du Conseil", value: "council" },
            { text: "Procès-Verbaux", value: "verbal" },
            { text: "Autres", value: "other" },
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

const Instance = new NewsSchema();
export default Instance;
