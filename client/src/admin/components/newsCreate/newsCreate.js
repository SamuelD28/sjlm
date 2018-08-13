/* global fetch*/

import React, {Component} from 'react';
import {Forms, Ajax} from '../../../shared/utility.js';
import {Form, Modal} from 'semantic-ui-react';
import LoaderComponent from '../LoaderComponent.js';

// Css module import
import CSSModules from 'react-css-modules';
import styles from './newsCreate.module.css';

//This components hold the form to and fonctionality to create a new post in the database.
class NewsCreate extends Component{
    
    //We initialise an empty form data in witch we will append every input that we entered informations
    constructor(props)
    {
        super(props);
        this.formData = {};
        this.state= ({disableSubmit : true});
    }
    
    //Function that handles the sbmit of the form
    CreateNewsInDb = async () =>
    {
        //Change the laoder component status
        this.ChangeActionState(1000, true, "Post");
        
        //Does a post request to the server
        let postedData = await Ajax.PostData("/api/news", this.formData);
    
        //Add the newly created news in the temporary state
        this.props.CreateInTempState(postedData);
    }
    
    //Function that handles every change we make to the inputs contain in the form.
    HandleChange = (e) =>
    {
        this.setState({disableSubmit: false});
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e.target.name, this.formData, inputValue);
    }      
    
    //Function that modify the action state that interacts with the action loader component
    ChangeActionState = (latency, isOnGoing, type) => 
    {
        this.setState({
            action: {
                latency: latency,
                isOnGoing: isOnGoing,
                type: type
            }
        });
    }
    
    render()
    {
    return(
    <Modal 
    trigger={
    <div className="cardContainer">
        <div className="cardOverlay">
            <div className="cardOverlayBtn">
                <i className="icon plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>
    </div>
    } 
    closeIcon>
    <Modal.Header>Nouvelle Actualitée</Modal.Header>
    <Modal.Content>
        <Modal.Description>
                <Form onSubmit={this.CreateNewsInDb}>
                    <Form.Field>
                        <div className="ui toggle checkbox">
                            <input onChange={this.HandleChange} name="Important" type="checkbox" />
                            <label>Actualitée Prioritaire</label>
                        </div>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field width={12}>
                           <input name="Title" type="text" placeholder="Titre" onChange={this.HandleChange} required/>
                        </Form.Field>
                        <Form.Field width={4}>
                            <select className="ui dropdown" name="Category" onChange={this.HandleChange} required>
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
                        <textarea name="Description" type="textarea" placeholder=" Description" onChange={this.HandleChange} required></textarea>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="imgInput"><i className="far fa-image"></i> Choisir une Image</label>                        
                            <input id="imgInput" name="Image" type="file" onChange={this.HandleChange} required/>
                        </Form.Field>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="documentInput"><i className="far fa-file"></i> Choisir un Fichier</label>
                            <input id="documentInput" name="File" type="file" onChange={this.HandleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field inline>
                        <input className="ui checkbox" onClick={Forms.ToggleInput} linkedto="DateDue" type="checkbox" />
                        <label>Date D'échéance</label>
                        <input name="DateDue" type="date" disabled onChange={this.HandleChange} required/>
                    </Form.Field>
                    <Form.Field>
                        <button disabled={this.state.disableSubmit} type="submit" className="btn btn-primary"><i className="icon save"></i> Publier</button>
                    </Form.Field>
                </Form>
            </Modal.Description>
            <LoaderComponent action={this.state.action}/>
        </Modal.Content>
    </Modal>    
    )}
}

export default CSSModules(NewsCreate, styles, {allowMultiple: true, handleNotFoundStyleName: "log" });