//Initial Declaration and state initialisation
import React, {Component} from 'react';
import {Modal, Form, Grid, Dimmer, Message, Icon, Loader} from 'semantic-ui-react';
import ReactQuill from 'react-quill';
import {Forms, Ajax, Utility} from '../../../shared/utility.js';

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
    
    state = ({
        disableLoader: true,
        displayDimmer: false,
        hideStatus: true,
        statusMessage: "",
        statusType: {
            type: "",
            info: false,
            warning: false,
            positive: false,
            negative: false
        },
        disableSubmit: true
    });
    
    constructor(props)
    {
        super(props);
        this.formData = Object.create(this.props.pages);
    }
    
    handleChange = (e) =>
    {
        this.setState({disableSubmit: false});
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e.target.name, this.formData, inputValue);
        console.log(this.formData);
    }
    
    handleSubmit = async () =>
    {
        this.DisplayLoader();
        
        let updatedData = await Ajax.PutData("/api/pages/", this.formData);
        this.props.UpdateTempState(updatedData);
        console.log(updatedData);
        
        setTimeout(() =>{
            this.DisplayStatus("Modifications enregistrées",  "info");
            this.ResetActionUI();
            
        }, 1000);
    }
    
    handleChangeInTextEditor = (e) =>
    {
        console.log("text editor changed");
        this.setState({disableSubmit: false})
        Forms.AppendValueToObject("PageContent", this.formData, e);
    }
    
    //Function     
    DeletePageInDb = (e) =>
    {
        e.preventDefault();
        
        this.DisplayLoader();
        Ajax.DeleteData("/api/pages/", this.formData._id);
        
        setTimeout(() =>{
            this.DisplayStatus("Page supprimé", "negative");
            this.DeletePageInState();
        }, 1000);
    }
    
    //Function that remove the news contained within the parent container only if the news has been removed from the database.
    DeletePageInState = () =>
    {
        setTimeout(() =>{
            this.props.RemoveFromTempState(this.formData);
        }, 1000);
    }
    
    //Function that display a status message concerning the different operation status. This function works in correlation with the Message Component inherited from semantic UI.
    DisplayStatus = (statusMessage, statusType) =>
    {
        try{
            Utility.IsValuesUndefinedOrNull(statusMessage, statusType);
            
            switch(statusType)
            {
                case "warning": this.setState({statusType: {warning: true}});break;
                case "negative": this.setState({statusType: {negative: true}});break;
                case "positive": this.setState({statusType: {positive: true}});break;
                case "info": this.setState({statusType: {info: true}});break;
                default: throw new Error("~You need to provide a status type when using the message component");
            }
            
            this.setState({
                statusMessage: statusMessage,
                disableLoader: true,
                hideStatus: false
            });
        }
        catch(err){
            console.log(err.message);
        }
    }
    
    //Function that display the loader when a new action is commited.
    DisplayLoader = () =>
    {
        this.setState({
            disableLoader: false,
            displayDimmer: true
        });
    }
    
    //Functino that reset the state used for user interaction.
    ResetActionUI = () =>
    {
        setTimeout(() => {
            this.setState({
                disableLoader: true,
                displayDimmer: false,
                hideStatus: true,
                disableSubmit: true
            });
        }, 1000);
    }
    
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
                        <Grid.Row>
                            <Grid.Column width={6}> 
                                    <Form.Field>
                                        <input name="PageTitle" defaultValue={this.props.pages.PageTitle} onChange={this.handleChange} type="text"/>
                                    </Form.Field>
                                    <Form.Field>
                                        <select name="PageCategory" defaultValue={this.props.pages.PageCategory} onChange={this.handleChange}>
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
                                        <select name="Template" defaultValue={this.props.pages.Template} onChange={this.handleChange}>
                                            <option value="1"> 1 | Défaut</option>
                                            <option value="2"> 2 | Sans Bannière</option>
                                            <option value="3"> 3 | Bannière sur côté</option>
                                        </select>
                                    </Form.Field>
                                    <Form.Input>
                                        <label className="btn btn-sm btn-outline-info" htmlFor="bannerInput"><i className="icon image"></i> {this.props.pages.Banner}</label>
                                        <input name="Banner" type="file" id="bannerInput" onChange={this.handleChange}/>
                                    </Form.Input>
                                    <Form.Field>
                                        <button onClick={this.DeletePageInDb} className="btn btn-danger"><i className="icon trash"></i> Supprimer</button>
                                        <button disabled={this.state.disableSubmit} type="submit" style={{float: 'right'}} className="btn btn-primary"><i className="icon file alternate"></i> Publier</button>
                                    </Form.Field>
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
            <Dimmer active={this.state.displayDimmer} inverted>
                    <Loader disabled={this.state.disableLoader} size="large"/>
                    <Message 
                        hidden={this.state.hideStatus} 
                        size="large" 
                        info={this.state.statusType.info}
                        warning={this.state.statusType.warning}
                        negative={this.state.statusType.negative}
                        positive={this.state.statusType.positive}>
                        <Message.Header>
                            <Icon name='check' />
                            {this.state.statusMessage}
                        </Message.Header>
                    </Message>
            </Dimmer>
        </Modal.Content>
    </Modal>    
    )}

}
export default CSSModules(PagesCard, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});