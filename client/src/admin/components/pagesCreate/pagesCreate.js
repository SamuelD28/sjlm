//Initial Declaration and importation
import React, {Component} from 'react';
import {Modal, Form, Label, Input} from 'semantic-ui-react';

//Css Module 
import CSSModules from 'react-css-modules';
import styles from './pagesCreate.module.css';

class PagesCreate extends Component{
    
    render(){
    return(
    <Modal 
    size="large"
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
    <Modal.Header>Ajouter un nouveau membre</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form styleName="pagesForm">
                    <textarea styleName="pagesContentInput" placeholder="editeur de texte"></textarea>
                    <input styleName="pagesTitleInput" type="text" placeholder="Titre de la page" />
                    <select styleName="pagesCategoryInput">
                        <option selected default hidden>Catégorie</option>
                        <option value="city">Découvrir la ville</option>
                        <option value="administration">Administration</option>
                        <option value="services">Les services</option>
                        <option value="cultures">Cultures et loisirs</option>
                        <option value="finances">Finances</option>
                        <option value="news">Actualités</option>
                    </select>
                    <select styleName="pagesTemplateInput">
                        <option selected default hidden>Template</option>
                        <option value="1"> 1 | Défaut</option>
                        <option value="2"> 2 | Sans Bannière</option>
                        <option value="3"> 3 | Bannière sur côté</option>
                    </select>
                    <label styleName="pagesBannerInput" className="btn btn-outline-info" htmlFor="bannerInput"><i className="icon image"></i> Choisir une bannière</label>
                    <input required name="Photo" type="file" id="bannerInput" onChange={this.handleChange}/>
                    <button styleName="pagesSubmit" type="submit" className="btn btn-md btn-primary"><i className="icon save"></i> Ajouter</button>
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>    
    )}
}

export default CSSModules(PagesCreate, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});