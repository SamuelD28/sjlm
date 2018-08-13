import React from 'react';
import FormComponent from '../FormComponent.js';
import {Forms} from '../../../shared/utility.js';
import {Form, Modal} from 'semantic-ui-react';
import LoaderComponent from '../loaderComponent/loaderComponent.js';

// Css module import
import CSSModules from 'react-css-modules';
import styles from './newsCreate.module.css';

//This components hold the form to and fonctionality to create a new post in the database.
class NewsCreate extends FormComponent{
    
    //Function that handles the sbmit of the form
    HandleSubmit = () =>
    {
        this.CreateInDb("/api/news");
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
                <Form onSubmit={this.HandleSubmit}>
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