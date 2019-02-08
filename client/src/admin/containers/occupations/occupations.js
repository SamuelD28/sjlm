import React, {Component} from 'react';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';
import Ajax from '../../../shared/ajax.js';
import {default as OccupationsSchema} from '../../formSchema/occupationsSchema.js';
import {default as MemberSchema} from '../../formSchema/memberSchema.js';
import {Divider, Button} from 'semantic-ui-react';

class Occupations extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.PostConfig = OccupationsSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.PostModalOpener;
    }

    componentDidMount()
    {
        this.GetOccupations();

    }

    PostModalOpener = () =>
    {
        return (<Button color="teal" className="rounded-right">Ajouter un poste</Button>)
    }

    GetOccupations = async() =>
    {
        MemberSchema.Init();
        let request = await Ajax.GetData("/api/occupations/");
        this.setState({occupations : request.data});
    }

    DisplayOccupations = () =>
    {
        if(this.state.occupations !== undefined)
        {
            return this.state.occupations.map((category) =>(
                this.OccupationsCard(category)
            ));
        }
    }

    OccupationsCard = (occupation) =>
    {
        let PutConfig = OccupationsSchema.GetBindedPutConfig(occupation._id);
        PutConfig.modalOpener = () => this.PutModalOpener(occupation.Title);
        return  <FormGenerator
                    key={occupation._id}
                    Inputs={OccupationsSchema.GetBindedInputs(occupation)}
                    FormConfig={PutConfig}
                    FormStatus={new FormStatus()}
                    RefreshDataSet={this.GetOccupations}
                    />
    }

    PutModalOpener = (title) =>
    {
        return  <div className="item-card">
                    <h4>{title}
                    </h4>
                </div>
    }

    render()
    {
        return(
        <div className="component-card medium-gutters">
            <h2>Les Postes</h2>
            <FormGenerator
                Inputs={OccupationsSchema.GetEmptyInputs()}
                FormConfig={this.PostConfig}
                FormStatus={new FormStatus()}
                RefreshDataSet={this.GetOccupations}
            />
            <Divider />
            {this.DisplayOccupations()}
        </div>
        )
    }
}

export default Occupations;