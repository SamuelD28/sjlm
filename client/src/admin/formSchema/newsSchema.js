/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import { FormConfig, InputSchema, FormSchema, EditorSchema } from '../../shared/FormGenerator/formGenerator.js';
import Ajax from '../../shared/ajax.js';

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
                id: true,
                group: 2,
                width: 8,
                generator: () => this.categoryOptions
            }),
            new InputSchema({
                name: "Important",
                type: "toggle",
                label: "Prioritaire",
                group: 2,
                width: 8,
                value: false
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
                name: "DateFrom",
                type: "date",
                label: "À partir de",
                width: 8,
                group: 3,
                value: ""
            }),
            new InputSchema({
                name: "DateTo",
                type: "date",
                label: "Jusqu'à",
                width: 8,
                group: 3,
                value: ""
            }),
            new InputSchema({
                name: "Images",
                type: "uploader",
                allowedExt : ["jpg", "png" , "gif"],
                label: "Gallerie",
                value: [],
                group: 4,
                width: 16,
                multiple: true
            }),
            new InputSchema({
                name: "Files",
                type: "uploader",
                allowedExt : ["docx", "pdf" , "pptx", "xlsx"],
                label: "Fichiers",
                value: [],
                group: 5,
                width: 16,
                multiple: true
            })
        ];
        this.textEditor = new EditorSchema({
            name: "Description",
            placeholder: "Contenu de l'actualitée",
            type: "full",
            width: 10
        })
        this.Init();
    }

    Init = async() => {
        await this.GenerateCategoryOptions();
    }

    GenerateCategoryOptions = async() => {
        let categoryNews = await Ajax.GetData("/api/categorynews");
        let CategoryOptions = [];
        if (categoryNews.data !== undefined) {
            categoryNews.data.map((category) => {
                let item = { text: category.Title, value: category._id, key: category._id};
                return CategoryOptions.push(item);
            });
        }
        this.categoryOptions = CategoryOptions;
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
