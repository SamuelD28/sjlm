//Initial Declaration and importation
import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';

//Css Module
import CssModules from 'react-css-modules';
import styles from './pages.module.css';

//Components
import PagesCard from '../../components/pagesCard/pagesCard.js';
import PagesCreate from '../../components/pagesCreate/pagesCreate.js';
import { Input } from 'semantic-ui-react';

import Menus from '../menus/menus.js';

//This Component is responsible for holding the state that will be modified by its crud components
class Pages extends Component {

    constructor(props) {
        super(props);
        this.state = { searchValue: "" }
        this.Menus = React.createRef();
    }

    componentDidMount() {
        this.GetPages();
    }

    GetPages = async() => {
        this.Menus.current.GetMenus();
        let request = await Ajax.GetData("/api/pages/");
        this.setState({ pages: request.data });
    }

    DisplayPagesCard = () => {
        if (this.state.pages !== undefined) {
            if (this.state.pages.length > 0)
                return this.state.pages.map((page, index) => {

                    if (page.PageTitle.toLowerCase().includes(this.state.searchValue))
                        return <PagesCard
                                index={index}
                                page={page}
                                key={page._id}
                                RefreshDataSet={this.GetPages}
                                />
                })
            else
                return <h2>Aucune page disponible</h2>
        }
    }

    SearchPages = (e, data) => {
        this.setState({ searchValue: data.value });
    }

    render() {
        return (
            <div className="admin-page">
            <section className="section-row">
                <div className="section-left-column">
                    <Menus ref={this.Menus}/>
                </div>
                <div className="section-right-column component-card rounded medium-gutters">
                    <PagesCreate RefreshDataSet={this.GetPages}/>
                    <h1>Les Pages</h1>
                    <Input
                        style={{width: "30%", marginBottom: "1vw"}}
                        type="text"
                        icon='search'
                        placeholder="Rechercher..."
                        onChange={this.SearchPages}
                        />
                    <div styleName="pagesContainer">
                        {this.DisplayPagesCard()}
                    </div>
                </div>
            </section>
        </div>)
    }
}

export default CssModules(Pages, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
