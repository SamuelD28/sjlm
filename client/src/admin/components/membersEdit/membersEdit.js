//Initial Declaration and importation
import React, {Component} from 'react';
import {Modal, Form, Input, Label} from 'semantic-ui-react';
import {Forms, Ajax} from '../../../shared/utility.js';

class MembersEdit extends Component{
    
    constructor(props)
    {
        super(props);
        
        this.formData = Object.create(this.props.members);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.DeleteMembersInDb = this.DeleteMembersInDb.bind(this);
    }
    
    handleChange(e)
    {
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e, this.formData, inputValue);
    }
    
    async handleSubmit()
    {
        let updatedData = await Ajax.PutData("/api/members/", this.formData);
        this.props.UpdateTempState(updatedData);
    }
    
    DeleteMembersInDb(e)
    {
        e.preventDefault();
        Ajax.DeleteData("/api/members/" , this.formData._id);
        this.props.RemoveFromTempState(this.formData);
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
            <Modal.Description className="section-row">
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
                        <button style={{float: 'right'}} type="submit" className="btn btn-md btn-primary"><i className="icon save"></i> Sauvegarder</button>
                    </Form.Field>
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>    
    )}
    }
}

export default MembersEdit;