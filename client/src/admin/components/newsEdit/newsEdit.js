//Library and modules
import React, { Component } from 'react';
import { default as NewsSchema } from '../../formSchema/newsSchema.js';

//Components
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import NewsCard from '../newsCard/newsCard.js';

class NewsEdit extends Component {

    constructor(props) {
        super(props);
        this.PutConfig = NewsSchema.GetBindedPutConfig(props.news._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }
    
    /**
     * UI that triggers the opening of
     * a modal form
     */
    ModalOpener = () => {
        return  <NewsCard news={this.props.news}/>
                
    }

    render() {
        return  <FormGenerator
                    Inputs = { NewsSchema.GetBindedInputs(this.props.news) }
                    FormConfig = { this.PutConfig }
                    FormStatus = { new FormStatus() }
                    TextEditor = { NewsSchema.GetBindedEditor(this.props.news.Description) }
                    RefreshDataSet = { this.props.RefreshDataSet }
                    />
    }
}

export default NewsEdit;
