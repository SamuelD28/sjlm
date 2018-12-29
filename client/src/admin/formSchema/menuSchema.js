/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import Ajax from '../../shared/ajax.js';
import { FormConfig, InputSchema, FormSchema } from '../../shared/FormGenerator/formGenerator.js';

class MenuSchema extends FormSchema {
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
     * Function that assign all the select inputs
     * that their respective data set.
     * **this function was necessary in order
     * to make use of the async keyword. Could
     * find a workaround later on but for right
     * now it works fine.
     */
    Init = async() => {
        this.menuOptions = await this.GenererateMenuOptions();
        this.linkOptions = await this.GenerateLinksOptions();
        this.iconOptions = await this.GenererateIconOptions();
    }

    /**
     * Function that generate all the menu options
     * used by the select input ParentMenu
     */
    GenererateMenuOptions = async() => {
        let menus = await Ajax.GetData("/api/menus");
        let menusOptions = [];
        if (menus.data !== undefined) {
            menus.data.map((menu, index) => {
                if (menu.Principal) {
                    let menuObject = { text: menu.Title, value: menu._id };
                    menusOptions.push(menuObject);
                }

                return menusOptions;
            });
        }
        return menusOptions;
    }

    /**
     * Function that generate all the icon options
     * used by the select input Icon
     */
    GenererateIconOptions = async() => {
        let IconsArray = [
        "compass",
        "balance",
        "newspaper",
        "home",
        "mail",
        "futbol",
        "book",
        "users",
        "user"
        ];
        let IconsOptions = [];
        IconsArray.map((icon, index) => {
            let IconsObject = { text: icon, value: icon, icon: icon };
            return IconsOptions.push(IconsObject);
        });
        return IconsOptions;
    }

    /**
     * Function that generate all the link options
     * used by the select input LinkTo
     */
    GenerateLinksOptions = async() => {
        let navigationlinks = await Ajax.GetData("/api/navigationlinks");
        let NavigationOptions = [];
        if (navigationlinks.data !== undefined) {
            navigationlinks.data.map((navlink, index) => {
                let NavigationObject = { text: navlink.Category + " | " + navlink.Title, value: navlink.Link };
                return NavigationOptions.push(NavigationObject);
            });
        }
        return NavigationOptions;
    }

    /**
     * Method that apply a custom constraits to the inputs.
     * Can be left empty
     */
    ApplyCustomConstraints = (input) => {
        //Custom constaints
        if (input.name === "Principal")
            input.disabled = () => true;
    }
}

const Instance = new MenuSchema();
export default Instance;
