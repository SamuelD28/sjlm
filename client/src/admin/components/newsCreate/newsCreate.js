import React, { Component } from 'react';

import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as NewsSchema } from '../../formSchema/newsSchema.js';

// Css module import
import CSSModules from 'react-css-modules';
import styles from './newsCreate.module.css';

//This components hold the form to and fonctionality to create a new post in the database.
class NewsCreate extends Component {

    constructor(props) {
        super(props);
        this.PostConfig = NewsSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
    }

    ModalOpener = () => {
        return (
            <div className="cardContainer cardOverlay">
            <div className="cardOverlayBtn">
                <i className="icon plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>
        )
    }

    render() {
        return (
            <FormGenerator
                    Inputs={NewsSchema.GetEmptyInputs()}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={NewsSchema.GetEmptyEditor()}
                    RefreshDataSet={this.props.RefreshDataSet}
                    />
        )
    }
}

export default CSSModules(NewsCreate, styles, { allowMultiple: true, handleNotFoundStyleName: "log" });
