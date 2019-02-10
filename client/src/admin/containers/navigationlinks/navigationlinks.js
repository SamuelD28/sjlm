import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as NavigationSchema } from '../../formSchema/navigationSchema.js';

import CSSModules from 'react-css-modules';
import styles from './navigationlinks.module.css';

class NavigationLinks extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.GetNavigationlinks();
    }

    GetNavigationlinks = async() => {
        let request = await Ajax.GetData("/api/navigationlinks/");
        this.setState({ navigationlinks: request.data });
    }

    ModalOpener = (link) => {

        return <div className="item-card-shadow anim-bounce-up">
                    <h3 style={{margin: "0"}}>{link.Title}</h3>
                    <h4 style={{margin: "0"}}>{link.Link}</h4>
                </div>
    }

    DisplayNavigationCards = () => {
        if (this.state.navigationlinks !== undefined)
            return this.state.navigationlinks.map((link, index) => {

                let PutConfig = NavigationSchema.GetBindedPutConfig(link._id);
                PutConfig.modalOpener = () => this.ModalOpener(link);
                return <FormGenerator
                            key={link._id}
                            Inputs = { NavigationSchema.GetBindedInputs(link)}
                            FormConfig = { PutConfig }
                            FormStatus = { new FormStatus() }
                            RefreshDataSet = { this.GetNavigationlinks }
                            />
            });
    }

    render() {
        return <section className="component-card rounded medium-gutters">
                    <h1>Les liens de navigation</h1>
                    <div styleName="navigationCards">
                        {this.DisplayNavigationCards()}
                    </div>
                </section>
    }
}

export default CSSModules(NavigationLinks, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
