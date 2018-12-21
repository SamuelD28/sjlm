import React from 'react';

import FormComponent from '../FormComponent.js';
import Ajax from '../../../shared/ajax.js';
import {FormGenerator, FormConfig, FormStatus, InputSchema} from '../../../shared/FormGenerator/formGenerator.js';

class MenuCards extends FormComponent{

    constructor(props)
    {
        super(props);
        this.FormConfig = new FormConfig({url: "/api/menus/",
                                          elementId: props.menu._id,
                                          httpRequest : "PUT",
                                          modal: true,
                                          title: "Modifier un menu",
                                          size: "small",
                                          modalOpener : this.ModalOpener});
        this.FormStatus  = new FormStatus();
        //Inputs schema for the form generator
        this.Inputs =   [new InputSchema({
                                        name: "Principal",
                                        type: "toggle",
                                        label : "Menu principal",
                                        value: props.menu.Principal}),
                        new InputSchema({
                                        name: "Title",
                                        group: 1,
                                        width: 10,
                                        type: "text",
                                        label: "Titre du menu",
                                        value : props.menu.Title}),
                        new InputSchema({
                                        name : "Icon",
                                        group: 1,
                                        width: 6,
                                        type: "select",
                                        label: "Icon du menu",
                                        disabled: (inputs) => {
                                                    return !inputs[0].value;
                                        },
                                        value : props.menu.Icon,
                                        list : [],
                                        generator : () =>  { return this.GenererateIconOptions() }}),
                        new InputSchema({
                                        name : "LinkTo",
                                        type: "select",
                                        group: 2,
                                        label: "Lien de navigation",
                                        value : props.menu.LinkTo,
                                        list : [],
                                        generator : () =>  { return this.links }}),
                        new InputSchema({
                                        name : "ParentMenu",
                                        type: "select",
                                        group: 2,
                                        disabled: (inputs) => {
                                            return inputs[0].value;
                                        },
                                        label: "Menu parent",
                                        value : props.menu.ParentMenu,
                                        list : [],
                                        generator : () =>  { return this.GenererateMenuOptions() }})
        ];
    }

    componentDidMount = async() =>
    {
        let request = await Ajax.GetData("/api/navigationlinks");
        this.setState({navLinks : request.data.slice()});
        this.links = await this.GenerateLinksOptions();
    }

    GenererateMenuOptions = () =>
    {
        let MenuOptions = [];
        if(this.props.menus !== undefined)
        {
            this.props.menus.map(function(menu, index){
                if(menu.Principal)
                {
                    let MenuObject = {text: menu.Title, value: menu._id};
                    MenuOptions.push(MenuObject);
                }
                return MenuOptions;
            });
        }
        return MenuOptions;
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

    GenererateIconOptions = () =>
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
        if(this.props.menus !== undefined)
        {
            IconsArray.map((icon, index) => {
                let IconsObject = {text: icon, value: icon, icon: icon};
                return IconsOptions.push(IconsObject);
            });
        }
        return IconsOptions;
    }

    GenerateLinksOptions = () =>
    {
        let NavigationOptions = [];
        if(this.state.navLinks !== undefined)
        {
            this.state.navLinks.map((navlink, index) => {
                let NavigationObject = {text: navlink.Category + " | " +  navlink.Title, value: navlink.Link};
                return NavigationOptions.push(NavigationObject);
            });
        }
        return NavigationOptions;
    }

    ModalOpener = () =>
    {
        return(
            <div>
                <i className={`icon ${this.props.menu.Icon}`}></i>  {this.props.menu.Title.toUpperCase()}
            </div>)
    }

    render(){
    return(
        <FormGenerator
        Inputs={this.Inputs}
        TextEditor={this.TextEditor}
        FormStatus={this.FormStatus}
        FormConfig={this.FormConfig}/>
    )}
}

export default MenuCards;