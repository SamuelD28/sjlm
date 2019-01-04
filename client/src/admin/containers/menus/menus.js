import React, { Component } from 'react';

import Ajax from '../../../shared/ajax.js';
import MenuCards from '../../components/menuCards/menuCards.js';
import MenuCreate from '../../components/menuCreate/menuCreate.js';
import {default as MenuSchema} from '../../formSchema/menuSchema.js';

import {Divider} from 'semantic-ui-react';

class Menus extends Component {

    constructor(props)
    {
        super(props);
        this.state= {};
        this.MenuCards = React.createRef();
    }

    componentDidMount() {
        this.GetMenus();
    }

    GetMenus = async() => {
        await MenuSchema.Init();
        let request = await Ajax.GetData("/api/menus/");
        this.setState({ menus: request.data });
    }

    DisplayMenusCard = () => {
        if (this.state.menus !== undefined) {
            return  this.state.menus.map((menu, index) => (
                        <MenuCards
                            ref={this.MenuCards}
                            key={menu._id}
                            menu={menu}
                            index={index}
                            RefreshDataSet={this.GetMenus}
                            />))
        }
    }
    render() {
        return (
        <div className="section-style">
            <h2>Le Menu</h2>
            <MenuCreate RefreshDataSet={this.GetMenus} />
            <Divider />
            {this.DisplayMenusCard()}
        </div>
        )
    }
}

export default Menus;
