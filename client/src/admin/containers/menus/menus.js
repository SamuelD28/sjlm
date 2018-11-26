import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';

import Ajax from '../../../shared/ajax.js';

import MenuCards from '../../components/menuCards/menuCards.js';
import FormGenerator from '../../components/FormGenerator/formGenerator.js';

import CSSModules from 'react-css-modules';
import styles from './menus.module.css';
import adminStyles from '../index.module.css';

// Skeleton
// name : string (must match the schema name used in database),
// group: number > 0,
// width: number > 0 < 16,
// type: string [select/text/uploader/texteditor/toggle],
// label: string,
// disabled: anonymous function that return true/false needs a inputs parameter,
// value : string/bool/array,
// list : array
// generator : function that returns an array


class Menus extends CrudComponent {
    FormSchema = {
        Inputs : [
            {
                name: "Principal",
                type: "toggle",
                label : "Menu principal",
                value: false
            },
            {
                name: "Title",
                group: 1,
                width: 10,
                type: "text",
                label: "Titre du menu",
                value : "",
            },
            {
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
                generator : () =>  { return this.GenererateIconOptions() }
            },
            {
                name : "LinkTo",
                type: "select",
                group: 2,
                label: "Lien de navigation",
                value : "",
                list : [],
                generator : () =>  { return this.links }
            },
            {
                name : "ParentMenu",
                type: "select",
                group: 2,
                label: "Menu parent",
                value : "",
                list : [],
                generator : () =>  { return this.GenererateMenuOptions() }
            },
        ],
        FormStatus : {
            open: false,
            loading : false,
            errors : [],
            errorsHeader : "La vérification à échoué pour les raisons suivantes : "
        },
        FormConfig : {
            title : "Ajouter un menu",
            url : "/api/menus/",
            httpRequest : "POST",
            elementId : "",
            size : "small"
        }
    };

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
                <FormGenerator FormSchema={this.FormSchema}/>
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
