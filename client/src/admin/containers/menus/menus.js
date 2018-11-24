import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';

import MenuCards from '../../components/menuCards/menuCards.js';
import MenuCreate from '../../components/menuCreate/menuCreate.js';

import CSSModules from 'react-css-modules';
import styles from './menus.module.css';
import adminStyles from '../index.module.css';

class Menus extends CrudComponent {
    componentDidMount() {
        this.ReadInTempState("/api/menus");
    }

    DisplayMenusCard = () => {
        if (this.state.db !== undefined) {
            return (
                this.state.db.map((menu, index) => (
                    this.DisplayMenuPrincipal(menu)
                )))
        }
    }

    DisplayMenuPrincipal = (menu) => {
        if (menu.Principal)
            return (
                <div>
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
                <MenuCreate
                menus={this.state.db}
                CreateInTempState={this.CreateInTempState}/>
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
