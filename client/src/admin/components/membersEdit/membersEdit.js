//Initial Declaration and importation
import React from 'react';
import FormComponent from '../FormComponent.js';
import {Modal, Form, Input, Label} from 'semantic-ui-react';
import LoaderComponent from '../LoaderComponent.js';

class MembersEdit extends FormComponent{
    
    //Initilaise the form data with a new reference to the member data object
    constructor(props)
    {
        super(props);
        this.formData = Object.create(this.props.members);
    }
    
    //Function that updates the member in the db
    handleSubmit =  () =>
    {
        this.UpdateInDb("/api/members/");
    }
    
    //Function that deletes the member in the db
    handleDelete = (e) =>
    {
        e.preventDefault();
        this.DeleteInDb("/api/members/");
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
                            <input required name="FirstName" type="text" defaultValue={this.formData.FirstName} onChange={this.HandleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <input required name="LastName" type="text" defaultValue={this.formData.LastName} onChange={this.HandleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Input required name="Email" labelPosition='left' type='email' defaultValue={this.formData.Email} onChange={this.HandleChange}>
                                <Label><i className="icon at"></i></Label>
                                <input/>
                            </Input>
                        </Form.Field>
                        <Form.Field>
                            <Input labelPosition='left' type='tel' defaultValue={this.formData.Phone} onChange={this.HandleChange}>
                                <Label><i className="icon phone"></i></Label>
                                <input name="Phone" />
                            </Input>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <select required name="Occupation" onChange={this.HandleChange}>
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
                        <textarea name="PersonnalNote" defaultValue={this.formData.PersonnalNote} onChange={this.HandleChange}>
                        </textarea>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="btn btn-outline-info" htmlFor="photoInput"><i className="icon image"></i> {this.formData.Photo}</label>
                            <input name="Photo" type="file" id="photoInput" onChange={this.HandleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <button onClick={this.handleDelete} className="btn btn-md btn-danger"><i className="icon trash"></i> Supprimer</button>
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

export default MembersEdit;