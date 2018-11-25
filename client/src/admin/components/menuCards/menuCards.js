import React from 'react';
import {Modal, Form, Select, Checkbox} from 'semantic-ui-react';

import FormComponent from '../FormComponent.js';
import LoaderComponent from '../loaderComponent/loaderComponent.js';
import Ajax from '../../../shared/ajax.js';


class MenuCards extends FormComponent{

    constructor(props)
    {
        super(props);
        this.state = {};
        this.formData =Object.create(this.props.menu);
    }

    componentDidMount = async() =>
    {
        let request = await Ajax.GetData("/api/navigationlinks");
        this.setState({navLinks : request.data.slice()});
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
                <Form onSubmit={() => {this.UpdateInDb("/api/menus/")}}>
                    <Form.Field width={4}>
                        <label>Menu Principal</label>
                        <Checkbox
                        name="Principal"
                        onChange={this.HandleChange}
                        defaultChecked={this.formData.Principal}
                        toggle />
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Menu Parent</label>
                            <Select
                                name="ParentMenu"
                                disabled={this.formData.Principal}
                                placeholder="Choisir un Menu"
                                options={this.GenererateMenuOptions()}
                                defaultValue={this.formData.ParentMenu}
                                clearable
                                onChange={this.HandleChange}
                                selection />
                        </Form.Field>
                        <Form.Field>
                            <label>Icon du Menu</label>
                            <Select
                                name="Icon"
                                placeholder='Choisir une icon'
                                clearable
                                selection
                                defaultValue={this.formData.Icon}
                                onChange={this.HandleChange}
                                options={this.GenererateIconOptions()} />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field required>
                        <label>Titre du Menu</label>
                        <input
                            name="Title"
                            placeholder="Titre..."
                            defaultValue={this.formData.Title}
                            onChange={this.HandleChange}
                            type="text"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Lien de Navigation</label>
                        <Select
                        name="LinkTo"
                        placeholder='Lien de navigation'
                        clearable
                        selection
                        defaultValue={this.formData.LinkTo}
                        options={this.GenerateLinksOptions()} />
                    </Form.Field>
                    <Form.Field>
                        <button onClick={() => {this.DeleteInDb("/api/menus/")}}  className="btn btn-danger"><i className="icon trash"></i> Supprimer</button>
                        <button style={{marginLeft: '.5vw'}} disabled={this.state.disableSubmit} type="submit" className="btn btn-primary"><i className="icon save"></i> Sauvegarder</button>
                    </Form.Field>
                </Form>
            </Modal.Description>
            <LoaderComponent action={this.state.action} />
        </Modal.Content>
    </Modal>
    )}
}

export default MenuCards;