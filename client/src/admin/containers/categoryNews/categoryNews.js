import React, {Component} from 'react';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import Ajax from '../../../shared/ajax.js';
import {default as CategoryNewsSchema} from '../../formSchema/categoryNewsSchema.js';
import {default as NewsSchema} from '../../formSchema/newsSchema.js';
import {Divider, Button} from 'semantic-ui-react';

class CategoryNews extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.PostConfig = CategoryNewsSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.PostModalOpener;
    }

    componentDidMount()
    {
        this.GetCategoryNews();
    }

    PostModalOpener = () =>
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
                this.CategoryCard(category)
            ));
        }
    }

    CategoryCard = (category) =>
    {
        let PutConfig = CategoryNewsSchema.GetBindedPutConfig(category._id);
        PutConfig.modalOpener = () => this.PutModalOpener(category);
        return  <FormGenerator
                    key={category._id}
                    Inputs={CategoryNewsSchema.GetBindedInputs(category)}
                    FormConfig={PutConfig}
                    FormStatus={new FormStatus()}
                    RefreshDataSet={this.GetCategoryNews}
                    />
    }

    PutModalOpener = (category) =>
    {
        return  <div className="pagesCard" key={category._id}>
                    <h4>{category.Title}
                    </h4>
                </div>
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