import React, { Component } from 'react';
// import moment from 'moment';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import { default as NewsSchema } from '../../formSchema/newsSchema.js';

import NewsCard from '../newsCard/newsCard.js';

//This component is responsible for both the modification and suppression of news post in the database. The data are passed by the parent container news.
class NewsEdit extends Component {

    //We initialise the form data with a new object reference that way we dont trigger the update function on the state in the parent container.
    constructor(props) {
        super(props);
        this.PutConfig = NewsSchema.GetBindedPutConfig(props.news._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }

    ModalOpener = () => {
        return (
            <div style={{height: "100%"}}>
            <NewsCard news={this.props.news}/>
            <div className="cardOverlay cardEdit">
                <div className="cardOverlayBtn">
                    <i className="icon edit"></i>
                    <h4>Modifier</h4>
                </div>
            </div>
        </div>
        )
    }

    render() {
        return (
            <FormGenerator
            Inputs = { NewsSchema.GetBindedInputs(this.props.news) }
            FormConfig = { this.PutConfig }
            FormStatus = { new FormStatus() }
            TextEditor = { NewsSchema.GetBindedEditor(this.props.news.Description) }
            RefreshDataSet = { this.props.RefreshDataSet }
            />
        )
    }
}

export default NewsEdit;
