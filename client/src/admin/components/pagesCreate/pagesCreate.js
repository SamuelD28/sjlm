//Initial Declaration and importation
import React from 'react';
import FormComponent from '../FormComponent.js';
import {Modal, Form, Grid} from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import {Forms} from '../../../shared/utility.js';
import LoaderComponent from '../loaderComponent/loaderComponent.js';
import CloudinaryUpload from '../cloudinaryUpload/cloudinaryUpload.js';

//Quill Text Editor declaration
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

//Component responsible for creating new page
class PagesCreate extends FormComponent{
    
    //Function that handle the changes made in the text editor
    HandleChangeInTextEditor = (e) =>
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
                <Form onSubmit={() => {this.CreateInDb("/api/pages")}}>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                <Form.Field>
                                    <input name="PageTitle" type="text" placeholder="Titre de la page" onChange={this.HandleChange}/>
                                </Form.Field>
                                <Form.Field>
                                    <select name="PageCategory" defaultValue="default" onChange={this.HandleChange}>
                                        <option value="default">Catégorie</option>
                                        <option value="city">Découvrir la ville</option>
                                        <option value="administration">Administration</option>
                                        <option value="services">Les services</option>
                                        <option value="cultures">Cultures et loisirs</option>
                                        <option value="finances">Finances</option>
                                        <option value="news">Actualités</option>
                                        <option value="others">Autres</option>
                                    </select>
                                </Form.Field>
                                <Form.Field>
                                    <select name="Template" defaultValue="default" onChange={this.HandleChange}>
                                        <option value="default">Template</option>
                                        <option value="1"> 1 | Défaut</option>
                                        <option value="2"> 2 | Sans Bannière</option>
                                        <option value="3"> 3 | Bannière sur côté</option>
                                    </select>
                                </Form.Field>
                                <CloudinaryUpload 
                                multiple={false} 
                                cropping={true} 
                                formData={this.formData}
                                buttonText="Choisir une bannière"
                                linkedInput="Banner"
                                enableSubmit={this.EnableSubmit}/>
                                <CloudinaryUpload 
                                multiple={true} 
                                cropping={false} 
                                formData={this.formData}
                                buttonText="Choisir une gallerie"
                                linkedInput="PageGallery"
                                enableSubmit={this.EnableSubmit}/>
                                <Form.Field>
                                    <button disabled={this.state.disableSubmit} type="submit" className="btn btn-primary"><i className="icon file alternate"></i> Publier</button>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <ReactQuill 
                                name="PageContent"
                                modules={modules}
                                formats={formats}
                                onChange={this.HandleChangeInTextEditor}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </Modal.Description>
            <LoaderComponent action={this.state.action} />
        </Modal.Content>
    </Modal>    
    )}
}

export default PagesCreate;