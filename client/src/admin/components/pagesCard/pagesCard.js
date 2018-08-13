//Initial Declaration and state initialisation
import React, {Component} from 'react';
import {Modal, Form, Grid} from 'semantic-ui-react';
import ReactQuill from 'react-quill';

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


class PagesCard extends Component{
    
    render(){
    return(
    <Modal 
    onMount={this.InitialiseTextEditor}
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
                <Form onSubmit={this.handleSubmit}>
                    <Grid columns={2} divided>
                        <Grid.Row stretched>
                            <Grid.Column width={6}>
                                <div styleName="pagesInputs">
                                    <input name="PageTitle" styleName="pagesTitleInput" defaultValue={this.props.pages.PageTitle} type="text"/>
                                    <select name="PageCategory" styleName="pagesCategoryInput" onChange={this.handleChange}>
                                        <option defaultValue>{this.props.pages.PageCategory}</option>
                                        <option value="city">Découvrir la ville</option>
                                        <option value="administration">Administration</option>
                                        <option value="services">Les services</option>
                                        <option value="cultures">Cultures et loisirs</option>
                                        <option value="finances">Finances</option>
                                        <option value="news">Actualités</option>
                                        <option value="others">Autres</option>
                                    </select>
                                    <select name="Template" styleName="pagesTemplateInput" defaultValue>{this.props.pages.Template} onChange={this.handleChange}>
                                        <option value="1"> 1 | Défaut</option>
                                        <option value="2"> 2 | Sans Bannière</option>
                                        <option value="3"> 3 | Bannière sur côté</option>
                                    </select>
                                    <div styleName="pagesBannerInput">
                                        <label className="btn btn-sm btn-outline-info" htmlFor="bannerInput"><i className="icon image"></i> {this.props.pages.Banner}</label>
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
                                defaultValue={this.props.pages.PageContent}
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
export default CSSModules(PagesCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});