import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';


import MenuCards from '../../components/menuCards/menuCards.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import MenuSchema from '../../formSchema/menuSchema.js';

import CSSModules from 'react-css-modules';
import styles from './menus.module.css';
import adminStyles from '../index.module.css';

class Menus extends CrudComponent {
    constructor(props)
    {
        super(props);
        this.MenuSchema = new MenuSchema();
        this.MenuSchema.postConfig.modalOpener = this.ModalOpener;
    }

    //Need to remove this
    async componentDidMount() {
        this.ReadInTempState("/api/menus");
    }

    DisplayMenusCard = () => {
        if (this.state.db !== undefined) {
            return (
                this.state.db.map((menu, index) => (
                    this.DisplayMenuPrincipal(menu, index)
                )))
        }
    }

    DisplayMenuPrincipal = (menu, index) => {
        if (menu.Principal)
            return(
            <div key={index}>
                <div styleName="menuTitle">
                    <MenuCards menu={menu}/>
                </div>
                <div styleName="submenuContainer">
                    {this.DisplaySubmenu(menu.SubMenu)}
                </div>
            </div>)
    }

    DisplaySubmenu = (submenu) => {
        if (submenu.length > 0)
            return submenu.map((menu, index) => (
                <div styleName="menuTitle" key={index}>
                    <MenuCards menu={menu} />
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
                    Inputs={this.MenuSchema.menuInputs}
                    FormConfig={this.MenuSchema.postConfig}
                    FormStatus={new FormStatus()}/>
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
