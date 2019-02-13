import React, {Component} from 'react';
import Ajax from '../../../shared/ajax.js';

import {Button, Divider} from 'semantic-ui-react';

import  {default as ScheduleSchema} from '../../formSchema/scheduleSchema.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';

class Schedule extends Component{
    
    constructor(props)
    {
        super(props);
        this.state = {};
        this.PostConfig = ScheduleSchema.GetPostConfig();
        this.PostConfig.modalOpener = this.PostModalOpener;
    }

    componentDidMount()
    {
        this.GetSchedules();
    }

    PostModalOpener = () =>
    {
        return <Button color="teal" className="rounded-right">Ajouter un horaire</Button>
    }

    GetSchedules = async() =>
    {
        let request = await Ajax.GetData("/api/schedule/");
        if(request.success)
            this.setState({schedules : request.data});
    }

    DisplaySchedules = () =>
    {
        if(this.state.schedules !== undefined)
        {
            return this.state.schedules.map((schedule) =>(
                this.ScheduleCard(schedule)
            ));
        }
    }

    ScheduleCard = (schedule) =>
    {
        let PutConfig = ScheduleSchema.GetBindedPutConfig(schedule._id);
        PutConfig.modalOpener = () => this.PutModalOpener(schedule.Title);
        return  <FormGenerator
                    key={schedule._id}
                    Inputs={ScheduleSchema.GetBindedInputs(schedule)}
                    FormConfig={PutConfig}
                    FormStatus={new FormStatus()}
                    TextEditor={ScheduleSchema.GetBindedEditor(schedule.Description)}
                    RefreshDataSet={this.GetSchedules}
                    />
    }

    PutModalOpener = (title) =>
    {
        return  <div className="item-card">
                    <span>{title}
                    </span>
                </div>
    }

    render()
    {
        return(
        <div className="component-card medium-gutters">
            <h2>Les Horaires</h2>
            <FormGenerator
                Inputs={ScheduleSchema.GetEmptyInputs()}
                FormConfig={this.PostConfig}
                FormStatus={new FormStatus()}
                RefreshDataSet={this.GetSchedules}
                TextEditor={ScheduleSchema.GetEmptyEditor()}
                />
            <Divider />
            {this.DisplaySchedules()}
        </div>
        )
    }
}

export default Schedule;