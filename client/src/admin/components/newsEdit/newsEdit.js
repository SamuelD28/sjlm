import React, {Component} from 'react';
import {Modal, Form} from 'semantic-ui-react';
import {Forms , Ajax} from '../../../shared/utility.js';
import LoaderComponent from '../LoaderComponent.js';
import moment from 'moment';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './newsEdit.module.css';

//This component is responsible for both the modification and suppression of news post in the database. The data are passed by the parent container news.
class NewsEdit extends Component{
    
    //We initialise the form data with a new object reference that way we dont trigger the update function on the state in the parent container.
    constructor(props)
    { 
        //NEED TO ADD A TEMPSTATE OBJECT THAT HOLDS ALL THE ORIGINAL DATA. THAT WAY IF WE DONT SAVE AND QUIT THE DATA ARE RESET.
        super(props);
        
        this.state = ({disableSubmit: true});
        this.formData =Object.create(this.props.news);
    }
    
    //Function that handles all the change we make in the unputs contained within the form.
    HandleChange = (e) =>
    {
        this.setState({disableSubmit: false});
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e.target.name, this.formData, inputValue);
    }  
     
    //Function that handles the submit of the form.
    UpdateNewsInDb = async (e) =>
    {
        //Tells the action loader to change its status
        this.ChangeActionState(1000, true, "Put");
        
        //Does a update request to the server
        let updatedData = await Ajax.PutData("/api/news/", this.formData);
        
        //Update the news in the tempstate
        this.props.UpdateTempState(updatedData);
    }
    
    //Function that request the suppression of the news in the database.
    DeleteNewsInDb = (e) =>
    {
        e.preventDefault();
        
        //Tells the loader to change its status accordingly
        this.ChangeActionState(1000, true, "Delete");
        
        //Delete request sent to the server
        Ajax.DeleteData("/api/news/", this.formData._id);
        
        //Wait an x amount before removing the news from the state. Otherwise the form close immediately after deleting from tempstate
        setTimeout(() =>{
            this.props.RemoveFromTempState(this.formData);
        }, 2000);
    }
    
    //Function that manage the action state that interacts with the action loader component. Used for user interaction
    ChangeActionState = (latency, isOnGoing, type) => 
    {
        this.setState({
            action: {
                latency: latency,
                isOnGoing: isOnGoing,
                type: type
            }
        });
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
                <div className="ui spaced image img-bg" style={{backgroundImage: `url('/${this.formData.Image}')`, width: "40%"}}>
                </div>
                <Form onSubmit={this.UpdateNewsInDb} style={{width: "60%"}}>
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
                        <textarea name="Description" type="textarea" placeholder="Description" defaultValue={this.formData.Description} onChange={this.HandleChange}></textarea>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="imgInput"><i className="far fa-image"></i> {this.formData.Image}</label>                        
                            <input id="imgInput" name="Image" type="file" onChange={this.HandleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label className="btn btn-sm btn-outline-info" htmlFor="documentInput"><i className="far fa-file"></i> {this.formData.File}</label>
                            <input id="documentInput" name="File" type="file" onChange={this.HandleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field width={4}>
                        <label>Date D'échéance</label>
                        <input name="DateDue" type="date" onChange={this.HandleChange} defaultValue={moment(this.formData.DateDue).format("YYYY[-]MM[-]DD")}/>
                    </Form.Field>
                    <Form.Field>
                        <button onClick={this.DeleteNewsInDb} className="btn btn-md btn-danger"><i className="icon trash"></i> Supprimer</button>
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