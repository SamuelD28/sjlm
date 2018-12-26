import React from 'react';
import FormComponent from '../FormComponent.js';
import {Modal, Form, Grid, Select, Radio, Divider} from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import LoaderComponent from '../loaderComponent/loaderComponent.js';
import moment from 'moment';
import Translate from '../../../shared/translate.js';

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

//News Category
let NewsCategory = [
"events",
"activity",
"communicate",
"roadwork",
"jobs",
"public",
"council",
"verbal",
"other"
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

    GenerateCategoryOptions = () =>
    {
        let CategoryOptions = [];
        NewsCategory.map((category, index)=>{
            let CategoryObject = {text: Translate.NewsCategory(category), value: category};
            return CategoryOptions.push(CategoryObject);
        });
        return CategoryOptions;
    }

    render(){
    if(this.formData !== undefined){
    return(
    <Modal size="large" trigger={
        <div className="cardOverlay cardEdit">
            <div className="cardOverlayBtn">
                <h4>Modifier</h4>
            </div>
        </div>} closeIcon>
        <Modal.Header>
            <span style={{fontSize: '.8em'}}>
                <i className="clock outline icon"></i> Publié le {moment(this.formData.DatePublished).format("dddd, Do MMMM, YYYY")}
            </span>
        </Modal.Header>
        <Modal.Content>
            <Modal.Description >
                <Form onSubmit={() => {this.UpdateInDb("/api/news/")}}>
                    <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column width={8}>
                                    <Divider horizontal>Informations</Divider>
                                    <Form.Field>
                                       <input name="Title" type="text" placeholder="Titre" onChange={this.HandleChange} defaultValue={this.formData.Title}/>
                                    </Form.Field>
                                    <Form.Field width={10}>
                                        <Select
                                            selection
                                            clearable
                                            name="Category"
                                            onChange={this.HandleChange}
                                            defaultValue={this.formData.Category}
                                            options={this.GenerateCategoryOptions()} />
                                    </Form.Field>
                                    <Form.Field width={6} >
                                        <Radio
                                            label="Actualitée Prioritaire"
                                            toggle
                                            name="Important"
                                            onChange={this.HandleChange}
                                            defaultChecked={this.formData.Important}
                                            />
                                    </Form.Field>
                                    <Divider horizontal>Images</Divider>
                                    <Form.Group style={{position: "absolute", bottom: "0"}}>
                                        <Form.Field>
                                            <button onClick={() => {this.DeleteInDb("/api/news/")}}  className="btn btn-danger"><i className="icon trash"></i> Supprimer</button>
                                        </Form.Field>
                                        <Form.Field>
                                            <button disabled={this.state.disableSubmit} type="submit" className="btn btn-primary"><i className="icon save"></i> Sauvegarder</button>
                                        </Form.Field>
                                    </Form.Group>
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                    <ReactQuill
                                    modules={modules}
                                    formats={formats}
                                    onChange={(e) => {this.ExtractValueFromTextEditor(e, this.TextEditor, "Description", "DescriptionHtml")}}
                                    defaultValue={this.formData.DescriptionHtml}
                                    ref={this.TextEditor}
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
}

// <Form.Input>
//     <label className="btn btn-sm btn-outline-info" htmlFor="documentInput"><i className="icon file"></i> {this.formData.File}</label>
//     <input id="documentInput" name="File" type="file" onChange={this.HandleChange}/>
// </Form.Input>

export default CSSModules(NewsEdit, styles, {allowMultiple: true, handleNotFoundStyleName: "log" });