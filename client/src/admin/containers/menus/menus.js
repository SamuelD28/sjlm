import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';

import Ajax from '../../../shared/ajax.js';

import MenuCards from '../../components/menuCards/menuCards.js';
import {FormGenerator, FormConfig, FormStatus, InputSchema} from '../../../shared/FormGenerator/formGenerator.js';

import CSSModules from 'react-css-modules';
import styles from './menus.module.css';
import adminStyles from '../index.module.css';

class Menus extends CrudComponent {
    constructor(props)
    {
        super(props);

        //Configuration and form status for the form generator
        let config = new FormConfig({url: "/api/menus/",httpRequest : "POST", modal: true});
        let status  = new FormStatus();

        //Inputs schema for the form generator
        let principalInput = new InputSchema({
                                        name: "Principal",
                                        type: "toggle",
                                        label : "Menu principal",
                                        value: false});
        let titleInput = new InputSchema({
                                        name: "Title",
                                        group: 1,
                                        width: 10,
                                        type: "text",
                                        label: "Titre du menu",
                                        value : ""});
        let iconInput = new InputSchema({
                                        name : "Icon",
                                        group: 1,
                                        width: 6,
                                        type: "select",
                                        label: "Icon du menu",
                                        disabled: (inputs) => {
                                                    return !inputs[0].value;
                                        },
                                        value : "",
                                        list : [],
                                        generator : () =>  { return this.GenererateIconOptions() }});
        let linktoInput = new InputSchema({
                                        name : "LinkTo",
                                        type: "select",
                                        group: 2,
                                        label: "Lien de navigation",
                                        value : "",
                                        list : [],
                                        generator : () =>  { return this.links }});
        let parentmenuInput = new InputSchema({
                                        name : "ParentMenu",
                                        type: "select",
                                        group: 2,
                                        label: "Menu parent",
                                        value : "",
                                        list : [],
                                        generator : () =>  { return this.GenererateMenuOptions() }});

        this.FormConfig = config;
        this.FormStatus = status;
        this.Inputs = [principalInput, titleInput, iconInput, linktoInput, parentmenuInput];
    }

    async componentDidMount() {
        this.ReadInTempState("/api/menus");
        this.links = await this.GenerateLinksOptions();
    }

    DisplayMenusCard = () => {
        if (this.state.db !== undefined) {
            return (
                this.state.db.map((menu, index) => (
                    this.DisplayMenuPrincipal(menu, index)
                )))
        }
    }

    GenererateMenuOptions = () =>
    {
        let MenuOptions = [];
        if(this.state.db !== undefined)
        {
            this.state.db.map((menu, index) => {
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

    DisplayMenuPrincipal = (menu, index) => {
        if (menu.Principal)
            return(
            <div key={index}>
                <div styleName="menuTitle">
                    <MenuCards menus={this.state.db} menu={menu}/>
                </div>
                <div styleName="submenuContainer">
                    {this.DisplaySubmenu(menu.SubMenu)}
                </div>
            </div>)
    }

    DisplaySubmenu = (submenu) => {
        if (submenu.length > 0)
            return submenu.map((menu, index) => (
                <div styleName="menuTitle">
                    <MenuCards menus={this.state.db} menu={menu} />
                </div>
            ));
    }

    render() {
        return (
            <div className={adminStyles.adminPage}>
            <section className="section-row">
                <div styleName="leftColumn">
                    <FormGenerator Inputs={this.Inputs} FormConfig={this.FormConfig} FormStatus={this.FormStatus}/>
                </div>
                <div styleName="columnContainer rightColumn">
                    {this.DisplayMenusCard()}
                </div>
        </section>
    </div>
        )
    }
}

export default CSSModules(Menus, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
