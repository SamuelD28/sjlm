import React from 'react';
import FormComponent from '../FormComponent.js';
import {Form, Modal} from 'semantic-ui-react';
import LoaderComponent from '../loaderComponent/loaderComponent.js';
import CloudinaryUpload from '../cloudinaryUpload/cloudinaryUpload.js';
import ReactQuill from 'react-quill';

// Css module import
import CSSModules from 'react-css-modules';
import styles from './newsCreate.module.css';

//Declaration for quill
const modules = {
    toolbar:[
      [{ 'header': [1, 2, 3, 4, 5 ,6] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'link'],
      [{'list': 'ordered'}, {'list': 'bullet'},{ 'align': [] }],
      ['image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
};
const formats = [
    'header',
    'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link',
    'image',
    'align'
];

//This components hold the form to and fonctionality to create a new post in the database.
class NewsCreate extends FormComponent{
    
    constructor(props)
    {
        super(props);
        this.TextEditor = React.createRef();
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
                <Form onSubmit={() => {this.CreateInDb("/api/news")}}>
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
                                <option value="events">Évenement</option>
                                <option value="activity">Activité</option>
                                <option value="communicate">Communiqué</option>
                                <option value="roadwork">Travaux Routiers</option>
                                <option value="jobs">Offre Emploi</option>
                                <option value="public">Avis Public</option>
                                <option value="council">Séance du Conseil</option>
                                <option value="verbal">Procès-Verbaux</option>
                                <option value="other">Autres</option>
                            </select>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                    <ReactQuill 
                    modules={modules}
                    formats={formats}
                    onChange={(e) => {this.ExtractValueFromTextEditor(e, this.TextEditor, "Description", "DescriptionHtml")}}
                    ref={this.TextEditor}
                    />
                    </Form.Field>
                    <CloudinaryUpload 
                    multiple={true} 
                    cropping={false} 
                    formData={this.formData}
                    buttonText="Choisir une gallerie"
                    enableSubmit={this.EnableSubmit}
                    linkedInput="Images"/>
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