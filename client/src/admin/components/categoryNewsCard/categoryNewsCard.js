import React, { Component } from 'react';
import { default as CategoryNewsSchema } from '../../formSchema/categoryNewsSchema.js';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';

/**
 * Component used for displaying a category for the news and
 * opening a modal form when clicking on it
 */
class CategoryNewsCard extends Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.PutConfig = CategoryNewsSchema.GetBindedPutConfig(props.category._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }

    ModalOpener = () => {
        return <div className="item-card">
                    <span>{this.props.category.Title}
                    </span>
                </div>
    }

    render() {
        return <FormGenerator
                Inputs = { CategoryNewsSchema.GetBindedInputs(this.props.category) }
                FormConfig = { this.PutConfig }
                FormStatus = { new FormStatus() }
                RefreshDataSet = { this.props.RefreshDataSet }
                TextEditor={CategoryNewsSchema.GetBindedEditor(this.props.category.Description)}
            />
    }
}

export default CategoryNewsCard;
