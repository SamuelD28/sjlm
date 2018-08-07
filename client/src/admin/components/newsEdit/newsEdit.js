import React, {Component} from 'react';
import {Modal, Form} from 'semantic-ui-react';
import {Forms} from '../../../shared/utility.js';
import moment from 'moment';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './newsEdit.module.css';

class NewsEdit extends Component{
    
    constructor(props)
    { 
        super(props);
        
        this.tempState = Object.create(this.props.news);
        this.handleChange = this.handleChange.bind(this);
        this.UpdateNews = this.UpdateNews.bind(this);
    }
    
    handleChange(event)
    {
        let inputValue = Forms.RetrieveValueFromInput(event);
        let name = event.target.name;
        
        this.tempState[name] = inputValue;
    }
     
    UpdateNews(event)
    {
        const modifiedData = this.tempState;
        const dataID = this.tempState._id;
        
        try{
            //Create the request body to be sent to the api
            let ajaxContent      = { method: "PUT",
                                    headers: {"Content-Type" : "application/json"},
                                    body: JSON.stringify(modifiedData)}
                                    
            //Ajax Request
            fetch("/api/news/" + dataID , ajaxContent)
            .then((res) =>{
                if(!res.ok)
                    throw new Error("An error occured while proccessing the data to the server");
                else{
                    return res.json();
                }
            })
            .then((data) =>{
                this.props.UpdateNews(data);
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
    if(this.tempState !== undefined){
    return(
    <Modal size="large" trigger={
        <div className="cardOverlay cardEdit">
            <div className="cardOverlayBtn">
                <i className="fas fa-edit"></i>
                <h4>Modifier</h4>
            </div>
        </div>} closeIcon>
        <Modal.Header>Modifier une Actualitée</Modal.Header>
        <Modal.Content>
            <Modal.Description className="section-row">
                <div className="ui spaced image img-bg" style={{backgroundImage: `url('/${this.tempState.Image}')`, width: "40%"}}>
                </div>
                <Form onSubmit={this.UpdateNews} style={{width: "60%"}}>
                    <Form.Field>
                        <span className="text-info text-xl" ><i className="clock outline icon"></i> Publication :  {`${moment(this.tempState.DatePublished).format("YYYY MM DD")}`}</span>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui toggle checkbox">
                            <input onChange={this.handleChange} name="Important" type="checkbox" defaultChecked={this.tempState.Important}/>
                            <label>Actualitée Prioritaire</label>
                        </div>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field width={12}>
                           <input name="Title" type="text" placeholder="Titre" onChange={this.handleChange} defaultValue={this.tempState.Title}/>
                        </Form.Field>
                        <Form.Field width={4}>
                            <select className="ui dropdown" name="Category" defaultValue={this.tempState.Category} onChange={this.handleChange}>
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
                        <textarea name="Description" type="textarea" placeholder="Description" defaultValue={this.tempState.Description} onChange={this.handleChange}></textarea>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="imgInput"><i className="far fa-image"></i> {this.tempState.Image}</label>                        
                            <input id="imgInput" name="Image" type="file" onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="documentInput"><i className="far fa-file"></i> {this.tempState.File}</label>
                            <input id="documentInput" name="File" type="file" onChange={this.handleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field width={4}>
                        <label>Date D'échéance</label>
                        <input name="DateDue" type="date" onChange={this.handleChange} defaultValue={moment(this.tempState.DateDue).format("YYYY[-]MM[-]DD")}/>
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