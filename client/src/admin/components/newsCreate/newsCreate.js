/* global fetch*/

import React, {Component} from 'react';
import {Forms, Ajax} from '../../../shared/utility.js';
import {Form, Modal} from 'semantic-ui-react';

// Css module import
import CSSModules from 'react-css-modules';
import styles from './newsCreate.module.css';

class NewsCreate extends Component{
    
    constructor(props){
        super(props);
        
        this.formData = {};
        this.state = {};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
    }
    
    handleSubmit()
    {
        Ajax.PostData.bind(this);
        Ajax.PostData("/api/news" , this.state.formData);
    }

    handleChange(e)
    {
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e, this.formData, inputValue);
        let formData = this.formData;
        this.setState({formData});
    }        
    
    render()
    {
     
    return(
    <Modal trigger={
    <div className="cardContainer">
        <div className="cardOverlay">
            <div className="cardOverlayBtn">
                <i className="fas fa-plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>
    </div>} closeIcon>
    <Modal.Header>Nouvelle Actualitée</Modal.Header>
    <Modal.Content>
        <Modal.Description>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <div className="ui toggle checkbox">
                                <input onChange={this.handleChange} name="Important" type="checkbox" />
                                <label>Actualitée Prioritaire</label>
                            </div>
                        </Form.Field>
                        <Form.Group>
                            <Form.Field width={12}>
                               <input name="Title" type="text" placeholder="Titre" onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field width={4}>
                                <select className="ui dropdown" name="Category" onChange={this.handleChange}>
                                    <option defaultValue>Catégorie</option>
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
                            <textarea name="Description" type="textarea" placeholder=" Description" onChange={this.handleChange}></textarea>
                        </Form.Field>
                        <Form.Group>
                            <Form.Field>
                                <label className="btn btn-sm btn-outline-info" htmlFor="imgInput"><i className="far fa-image"></i> Choisir une Image</label>                        
                                <input id="imgInput" name="Image" type="file" onChange={this.handleChange}/>
                            </Form.Field>
                            <Form.Field>
                                <label className="btn btn-sm btn-outline-info" htmlFor="documentInput"><i className="far fa-file"></i> Choisir un Fichier</label>
                                <input id="documentInput" name="File" type="file" onChange={this.handleChange}/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Field inline>
                            <input className="ui checkbox" onClick={Forms.ToggleInput} linkedto="DateDue" type="checkbox" />
                            <label>Date D'échéance</label>
                            <input name="Datedue" type="date" disabled onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <button type="submit" className="btn btn-primary" modal="createMewsModal"><i className="fas fa-save"></i> Publier</button>
                        </Form.Field>
                    </Form>
                </div>
            </Modal.Description>
        </Modal.Content>
    </Modal>    
    )}
}

export default CSSModules(NewsCreate, styles, {allowMultiple: true, handleNotFoundStyleName: "log" });