//Initial Declaration and importation
import React, {Component} from 'react';
import {Modal, Form, Grid } from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import {Forms, Ajax} from '../../../shared/utility.js';

//Css Module 
import CSSModules from 'react-css-modules';
import styles from './pagesCreate.module.css';

//Quill Text Editor
const modules = {
    toolbar:[
      [{ 'header': [1, 2, 3, 4, 5 ,6] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'link'],
      [{'list': 'ordered'}, {'list': 'bullet'},{'indent': '-1'}, {'indent': '+1'},{ 'align': [] }],
      ['clean']
    ]};
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'indent','link',
    'align'
];

class PagesCreate extends Component{
    
    constructor(props)
    {
        super(props);
        this.formData = {};
    }
    
    handleSubmit = async () =>
    {
        let postedData = await Ajax.PostData("/api/pages", this.formData);
        this.props.CreateInTempState(postedData);
    }
    
    handleChange = (e) =>
    {
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e.target.name, this.formData, inputValue);
    }
    
    handleChangeInTextEditor = (e) =>
    {
        Forms.AppendValueToObject("PageContent", this.formData, e);
    }
    
    render(){
    
    return(
    <Modal 
    onMount={this.InitialiseTextEditor}
    size="fullscreen"
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
    <Modal.Header>Ajouter une nouvelle page</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={this.handleSubmit}>
                    <Grid columns={2} divided>
                        <Grid.Row stretched>
                            <Grid.Column width={6}>
                                <div styleName="pagesInputs">
                                    <input name="PageTitle" styleName="pagesTitleInput" type="text" placeholder="Titre de la page" onChange={this.handleChange}/>
                                    <select name="PageCategory" styleName="pagesCategoryInput" onChange={this.handleChange}>
                                        <option selected default hidden>Catégorie</option>
                                        <option value="city">Découvrir la ville</option>
                                        <option value="administration">Administration</option>
                                        <option value="services">Les services</option>
                                        <option value="cultures">Cultures et loisirs</option>
                                        <option value="finances">Finances</option>
                                        <option value="news">Actualités</option>
                                        <option value="others">Autres</option>
                                    </select>
                                    <select name="Template" styleName="pagesTemplateInput" onChange={this.handleChange}>
                                        <option selected default hidden>Template</option>
                                        <option value="1"> 1 | Défaut</option>
                                        <option value="2"> 2 | Sans Bannière</option>
                                        <option value="3"> 3 | Bannière sur côté</option>
                                    </select>
                                    <div styleName="pagesBannerInput">
                                        <label className="btn btn-sm btn-outline-info" htmlFor="bannerInput"><i className="icon image"></i> Choisir une bannière</label>
                                        <input required name="Banner" type="file" id="bannerInput" onChange={this.handleChange}/>
                                    </div>
                                    <button styleName="pagesSubmit" type="submit" className="btn btn-primary"><i className="icon file alternate"></i> Publier</button>
                                </div>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <ReactQuill 
                                name="PageContent"
                                modules={modules}
                                formats={formats}
                                onChange={this.handleChangeInTextEditor}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>    
    )}
}

export default CSSModules(PagesCreate, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});