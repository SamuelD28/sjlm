/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */
import React from 'react'; //React is needed here because we use jsx in the methods
import Ajax from '../../shared/ajax.js';
import {FormConfig, InputSchema} from '../../shared/FormGenerator/formGenerator.js';

class MenuSchema
{
    constructor()
    {
    //Need to find a way to remove this. Temporary fix
    this.Init();

    //Contains the form configuration for creating a post request
    this.postConfig = new FormConfig({url: "/api/menus/",
                                     httpRequest : "POST",
                                     modal: true,
                                     size: "small",
                                     title: "Ajouter un Menu",
                                     modalOpener : this.PostOpener});

    //Contains the form configuration for creating a put request
    //Must assign the key element id outside this file in order to use it.
    this.putConfig = new FormConfig({url: "/api/menus/",
                                    httpRequest : "PUT",
                                    modal: true,
                                    title: "Modifier un menu",
                                    size: "small",
                                    modalOpener : this.PutOpener});

    //Contains all the definition for the inputs to display
    //The form generator need at least one input
    this.menuInputs =   [new InputSchema({
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
                                            generator : () =>  { return this.iconOptions;  }
                            }),
                            new InputSchema({
                                            name : "LinkTo",
                                            type: "select",
                                            group: 2,
                                            label: "Lien de navigation",
                                            value : "",
                                            generator : () =>  { return this.linkOptions; }
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
                                            generator : () =>  { return  this.menuOptions; }
                            })
            ];
    }

    //Need to find a way to remove this method. The generator option is
    // giving me trouble since the method cant be async, it doesnt wait
    //for the array to return an thus throws an error
    Init  = async() =>
    {
        this.menuOptions = await this.GenererateMenuOptions();
        this.linkOptions = await this.GenerateLinksOptions();
        this.iconOptions = await this.GenererateIconOptions();
    }

    //Method that populate the inputs with an existing menu.
    //return a set of inputs with value in them and modify returns
    //a putconfig with the menu id.
    InsertValuesInInputs = (menu) =>
    {
        Object.entries(menu).forEach(
            ([key, value]) =>{

            })
        //bind the menu values to the inputs. Return a populated inputs arrays
    }

    PutOpener = () =>
    {
        return(
        <div>
            <i className={`icon ${this.props.menu.Icon}`}></i>  {this.props.menu.Title.toUpperCase()}
        </div>)
    }

    PostOpener = () =>
    {
        return(
        <div className="cardOverlay">
            <div className="cardOverlayBtn">
                <i className="icon plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>)
    }

    GenererateMenuOptions = async() =>
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

    GenererateIconOptions = async() =>
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

    GenerateLinksOptions = async() =>
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
}

export default MenuSchema;