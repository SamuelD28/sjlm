import React, {Component} from 'react';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import Ajax from '../../../shared/ajax.js';
import {default as CategoryNewsSchema} from '../../formSchema/categoryNewsSchema.js';
import {default as NewsSchema} from '../../formSchema/newsSchema.js';
import {Divider, Button} from 'semantic-ui-react';
import CategoryNewsCard from '../../components/categoryNewsCard/categoryNewsCard.js';

class CategoryNews extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.PostConfig = CategoryNewsSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
    }

    componentDidMount()
    {
        this.GetCategoryNews();
    }

    ModalOpener = () =>
    {
        return <Button color="orange" inverted>Ajouter une catégorie</Button>
    }

    GetCategoryNews = async() =>
    {
        NewsSchema.Init(); //Reloads the category for the news form.
        let request = await Ajax.GetData("/api/categorynews/");
        this.setState({categoryNews : request.data});
    }

    DisplayCategoryNews = () =>
    {
        if(this.state.categoryNews !== undefined)
        {
            return this.state.categoryNews.map((category) =>(
                <CategoryNewsCard
                    key={category._id}
                    RefreshDataSet={this.GetCategoryNews}
                    category={category}
                    />
            ));
        }
    }

    render()
    {
        return  <div className="section-style">
                    <h2>Les Catégories</h2>
                    <FormGenerator
                        Inputs={CategoryNewsSchema.GetEmptyInputs()}
                        FormConfig={this.PostConfig}
                        FormStatus={new FormStatus()}
                        RefreshDataSet={this.GetCategoryNews}
                    />
                    <Divider />
                    {this.DisplayCategoryNews()}
                </div>
    }
}

export default CategoryNews;