/* global fetch*/

import React, {Component} from 'react';
import {Forms, Ajax} from '../../../shared/utility.js';
import {Form, Modal, Loader, Dimmer, Icon, Message} from 'semantic-ui-react';

// Css module import
import CSSModules from 'react-css-modules';
import styles from './newsCreate.module.css';

class NewsCreate extends Component{
    
    //Initial State declaration
    state = ({
        disableLoader: true,
        displayDimmer: false,
        hideStatus: true
    });
    
    constructor(props)
    {
        super(props);
        this.formData = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
        this.ResetForm = this.ResetForm.bind(this);
    }
    
    async handleSubmit()
    {
        await this.setState({
            displayDimmer : true,
            disableLoader: false
        });
        
        let postedData = await Ajax.PostData("/api/news", this.formData);
        this.props.AppendToTempState(postedData);
        
        setTimeout(() =>{
            this.setState({
                disableLoader: true,
                hideStatus: false
            });
            
        }, 1000);
    }
    
    handleChange(e)
    {
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e, this.formData, inputValue);
    }        
    
    ResetForm()
    {
        setTimeout(() => {
            this.setState({
                disableLoader: true,
                displayDimmer: false,
                hideStatus: true
            });
        }, 1000);
    }
    
    render()
    {
    return(
    <Modal onClose={this.ResetForm.bind(this)} trigger={
    <div className="cardContainer newsCreate">
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
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <div className="ui toggle checkbox">
                            <input onChange={this.handleChange} name="Important" type="checkbox" />
                            <label>Actualitée Prioritaire</label>
                        </div>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field width={12}>
                           <input name="Title" type="text" placeholder="Titre" onChange={this.handleChange} required/>
                        </Form.Field>
                        <Form.Field width={4}>
                            <select className="ui dropdown" name="Category" onChange={this.handleChange} required>
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
                        <textarea name="Description" type="textarea" placeholder=" Description" onChange={this.handleChange} required></textarea>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="imgInput"><i className="far fa-image"></i> Choisir une Image</label>                        
                            <input id="imgInput" name="Image" type="file" onChange={this.handleChange} required/>
                        </Form.Field>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="documentInput"><i className="far fa-file"></i> Choisir un Fichier</label>
                            <input id="documentInput" name="File" type="file" onChange={this.handleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field inline>
                        <input className="ui checkbox" onClick={Forms.ToggleInput} linkedto="DateDue" type="checkbox" />
                        <label>Date D'échéance</label>
                        <input name="DateDue" type="date" disabled onChange={this.handleChange} required/>
                    </Form.Field>
                    <Form.Field>
                        <button type="submit" className="btn btn-primary" modal="createMewsModal"><i className="fas fa-save"></i> Publier</button>
                    </Form.Field>
                </Form>
            </Modal.Description>
            <Dimmer active={this.state.displayDimmer} inverted>
                    <Loader size="large" disabled={this.state.disableLoader}/>
                    <Message size="large" hidden={this.state.hideStatus} positive>
                        <Message.Header>
                            <Icon name='check' /> Mise en ligne
                        </Message.Header>
                    </Message>
            </Dimmer>
        </Modal.Content>
    </Modal>    
    )}
}

export default CSSModules(NewsCreate, styles, {allowMultiple: true, handleNotFoundStyleName: "log" });