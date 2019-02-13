import React, {Component} from 'react';
import Ajax from '../../../shared/ajax.js';

import PageHeader from '../pageHeader/pageHeader.js';

/**
 * Component used to display the contact information
 * of the city.
 */ 
class ContactInfo extends Component
{
    state ={}
    
    componentDidMount(){
        this.GetSchedules();
    }
    
    GetSchedules = async() =>{
        let request = await Ajax.GetData("/api/schedule");
        this.setState({schedules : request.data});
    }
    
    DisplaySchedules = () =>{
        
        if(this.state.schedules !== undefined){
            return this.state.schedules.map((schedule) =>(
                <div style={{margin: "1vw 0"}} key={schedule._id}>
                    <h2>{schedule.Title}</h2>
                    <p dangerouslySetInnerHTML={this.CreateMarkup(schedule.Description)}></p>
                </div>
            ))
        }
    }
    
    CreateMarkup = (content) => {
        return { __html: content }
    }

    
    render(){
        return  <div className="component-card large-gutters rounded">
                    <PageHeader title="Coordonnées" category="Contact"/>
                    <div style={{marginTop: "2vw"}}>
                        <h2>Hôtel de Ville</h2>
                        <p>91 Rue Principale, <br />
                        Saint-Jacques-le-Mineur, <br />
                        QC J0J 1Z0 <br />
                        tél: (450) 347-5446
                        </p>
                    </div>
                    {this.DisplaySchedules()}
                </div>
    }
}

export default ContactInfo;