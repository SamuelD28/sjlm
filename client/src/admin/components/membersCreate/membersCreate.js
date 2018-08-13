//Initial declaration and importation 
import React, {Component} from 'react';
import {Modal, Form, Input, Label} from 'semantic-ui-react';
import {Forms, Ajax} from '../../../shared/utility.js';

class MembersCreate extends Component{
    
    constructor(props)
    {
        super(props);
        
        this.formData = {};
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    async handleSubmit()
    {
        let postedData = await Ajax.PostData("/api/members", this.formData);
        this.props.CreateInTempState(postedData);
    }
    
    //METHODE REPETIVE. EXTRAIRE DANS UNE CLASSE?
    handleChange(e)
    {
        let inputValue = Forms.RetrieveValueFromInput(e);
        Forms.AppendValueToObject(e, this.formData, inputValue);
    }
    
    render(){
    
    return(
    <Modal 
    trigger={
    <div className="cardContainer membersCreate">
        <div className="cardOverlay">
            <div className="cardOverlayBtn">
                <i className="icon plus"></i>
                <h4>Ajouter</h4>
            </div>
        </div>
    </div>
    } 
    closeIcon>
    <Modal.Header>Ajouter un nouveau membre</Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths="equal">
                        <Form.Field required>
                            <input required name="FirstName" type="text" placeholder="Nom" onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <input required name="LastName" type="text" placeholder="Prénom" onChange={this.handleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Input required name="Email" labelPosition='left' type='email' placeholder='Email' onChange={this.handleChange}>
                                <Label><i className="icon at"></i></Label>
                                <input/>
                            </Input>
                        </Form.Field>
                        <Form.Field>
                            <Input labelPosition='left' type='tel' placeholder='Téléphone' onChange={this.handleChange}>
                                <Label><i className="icon phone"></i></Label>
                                <input name="Phone" />
                            </Input>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <select required name="Occupation" onChange={this.handleChange}>
                            <option value="" disabled selected hidden>Occupation</option> 
                            <option>Maire</option>
                            <option>Mairesse</option>
                            <option>Conseiller municipal</option>
                            <option>Conseillère municipale</option>
                            <option>Employé</option>
                            <option>Employée</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <textarea name="PersonnalNote" placeholder="Note Personnel" onChange={this.handleChange}>
                        </textarea>
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <label className="btn btn-outline-info" htmlFor="photoInput"><i className="icon image"></i> Choisir une photo</label>
                            <input required name="Photo" type="file" id="photoInput" onChange={this.handleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <button type="submit" className="btn btn-md btn-primary"><i className="icon save"></i> Ajouter</button>
                </Form>
            </Modal.Description>
        </Modal.Content>
    </Modal>    
    )}
}

export default MembersCreate;