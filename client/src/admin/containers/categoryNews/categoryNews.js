import React, {Component} from 'react';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import Ajax from '../../../shared/ajax.js';
import {default as CategoryNewsSchema} from '../../formSchema/categoryNewsSchema.js';
import {Divider} from 'semantic-ui-react';

class CategoryNews extends Component
{
    state = {}

    async componentDidMount()
    {
        this.GetCategoryNews();
    }

    GetCategoryNews = async() =>
    {
        let request = await Ajax.GetData("/api/categorynews/");
        console.log(request);
        this.setState({categoryNews : request.data});
    }

    DisplayCategoryNews = () =>
    {
        if(this.state.categoryNews !== undefined)
        {
            return this.state.categoryNews.map((category) =>(
                <div className="pagesCard">
                    <h4>{category.Title}
                        <i
                            onClick={() => this.DeleteCategory(category._id)}
                            style={{float: "right"}}
                            className="icon remove"></i>
                    </h4>
                </div>
            ));
        }
    }

    //Retirer cette methode sinon quelqun pourrait briser le systeme en supprimant une categorie utilise
    DeleteCategory = async(id) =>
    {
        let request = await Ajax.DeleteData("/api/categorynews/" +  id);

        if(request.success){
            this.GetCategoryNews();
        }
    }

    render()
    {
        return(
        <div className="plainForm">
            <h2 style={{textAlign: "center"}}>Catégories</h2>
            <Divider />
            <FormGenerator
                Inputs={CategoryNewsSchema.GetEmptyInputs()}
                FormConfig={CategoryNewsSchema.GetPostConfig()}
                FormStatus={new FormStatus()}
                RefreshDataSet={this.GetCategoryNews}
            />
            <Divider />
            {this.DisplayCategoryNews()}
        </div>
        )
    }
}

export default CategoryNews;