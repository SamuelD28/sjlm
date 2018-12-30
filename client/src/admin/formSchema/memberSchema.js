/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import { FormConfig, InputSchema, EditorSchema, FormSchema } from '../../shared/FormGenerator/formGenerator.js';

class MemberSchema extends FormSchema {
    constructor() {
        super();
        this.postConfig = new FormConfig({
            url: "/api/members/",
            httpRequest: "POST",
            modal: true,
            size: "large",
            title: "Ajouter un Membre"
        });
        this.putConfig = new FormConfig({
            url: "/api/members/",
            httpRequest: "PUT",
            modal: true,
            title: "Modifier un Membre",
            size: "large"
        });
        this.inputs = [new InputSchema({
                name: "FirstName",
                type: "text",
                label: "Nom",
                group: 1,
                width: 8,
                value: ""
            }),
                        new InputSchema({
                name: "LastName",
                type: "text",
                group: 1,
                width: 8,
                label: "Prénom",
                value: ""
            }),
                        new InputSchema({
                name: "Email",
                group: 2,
                width: 16,
                type: "email",
                label: "Email",
                value: "",
            }),
                        new InputSchema({
                name: "Phone",
                group: 2,
                width: 16,
                type: "tel",
                label: "Téléphone",
                value: "",
            }),
                        new InputSchema({
                name: "Occupation",
                type: "select",
                label: "Occupation",
                group: 3,
                width: 10,
                value: "",
                generator: () => this.occupationsOptions
            }),
                        new InputSchema({
                name: "Photo",
                type: "uploader",
                label: "Photo de Profil",
                width: 16,
                group: 4,
                multiple: false,
                value: []
            })
        ];
        this.textEditor = new EditorSchema({
            name: "PersonnalNote",
            placeholder: "Note Personnel...",
            type: "simple"
        })
        this.occupationsOptions = this.GenerateOccupationOptions();
    }

    GenerateOccupationOptions = () => {
        return [
            { text: "Maire", value: "mayor" },
            { text: "Mairesse", value: "mayorf" },
            { text: "Conseiller", value: "advisor" },
            { text: "Conseillère", value: "advisorf" },
            { text: "Employé", value: "employe" },
            { text: "Employée", value: "employef" },
            { text: "Directeur générale", value: "director" },
            { text: "Directrice générale", value: "directorf" }
        ];
    }
}
const Instance = new MemberSchema();
export default Instance;
