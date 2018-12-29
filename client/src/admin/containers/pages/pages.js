//Initial Declaration and importation
import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';

//Css Module
import CssModules from 'react-css-modules';
import styles from './pages.module.css';
import adminStyles from '../index.module.css';

//Components
import PagesCard from '../../components/pagesCard/pagesCard.js';
import PagesCreate from '../../components/pagesCreate/pagesCreate.js';

//This Component is responsible for holding the state that will be modified by its crud components
class Pages extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.GetPages();
    }

    GetPages = async() => {
        let request = await Ajax.GetData("/api/pages/");
        this.setState({ pages: request.data });
    }

    DisplayPagesCard = () => {
        if (this.state.pages !== undefined) {
            return (
                this.state.pages.map((page, index) => (
                    <PagesCard
                    page={page}
                    key={page._id}
                    RefreshDataSet={this.GetPages}
                    />
                )))
        }
    }

    render() {
        return (
            <div className={adminStyles.adminPage}>
        <section className="section-row">
            <div styleName="pagesLeftColumn columnContainer">
                <PagesCreate
                    RefreshDataSet={this.GetPages}
                    />
            </div>
            <div styleName="pagesRightColumn columnContainer">
                {this.DisplayPagesCard()}
            </div>
        </section>
    </div>
        )
    }
}

export default CssModules(Pages, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
