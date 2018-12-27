import React, {Component} from 'react';

import Ajax from '../../../shared/ajax.js';
import MenuCards from '../../components/menuCards/menuCards.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import {default as MenuSchema} from '../../formSchema/menuSchema.js';

import CSSModules from 'react-css-modules';
import styles from './menus.module.css';
import adminStyles from '../index.module.css';

class Menus extends Component {
    constructor(props)
    {
        super(props);
        this.Inputs = MenuSchema.GetEmptyInputs();
        this.PostConfig = MenuSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
        this.state = {};
    }

    componentDidMount() {
        this.GetMenus();
    }

    GetMenus = async() =>
    {
        let request = await Ajax.GetData("/api/menus/");
        await this.setState({menus : request.data});
    }

    DisplayMenusCard = () => {
        if (this.state.menus !== undefined) {
            return (
                this.state.menus.map((menu, index) => (
                    this.DisplayMenuPrincipal(menu, index)
                )))
        }
    }

    DisplayMenuPrincipal = (menu, index) => {
        if (menu.Principal)
            return(
            <div key={menu._id}>
                <div styleName="menuTitle">
                    <MenuCards menu={menu} RefreshDataSet={this.GetMenus}/>
                </div>
                <div styleName="submenuContainer">
                    {this.DisplaySubmenu(menu.SubMenu)}
                </div>
            </div>)
    }

    DisplaySubmenu = (submenu) => {
        if (submenu.length > 0)
            return submenu.map((menu, index) => (
                <div styleName="menuTitle" key={menu._id}>
                    <MenuCards menu={menu} RefreshDataSet={this.GetMenus}/>
                </div>
            ));
    }

    ModalOpener = () =>
    {
        return(
        <div className="cardOverlay">
            <div className="cardOverlayBtn">
                <i className="icon plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>)
    }

    render() {
        return (
            <div className={adminStyles.adminPage}>
            <section className="section-row">
                <div styleName="leftColumn">
                    <FormGenerator
                    Inputs={this.Inputs}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    RefreshDataSet={this.GetMenus}/>
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
