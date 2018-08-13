//Initial Declaration and state initialisation
import React from 'react';
import FormComponent from '../FormComponent.js';
import {Modal, Form, Grid} from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import {Forms, Ajax} from '../../../shared/utility.js';
import LoaderComponent from '../LoaderComponent.js';

//Css Module import
import CSSModules from 'react-css-modules';
import styles from './pagesCard.module.css';

//Quill Editor
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

class PagesCard extends FormComponent{
    
    constructor(props)
    {
        super(props);
        this.formData = Object.create(this.props.pages);
    }
    
    //Function that update a resquested page in the db and then updates it in the temporary state
    HandleSubmit = () =>
    {
        this.UpdateInDb("/api/pages/");
    }
    
    //Function that delete the requested page in the db and then removes it from the temporary state
    HandleDelete = (e) =>
    {
        e.preventDefault();
        this.DeleteInDb("/api/pages/");
    }
    
    //Function that handles the change in the text. NEEDS TO BE IMPLEMENTED IN THE FORM COMPONENT.
    HandleChangeInTextEditor = (e) =>
    {
        this.setState({disableSubmit: false})
        Forms.AppendValueToObject("PageContent", this.formData, e);
    }
    
    render(){
    return(
    <Modal 
    size="fullscreen"
    trigger={
    <div styleName="pagesCard">
        <h4>{this.props.pages.PageTitle.toUpperCase()}</h4>
    </div>
    } 
    closeIcon>
    <Modal.Header>Ajouter une nouvelle page</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={this.HandleSubmit}>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column width={6}> 
                                    <Form.Field>
                                        <input name="PageTitle" defaultValue={this.props.pages.PageTitle} onChange={this.HandleChange} type="text"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <select name="PageCategory" defaultValue={this.props.pages.PageCategory} onChange={this.HandleChange}>
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
                                        <select name="Template" defaultValue={this.props.pages.Template} onChange={this.HandleChange}>
                                            <option value="1"> 1 | Défaut</option>
                                            <option value="2"> 2 | Sans Bannière</option>
                                            <option value="3"> 3 | Bannière sur côté</option>
                                        </select>
                                    </Form.Field>
                                    <Form.Input>
                                        <label className="btn btn-sm btn-outline-info" htmlFor="bannerInput"><i className="icon image"></i> {this.props.pages.Banner}</label>
                                        <input name="Banner" type="file" id="bannerInput" onChange={this.HandleChange}/>
                                    </Form.Input>
                                    <Form.Field>
                                        <button onClick={this.HandleDelete} className="btn btn-danger"><i className="icon trash"></i> Supprimer</button>
                                        <button disabled={this.state.disableSubmit} type="submit" style={{float: 'right'}} className="btn btn-primary"><i className="icon file alternate"></i> Publier</button>
                                    </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <ReactQuill 
                                name="PageContent"
                                modules={modules}
                                formats={formats}
                                onChange={this.HandleChangeInTextEditor}
                                defaultValue={this.props.pages.PageContent}
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
export default CSSModules(PagesCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});