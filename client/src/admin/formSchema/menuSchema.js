/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */

//Import statements
import Ajax from '../../shared/ajax.js';
import {FormConfig, InputSchema} from '../../shared/FormGenerator/formGenerator.js';

//Variables and object declaration that is going to be used by the form
let MenuSchema = {},
    m_menuOptions,
    m_linkOptions,
    m_iconOptions,
    m_postConfig = new FormConfig({url: "/api/menus/",
                                 httpRequest : "POST",
                                 modal: true,
                                 size: "small",
                                 title: "Ajouter un Menu"}),
    m_putConfig = new FormConfig({url: "/api/menus/",
                                httpRequest : "PUT",
                                modal: true,
                                title: "Modifier un menu",
                                size: "small"}),
    m_menuInputs =   [new InputSchema({
                                    name: "Principal",
                                    type: "toggle",
                                    label : "Menu principal",
                                    value: false}),
                    new InputSchema({
                                    name: "Title",
                                    group: 1,
                                    width: 10,
                                    type: "text",
                                    label: "Titre du menu",
                                    value : ""}),
                    new InputSchema({
                                    name : "Icon",
                                    group: 1,
                                    width: 6,
                                    type: "select",
                                    label: "Icon du menu",
                                    disabled: (inputs) => {
                                                return !inputs[0].value;
                                    },
                                    value : "",
                                    generator : () =>  { return m_iconOptions;  }
                    }),
                    new InputSchema({
                                    name : "LinkTo",
                                    type: "select",
                                    group: 2,
                                    label: "Lien de navigation",
                                    value : "",
                                    generator : () =>  { return m_linkOptions; }
                    }),
                    new InputSchema({
                                    name : "ParentMenu",
                                    disabled: (inputs) => {
                                        return inputs[0].value;
                                    },
                                    type: "select",
                                    group: 2,
                                    label: "Menu parent",
                                    value : "",
                                    generator : () =>  { return m_menuOptions; }
                    })
    ];

Init();

/**
 * Function that assign all the select inputs
 * that their respective data set.
 * **this function was necessary in order
 * to make use of the async keyword. Could
 * find a workaround later on but for right
 * now it works fine.
 */
async function Init()
{
    m_menuOptions = await GenererateMenuOptions();
    m_linkOptions = await GenerateLinksOptions();
    m_iconOptions = await GenererateIconOptions();
}

/**
 * Function that generate all the menu options
 * used by the select input ParentMenu
 */
async function GenererateMenuOptions()
{
    let menus = await Ajax.GetData("/api/menus");
    let menusOptions = [];
    if(menus.data !== undefined)
    {
        menus.data.map((menu, index) => {
            if(menu.Principal)
            {
                let menuObject = {text: menu.Title, value: menu._id};
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
async function GenererateIconOptions()
{
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
        let IconsObject = {text: icon, value: icon, icon: icon};
        return IconsOptions.push(IconsObject);
    });
    return IconsOptions;
}

/**
 * Function that generate all the link options
 * used by the select input LinkTo
 */
async function GenerateLinksOptions()
{
    let navigationlinks =  await Ajax.GetData("/api/navigationlinks");
    let NavigationOptions = [];
    if(navigationlinks.data !== undefined)
    {
        navigationlinks.data.map((navlink, index) => {
            let NavigationObject = {text: navlink.Category + " | " +  navlink.Title, value: navlink.Link};
            return NavigationOptions.push(NavigationObject);
        });
    }
    return NavigationOptions;
}

/**
 * Function that creates a deep copy of the menu inputs and
 * returns the copy in the form of an array. Necessary in order
 * to avoid having collision betweens inputs and different forms.
 */
function CloneMenuInputs()
{
    let newArray = [];
    m_menuInputs.forEach((input) =>
    {
        newArray.push(Object.assign({}, input));
    });
    return newArray;
}

//-----Menu Schema functions for accessing the data outside this script-----//

/**
 * Methods that returns a new array with empty inputs
 */
MenuSchema.GetEmptyInputs = () =>
{
    return CloneMenuInputs();
}

/**
 * Method that return a new object based on the put config
 */
MenuSchema.GetPutConfig = () =>
{
    return Object.assign({}, m_putConfig);
}

/**
 * Method that return a new object based on the post config
 */
MenuSchema.GetPostConfig = () =>
{
    return Object.assign({}, m_postConfig);
}

/**
 * Method that populate the inputs with an existing menu.
 * return a set of inputs with value in them and modify returns
 * a putconfig with the menu id.
 * menu : menu object to bind the inputs to
 * return : array of all the binded inputs
 */
MenuSchema.GetBindedInputs = (menu) =>
{
    let bindedInputs = CloneMenuInputs();
    bindedInputs.forEach((input) =>{
        if(menu[input.name] !== undefined){
            input.value = menu[input.name];
            MenuSchema.ApplyCustomConstraints(input);
        }
    });
    return bindedInputs;
}

/**
 * Method that return a new object based on the put config and
 * assign the elementid property to the parameter id
 * id : id to assign the config to
 * return : the binded put configuration
 */
MenuSchema.GetBindedPutConfig = (id) =>
{
    let bindedPutConfig = MenuSchema.GetPutConfig();
    bindedPutConfig.elementId = id;
    return bindedPutConfig;
}

/**
 * Method that apply a custom constraits to the inputs.
 * Can be left empty
 */
MenuSchema.ApplyCustomConstraints = (input) =>
{
    //Custom constaints
    if(input.name === "Principal" && input.value)
        input.disabled = () => true;
}

export default MenuSchema;