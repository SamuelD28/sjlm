import React from 'react';
import FormComponent from '../FormComponent.js';
import {Modal, Form} from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import LoaderComponent from '../loaderComponent/loaderComponent.js';
import moment from 'moment';
import CloudinaryUpload from '../cloudinaryUpload/cloudinaryUpload.js';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './newsEdit.module.css';

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

//This component is responsible for both the modification and suppression of news post in the database. The data are passed by the parent container news.
class NewsEdit extends FormComponent{
    
    //We initialise the form data with a new object reference that way we dont trigger the update function on the state in the parent container.
    constructor(props)
    { 
        super(props);
        this.formData =Object.create(this.props.news);
        this.TextEditor = React.createRef();
    }
    
    render(){
    if(this.formData !== undefined){
    return(
    <Modal size="large" trigger={
        <div className="cardOverlay cardEdit">
            <div className="cardOverlayBtn">
                <i className="icon edit"></i>
                <h4>Modifier</h4>
            </div>
        </div>} closeIcon>
        <Modal.Header>Modifier une Actualitée</Modal.Header>
        <Modal.Content>
            <Modal.Description className="section-form">
                <div className="ui spaced image img-bg" style={{backgroundImage: `url('${this.formData.Images[0]}')`, width: "40%"}}>
                </div>
                <Form onSubmit={() => {this.UpdateInDb("/api/news/")}} style={{width: "60%"}}>
                    <Form.Field>
                        <span className="text-info text-xl" ><i className="clock outline icon"></i> Publication :  {`${moment(this.formData.DatePublished).format("YYYY MM DD")}`}</span>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui toggle checkbox">
                            <input onChange={this.HandleChange} name="Important" type="checkbox" defaultChecked={this.formData.Important}/>
                            <label>Actualitée Prioritaire</label>
                        </div>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field width={12}>
                           <input name="Title" type="text" placeholder="Titre" onChange={this.HandleChange} defaultValue={this.formData.Title}/>
                        </Form.Field>
                        <Form.Field width={4}>
                            <select className="ui dropdown" name="Category" defaultValue={this.formData.Category} onChange={this.HandleChange}>
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
                        defaultValue={this.formData.DescriptionHtml}
                        ref={this.TextEditor}
                        />
                    </Form.Field>
                   <CloudinaryUpload 
                    multiple={true} 
                    cropping={false}
                    formData={this.formData}
                    buttonText="Ajouter une image"
                    linkedInput="Images"
                    enableSubmit={this.EnableSubmit}/>
                    <Form.Input>
                        <label className="btn btn-sm btn-outline-info" htmlFor="documentInput"><i className="icon file"></i> {this.formData.File}</label>
                        <input id="documentInput" name="File" type="file" onChange={this.HandleChange}/>
                    </Form.Input>
                    <Form.Field>
                        <button onClick={() => {this.DeleteInDb("/api/news/")}} className="btn btn-md btn-danger"><i className="icon trash"></i> Supprimer</button>
                        <button disabled={this.state.disableSubmit} style={{float: 'right'}} type="submit" className="btn btn-md btn-primary"><i className="icon save"></i> Sauvegarder</button>
                    </Form.Field>
                </Form>
            </Modal.Description>
            <LoaderComponent action={this.state.action} />
        </Modal.Content>
    </Modal>
    )}
    }
}

export default CSSModules(NewsEdit, styles, {allowMultiple: true, handleNotFoundStyleName: "log" });