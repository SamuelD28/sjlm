import React, {Component} from 'react';
import {Modal, Form, Image} from 'semantic-ui-react';
import {Utility, Forms} from '../../../shared/utility.js';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './newsEdit.module.css';

class NewsEdit extends Component{
    
    constructor(props)
    { 
        super(props);
        let initialData = this.props.item;
        this.state = {initialData};
        this.tempState = {initialData};
        
        this.handleChange = this.handleChange.bind(this);
        this.UpdateNews = this.UpdateNews.bind(this);
    }
    
    handleChange(event)
    {
        let target = event.target;
        let type = target.type;
        let value;
        let name = target.name;
        
        switch(type){
            case "checkbox": 
                    value = target.checked; 
                    break;
            case "file":
                    value = target.files[0].name;
                    Utility.ChangeLabelText(event);
                    break;
            default:
                    value = target.value;
        }
        this.tempState.initialData[name] = value;
    }
     
    UpdateNews(event)
    {
        event.preventDefault();
        const modalID = event.target.getAttribute("modal");
        const idOfData = this.tempState.initialData._id;
        const modifiedData = this.tempState.initialData;
        
        try{
            //Create the request body to be sent to the api
            let ajaxContent      = { method: "PUT",
                                    headers: {"Content-Type" : "application/json"},
                                    body: JSON.stringify(modifiedData)}
                                    
            //Ajax Request
            fetch("/api/news/" + idOfData , ajaxContent)
            .then((res) =>{
                if(!res.ok)
                    throw new Error("An error occured while proccessing the data to the server");
                else{
                    return res;
                }
            })
            .then((data) =>{
                this.setState({data});
                Utility.CloseModal(event, modalID);
            })
            .catch((err) =>{
                console.log(err);
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }
     
    render(){
    if(this.tempState.initialData !== undefined){
    return(
    <Modal trigger={
        <div className="cardOverlay cardEdit">
            <div className="cardOverlayBtn">
                <i className="fas fa-edit"></i>
                <h4>Modifier</h4>
            </div>
        </div>} closeIcon>
        <Modal.Header>Modifier une Actualitée</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <span className="text-info text-xl" ><i class="clock outline icon"></i> Publication :  {`${this.tempState.initialData.DatePublished.year}-${this.tempState.initialData.DatePublished.month}-${this.tempState.initialData.DatePublished.day}`}</span>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui toggle checkbox">
                            <input onClick={this.handleChange} name="Important" type="checkbox" checked={this.tempState.initialData.Important}/>
                            <label>Actualitée Prioritaire</label>
                        </div>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field width={12}>
                           <input name="Title" type="text" placeholder="Titre" onChange={this.handleChange} defaultValue={this.tempState.initialData.Title}/>
                        </Form.Field>
                        <Form.Field width={4}>
                            <select className="ui dropdown" name="Category" defaultValue={this.tempState.initialData.Category} onChange={this.handleChange}>
                                <option>Évenement</option>
                                <option>Activité</option>
                                <option>Communiqué</option>
                                <option>Travaux Routiers</option>
                                <option>Offre Emploi</option>
                                <option>Avis Public</option>
                                <option>Séance du Conseil</option>
                                <option>Procès-Verbaux</option>
                                <option>Autres</option>
                            </select>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <textarea name="Description" type="textarea" placeholder="Description" defaultValue={this.tempState.initialData.Description} onChange={this.handleChange}></textarea>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="imgInput"><i className="far fa-image"></i> {this.tempState.initialData.Image}</label>                        
                            <input id="imgInput" name="Image" type="file" onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="documentInput"><i className="far fa-file"></i> {this.tempState.initialData.File}</label>
                            <input id="documentInput" name="File" type="file" onChange={this.handleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field width={4}>
                        <label>Date D'échéance</label>
                        <input name="Datedue" type="date" onChange={this.handleChange} defaultValue={`${this.tempState.initialData.DateDue.year}-${this.tempState.initialData.DateDue.month}-${this.tempState.initialData.DateDue.day}`}/>
                    </Form.Field>
                    <Form.Field>
                        <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Sauvegarder</button>
                    </Form.Field>
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>
    )}
    }
}

export default CSSModules(NewsEdit, styles, {allowMultiple: true, handleNotFoundStyleName: "log" });