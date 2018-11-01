import React from 'react';
import FormComponent from '../FormComponent';
import {Form, Checkbox, Dropdown} from 'semantic-ui-react';

class MenuCreate extends FormComponent
{
    GenererateMenuOptions = () =>
    {
        let MenuOptions = [];
        if(this.props.menus !== undefined)
        {
            this.props.menus.map((menu, index) => {
                let MenuObject = {text: menu.Title, value: menu._id};
                return MenuOptions.push(MenuObject);
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
    
    render()
    {
        return(
        <Form onSubmit={() => {this.CreateInDb("/api/menu")}}>
            <Form.Field width={4}>
                <label>Menu Principal</label>
                <Checkbox toggle />
            </Form.Field>
            <Form.Group widths="equal">
                <Form.Field>
                    <label>Menu Parent</label>
                    <Dropdown placeholder="Choisir un Menu" options={this.GenererateMenuOptions()} clearable selection />
                </Form.Field>
                <Form.Field>
                    <label>Icon du Menu</label>
                    <Dropdown placeholder='Choisir une icon' clearable selection options={this.GenererateIconOptions()} />
                </Form.Field>
            </Form.Group>
            <Form.Field required>
                <label>Titre du Menu</label>
                <input name="PageTitle" placeholder="Titre..." onChange={this.HandleChange} type="text"/>
            </Form.Field>
            <Form.Field>
                <label>Lien de Navigation</label>
                <input name="PageTitle" placeholder="Lien..." onChange={this.HandleChange} type="text"/>
            </Form.Field>
            <Form.Field>
                <button type="submit" className="btn btn-primary">Ajouter</button>
            </Form.Field>
        </Form>   
        )
    }
}

export default MenuCreate;