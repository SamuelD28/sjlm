import React, { Component } from 'react';
import { FormGenerator, FormStatus } from '../../../shared/FormGenerator/formGenerator.js';
import Ajax from '../../../shared/ajax.js';
import { default as CategoryNewsSchema } from '../../formSchema/categoryNewsSchema.js';
import { default as NewsSchema } from '../../formSchema/newsSchema.js';
import { Divider, Button } from 'semantic-ui-react';
import CategoryNewsCard from '../../components/categoryNewsCard/categoryNewsCard.js';

/**
 * Component responsible for the interaction
 * with the categorynews api.
 */
class CategoryNews extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.PostConfig = CategoryNewsSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.ModalOpener;
    }

    componentDidMount() {
        this.GetCategoryNews();
    }
    
    /**
     * UI trigger to open up the modal form
     * for adding a new category news
     */
    ModalOpener = () => {
        return <Button color="teal" className="rounded-more">Ajouter une catégorie</Button>
    }

    /**
     * Method that gets all the category news from
     * the database and refresh the news input to
     * match any added or deleted category
     */
    GetCategoryNews = async() => {
        let request = await Ajax.GetData("/api/categorynews/");
        if(request.success){
            
            if(request.data.length !== this.state.categoryNews)
                NewsSchema.Init(); //Reloads the category for the news form.
            
            this.setState({ categoryNews: request.data });
        }
    }
    
    /**
     * Method that display all the 
     * category news card retrieve from
     * the database
     */
    DisplayCategoryNews = () => {
        if (this.state.categoryNews !== undefined) {
            return this.state.categoryNews.map((category) => (
                <CategoryNewsCard
                    key={category._id}
                    RefreshDataSet={this.GetCategoryNews}
                    category={category}
                    />
            ));
        }
    }

    render() {
        return <div className="component-card rounded medium-gutters">
                    <h2>Les Catégories</h2>
                    <FormGenerator
                        Inputs={CategoryNewsSchema.GetEmptyInputs()}
                        FormConfig={this.PostConfig}
                        FormStatus={new FormStatus()}
                        RefreshDataSet={this.GetCategoryNews}
                        TextEditor={CategoryNewsSchema.GetEmptyEditor()}
                        />
                    <Divider />
                    {this.DisplayCategoryNews()}
                </div>
    }
}

export default CategoryNews;
