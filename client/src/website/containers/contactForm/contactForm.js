import React, {Component} from 'react';
import {Form, Label, Input} from 'semantic-ui-react';

import CSSModules from 'react-css-modules';

class ContactForm extends Component{
    
    render(){
    return(
    <Form styleName="contactForm">
        <Form.Group>
            <Form.Field width={8}>
                <input type="text" placeholder="Nom"/>
            </Form.Field>
            <Form.Field width={8}>
                <input type="text" placeholder="Prénom"/>
            </Form.Field>
        </Form.Group>
        <Form.Group>
            <Form.Field width={8}>
                <Input labelPosition='left' type='email' placeholder='Adresse Courriel'>
                    <Label basic><i className="icon at"></i></Label>
                    <input/>
                </Input>
            </Form.Field>
            <Form.Field width={8}>
                <Input labelPosition='left' type='tel' placeholder='Téléphone'>
                    <Label basic><i className="icon phone"></i></Label>
                    <input />
                </Input>
            </Form.Field>
        </Form.Group>
        <Form.Field>
            <select defaultValue="default">
                <option value="default">Sujet*</option>
                <option value="information">Demande d'information</option>
                <option value="comment">Commentaire et suggestion</option>
                <option value="maintenance">Entretiens des rues</option>
                <option value="sewer">Aqueduc et egout</option>
                <option value="complaint">Plainte</option>
                <option value="other">Autre</option>
            </select>
        </Form.Field>
        <Form.Field>
            <textarea placeholder="Description"></textarea>
        </Form.Field>
        <button className="btn btn-primary"><i className="icon send"></i> Envoyer</button>
    </Form>
    )}
}

export default ContactForm;