import React, {Component} from 'react';
import {Modal, Form, Dimmer, Icon, Message, Loader} from 'semantic-ui-react';
import {Forms , Ajax, Utility} from '../../../shared/utility.js';
import moment from 'moment';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './newsEdit.module.css';

class NewsEdit extends Component{
    
    //Initial State declaration
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
        
        this.formData =Object.create(this.props.news);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.DeleteNewsInDb = this.DeleteNewsInDb.bind(this);
        
        this.DeleteNewsInState = this.DeleteNewsInState.bind(this);
        this.ResetActionUI = this.ResetActionUI.bind(this);
        this.DisplayLoader = this.DisplayLoader.bind(this);
        this.DisplayStatus = this.DisplayStatus.bind(this);
    }
    
    handleChange(e)
    {
        this.setState({disableSubmit: false});
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e, this.formData, inputValue);
    }  
     
    async handleSubmit()
    {
        this.DisplayLoader();
        
        let updatedData = await Ajax.PutData("/api/news/", this.formData);
        this.props.UpdateTempState(updatedData);
        
        setTimeout(() =>{
            this.DisplayStatus("Modifications enregistrées",  "info");
            this.ResetActionUI();
            
        }, 1000);
    }
    
    DeleteNewsInDb(e)
    {
        e.preventDefault();
        
        this.DisplayLoader();
        Ajax.DeleteData("/api/news/", this.formData._id);
        
        setTimeout(() =>{
            this.DisplayStatus("Actualité supprimée", "negative");
            this.DeleteNewsInState();
        }, 1000);
    }
    
    DeleteNewsInState()
    {
        setTimeout(() =>{
            this.props.RemoveFromTempState(this.formData);
        }, 1000);
    }
    
    DisplayStatus(statusMessage, statusType)
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
    
    DisplayLoader()
    {
        this.setState({
            disableLoader: false,
            displayDimmer: true
        });
    }
    
    ResetActionUI()
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
    if(this.formData !== undefined){
    return(
    <Modal size="large" trigger={
        <div className="cardOverlay cardEdit">
            <div className="cardOverlayBtn">
                <i className="fas fa-edit"></i>
                <h4>Modifier</h4>
            </div>
        </div>} closeIcon>
        <Modal.Header>Modifier une Actualitée</Modal.Header>
        <Modal.Content>
            <Modal.Description className="section-row">
                <div className="ui spaced image img-bg" style={{backgroundImage: `url('/${this.formData.Image}')`, width: "40%"}}>
                </div>
                <Form onSubmit={this.handleSubmit} style={{width: "60%"}}>
                    <Form.Field>
                        <span className="text-info text-xl" ><i className="clock outline icon"></i> Publication :  {`${moment(this.formData.DatePublished).format("YYYY MM DD")}`}</span>
                    </Form.Field>
                    <Form.Field>
                        <div className="ui toggle checkbox">
                            <input onChange={this.handleChange} name="Important" type="checkbox" defaultChecked={this.formData.Important}/>
                            <label>Actualitée Prioritaire</label>
                        </div>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field width={12}>
                           <input name="Title" type="text" placeholder="Titre" onChange={this.handleChange} defaultValue={this.formData.Title}/>
                        </Form.Field>
                        <Form.Field width={4}>
                            <select className="ui dropdown" name="Category" defaultValue={this.formData.Category} onChange={this.handleChange}>
                                <option>Évenement</option>
                                <option>Activité</option>
                                <option>Communiqué</option>
                                <option>Travaux Routiers</option>
                                <option>Offre Emploi</option>
                                <option>Avis Public</option>
                                <option>Séance du Conseil</option>
                                <option>Procès-Verbaux</option>
                                <option>Autres</option>
                            </select>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <textarea name="Description" type="textarea" placeholder="Description" defaultValue={this.formData.Description} onChange={this.handleChange}></textarea>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="imgInput"><i className="far fa-image"></i> {this.formData.Image}</label>                        
                            <input id="imgInput" name="Image" type="file" onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="documentInput"><i className="far fa-file"></i> {this.formData.File}</label>
                            <input id="documentInput" name="File" type="file" onChange={this.handleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field width={4}>
                        <label>Date D'échéance</label>
                        <input name="DateDue" type="date" onChange={this.handleChange} defaultValue={moment(this.formData.DateDue).format("YYYY[-]MM[-]DD")}/>
                    </Form.Field>
                    <Form.Field>
                        <button disabled={this.state.disableSubmit} type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Sauvegarder</button>
                        <button style={{float: 'right'}} onClick={this.DeleteNewsInDb} className="btn btn-danger"><i className="fas fa-trash"></i> Supprimer</button>
                    </Form.Field>
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
}

export default CSSModules(NewsEdit, styles, {allowMultiple: true, handleNotFoundStyleName: "log" });