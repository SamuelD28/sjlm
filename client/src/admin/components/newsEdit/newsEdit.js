import React, {Component} from 'react';
import {Modal, Form} from 'semantic-ui-react';
import {Forms , Ajax} from '../../../shared/utility.js';
import moment from 'moment';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './newsEdit.module.css';

class NewsEdit extends Component{
    
    constructor(props)
    { 
        super(props);
        
        this.formData =Object.create(this.props.news);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.UpdateNews = Ajax.PutData.bind(this);
    }
    
    handleChange(e)
    {
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e, this.formData, inputValue);
    }  
     
    handleSubmit()
    {
        this.UpdateNews("/api/news/", this.formData);
    }
     
    render(){
    if(this.formData !== undefined){
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
                <div className="ui spaced image img-bg" style={{backgroundImage: `url('/${this.formData.Image}')`, width: "40%"}}>
                </div>
                <Form onSubmit={this.handleSubmit} style={{width: "60%"}}>
                    <Form.Field>
                        <span className="text-info text-xl" ><i className="clock outline icon"></i> Publication :  {`${moment(this.formData.DatePublished).format("YYYY MM DD")}`}</span>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui toggle checkbox">
                            <input onChange={this.handleChange} name="Important" type="checkbox" defaultChecked={this.formData.Important}/>
                            <label>Actualitée Prioritaire</label>
                        </div>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field width={12}>
                           <input name="Title" type="text" placeholder="Titre" onChange={this.handleChange} defaultValue={this.formData.Title}/>
                        </Form.Field>
                        <Form.Field width={4}>
                            <select className="ui dropdown" name="Category" defaultValue={this.formData.Category} onChange={this.handleChange}>
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
                        <textarea name="Description" type="textarea" placeholder="Description" defaultValue={this.formData.Description} onChange={this.handleChange}></textarea>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="imgInput"><i className="far fa-image"></i> {this.formData.Image}</label>                        
                            <input id="imgInput" name="Image" type="file" onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="documentInput"><i className="far fa-file"></i> {this.formData.File}</label>
                            <input id="documentInput" name="File" type="file" onChange={this.handleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field width={4}>
                        <label>Date D'échéance</label>
                        <input name="DateDue" type="date" onChange={this.handleChange} defaultValue={moment(this.formData.DateDue).format("YYYY[-]MM[-]DD")}/>
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