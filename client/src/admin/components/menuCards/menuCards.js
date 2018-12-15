import React from 'react';
import {Modal} from 'semantic-ui-react';

import FormComponent from '../FormComponent.js';
import LoaderComponent from '../loaderComponent/loaderComponent.js';
import Ajax from '../../../shared/ajax.js';
import {FormGenerator} from '../FormGenerator/formGenerator.js';

class MenuCards extends FormComponent{

    constructor(props)
    {
        super(props);
        this.FormSchema = {
            Inputs : [
                {
                    name: "Principal",
                    type: "toggle",
                    label : "Menu principal",
                    value: this.props.menu.Principal
                },
                {
                    name: "Title",
                    group: 1,
                    width: 10,
                    type: "text",
                    label: "Titre du menu",
                    value : this.props.menu.Title,
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
                    value : this.props.menu.Icon,
                    list : [],
                    generator : () =>  { return this.GenererateIconOptions() }
                },
                {
                    name : "LinkTo",
                    type: "select",
                    group: 2,
                    label: "Lien de navigation",
                    value : this.props.menu.LinkTo,
                    list : [],
                    generator : () =>  { return this.links }
                },
                {
                    name : "ParentMenu",
                    type: "select",
                    group: 2,
                    label: "Menu parent",
                    value : this.props.menu.ParentMenu,
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
                httpRequest : "PUT",
                elementId : this.props.menu._id,
                size : "small",
                modal: false
            }
        };
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

    render(){
    return(
    <Modal
    size="small"
    trigger={
    <div>
        <i className={`icon ${this.props.menu.Icon}`}></i>  {this.props.menu.Title.toUpperCase()}
    </div>
    }
    closeIcon>
    <Modal.Header>Modifier un Menu</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <FormGenerator FormSchema={this.FormSchema}/>
            </Modal.Description>
            <LoaderComponent action={this.state.action} />
        </Modal.Content>
    </Modal>
    )}
}

export default MenuCards;