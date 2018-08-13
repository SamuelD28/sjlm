//Initial Declaration and importation
import React, {Component} from 'react';
import {Modal, Form, Input, Label, Dimmer, Message, Loader, Icon} from 'semantic-ui-react';
import {Forms, Ajax, Utility} from '../../../shared/utility.js';

class MembersEdit extends Component{
    
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
        
        this.formData = Object.create(this.props.members);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.DeleteMembersInDb = this.DeleteMembersInDb.bind(this);
        this.DeleteMembersInState = this.DeleteMembersInState.bind(this);
        this.ResetActionUI = this.ResetActionUI.bind(this);
        this.DisplayLoader = this.DisplayLoader.bind(this);
        this.DisplayStatus = this.DisplayStatus.bind(this);
    }
    
    handleChange(e)
    {
        this.setState({disableSubmit: false})
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e.target.name, this.formData, inputValue);
    }
    
    async handleSubmit()
    {
        this.DisplayLoader();
        
        let updatedData = await Ajax.PutData("/api/members/", this.formData);
        this.props.UpdateTempState(updatedData);
        
        setTimeout(() =>{
            this.DisplayStatus("Modifications enregistrées",  "info");
            this.ResetActionUI();
            
        }, 1000);
    }
    
    //Function     
    DeleteMembersInDb(e)
    {
        e.preventDefault();
        
        this.DisplayLoader();
        Ajax.DeleteData("/api/members/", this.formData._id);
        
        setTimeout(() =>{
            this.DisplayStatus("Membre supprimé", "negative");
            this.DeleteMembersInState();
        }, 1000);
    }
    
    //Function that remove the news contained within the parent container only if the news has been removed from the database.
    DeleteMembersInState()
    {
        setTimeout(() =>{
            this.props.RemoveFromTempState(this.formData);
        }, 1000);
    }
    
    //Function that display a status message concerning the different operation status. This function works in correlation with the Message Component inherited from semantic UI.
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
    
    //Function that display the loader when a new action is commited.
    DisplayLoader()
    {
        this.setState({
            disableLoader: false,
            displayDimmer: true
        });
    }
    
    //Functino that reset the state used for user interaction.
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
    <Modal 
    trigger={
    <div className="cardOverlay cardEdit">
        <div className="cardOverlayBtn">
            <i className="icon edit"></i>
            <h4>Modifier</h4>
        </div>
    </div>
    } 
    closeIcon>
    <Modal.Header>Modifier un membre</Modal.Header>
        <Modal.Content>
            <Modal.Description className="section-form">
                <div className="ui spaced image img-bg" style={{backgroundImage: `url('/${this.formData.Photo}')`, width: "40%"}}>
                </div>
                <Form onSubmit={this.handleSubmit} style={{width: "60%"}}>
                    <Form.Group widths="equal">
                        <Form.Field required>
                            <input required name="FirstName" type="text" defaultValue={this.formData.FirstName} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <input required name="LastName" type="text" defaultValue={this.formData.LastName} onChange={this.handleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Input required name="Email" labelPosition='left' type='email' defaultValue={this.formData.Email} onChange={this.handleChange}>
                                <Label><i className="icon at"></i></Label>
                                <input/>
                            </Input>
                        </Form.Field>
                        <Form.Field>
                            <Input labelPosition='left' type='tel' defaultValue={this.formData.Phone} onChange={this.handleChange}>
                                <Label><i className="icon phone"></i></Label>
                                <input name="Phone" />
                            </Input>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <select required name="Occupation" onChange={this.handleChange}>
                            <option defaultValue>{this.formData.Occupation}</option> 
                            <option>Maire</option>
                            <option>Mairesse</option>
                            <option>Conseiller municipal</option>
                            <option>Conseillère municipale</option>
                            <option>Employé</option>
                            <option>Employée</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <textarea name="PersonnalNote" defaultValue={this.formData.PersonnalNote} onChange={this.handleChange}>
                        </textarea>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="btn btn-outline-info" htmlFor="photoInput"><i className="icon image"></i> {this.formData.Photo}</label>
                            <input name="Photo" type="file" id="photoInput" onChange={this.handleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <button onClick={this.DeleteMembersInDb} className="btn btn-md btn-danger"><i className="icon trash"></i> Supprimer</button>
                        <button disabled={this.state.disableSubmit} style={{float: 'right'}} type="submit" className="btn btn-md btn-primary"><i className="icon save"></i> Sauvegarder</button>
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

export default MembersEdit;