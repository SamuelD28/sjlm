//Initial Declaration and state initialisation
import React from 'react';
import FormComponent from '../FormComponent.js';
import {Modal, Form, Grid} from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import LoaderComponent from '../loaderComponent/loaderComponent.js';

//Css Module import
import CSSModules from 'react-css-modules';
import styles from './pagesCard.module.css';

//Quill Text Editor
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

class PagesCard extends FormComponent{

    constructor(props)
    {
        super(props);
        this.formData = Object.create(this.props.pages);
    }

    render(){
    return(
    <Modal
    size="large"
    trigger={
    <div styleName="pagesCard">
        <h4>{this.props.pages.PageTitle.toUpperCase()}</h4>
    </div>
    }
    closeIcon>
    <Modal.Header>Modifier une page</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={() => {this.UpdateInDb("/api/pages/")}}>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column width={6}>
                                    <Form.Field>
                                        <input name="PageTitle" defaultValue={this.props.pages.PageTitle} onChange={this.HandleChange} type="text"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <select name="Template" defaultValue={this.props.pages.Template} onChange={this.HandleChange}>
                                            <option value="1"> 1 | Défaut</option>
                                            <option disabled value="2"> 2 | Sans Bannière</option>
                                            <option disabled value="3"> 3 | Bannière sur côté</option>
                                        </select>
                                    </Form.Field>
                                    <Form.Group style={{position: "absolute", bottom: "0"}}>
                                        <Form.Field>
                                            <button onClick={() => {this.DeleteInDb("/api/pages/")}} className="btn btn-danger"><i className="icon trash"></i> Supprimer</button>
                                        </Form.Field>
                                        <Form.Field>
                                            <button disabled={this.state.disableSubmit} type="submit" className="btn btn-primary"><i className="icon file alternate"></i> Sauvegarder</button>
                                        </Form.Field>
                                    </Form.Group>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <ReactQuill
                                modules={modules}
                                formats={formats}
                                onChange={(e) => {this.HandleChangeInTextEditor(e, "PageContent")}}
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