import React, { Component } from 'react';

import Ajax from '../../../shared/ajax.js';
import MenuCards from '../../components/menuCards/menuCards.js';
import MenuCreate from '../../components/menuCreate/menuCreate.js';
import {default as MenuSchema} from '../../formSchema/menuSchema.js';

import CSSModules from 'react-css-modules';
import styles from './menus.module.css';
import {Divider, Accordion, Icon} from 'semantic-ui-react';

class Menus extends Component {

    state = {}

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }


    componentDidMount() {
        this.GetMenus();
    }

    GetMenus = async() => {
        let request = await Ajax.GetData("/api/menus/");
        MenuSchema.GenererateMenuOptions(request.data);
        await this.setState({ menus: request.data });
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
        const { activeIndex } = this.state
        if (menu.Principal)
            return (
            <Accordion
                styled
                fluid
                key={menu._id}>
                <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <Icon name='dropdown' />
                        <MenuCards menu={menu} RefreshDataSet={this.GetMenus}/>
                    </div>
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                        {this.DisplaySubmenu(menu.SubMenu)}
                </Accordion.Content>
            </Accordion>)
    }

    DisplaySubmenu = (submenu) => {
        if (submenu.length > 0)
            return submenu.map((menu, index) => (
                <div styleName="menuTitle" key={menu._id}>
                    <MenuCards menu={menu} RefreshDataSet={this.GetMenus}/>
                </div>
            ));
        else
            return(
                <div styleName="menuTitle">
                    Aucun menu présent
                </div>
            )
    }

    render() {
        return (
        <div className="adminCard">
            <h2 >Le Menu</h2>
            <MenuCreate RefreshDataSet={this.GetMenus} />
            <Divider />
            {this.DisplayMenusCard()}
        </div>
        )
    }
}

export default CSSModules(Menus, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
