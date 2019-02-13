import React, {Component} from 'react';
import Ajax from '../../../shared/ajax.js';

import PageHeader from '../pageHeader/pageHeader.js';
import {Form, Input, Button, Dropdown, Segment, TextArea, Icon, Message} from 'semantic-ui-react';

class ContactForm extends Component{
    
    state ={name : "", email : "", message : "", subject : "", phone : "", loading: false, success: false, failure : false}
    
    handleChange = (data) =>{
        this.setState({[data.name.valueOf()] : data.value});
    }
    
    handleSubmit = async() =>{
        this.setState({loading: true});
        let request = await Ajax.PostData("/send_mail", this.state);
        if(request.success){
            this.setState({name : "", email : "", message : "", subject : "", phone : "", loading: false,success: true});
        }
        else{
            this.setState({loading: false, failure: true});
        }
    }
    
    render(){
    
    const subjects = [
        {text : "Autre", value : "Autre"},    
        {text : "Entretien des rues", value : "Entretien des rues"},    
        {text : "Aqueduc et égout", value : "Aqueduc et égout"},   
        {text : "Demande d'information", value : "Demande d'information"},  
        {text : "Commentaire et suggestion", value : "Commentaire et suggestion"}, 
        {text : "Requête", value : "Requête"},
        {text : "Plainte", value : "Plainte"}    
    ]
    
    return  <div className="component-card rounded large-gutters">
                <PageHeader title="Joindre" category="Contact"/>
                <div style={{marginTop: "2vw"}}>
                <Form
                    error={this.state.failure}
                    success={this.state.success}
                    loading={this.state.loading}
                    onSubmit={this.handleSubmit}>
                    <Message 
                        success 
                        header='Message envoyé!' 
                        content="Nous donnerons suivi à votre email dans les plus brefs délais." />
                    <Message 
                        error 
                        header="Une erreur c'est produite" 
                        content="Vérifier que les informations entrées sont correctes." />
                    <Form.Group>
                        <Form.Field width={8}>
                            <Segment>
                                <label>Nom</label>
                                <Input
                                    required
                                    transparent
                                    name="name"
                                    placeholder="Nom..."
                                    onChange = {(e, data) => {this.handleChange(data)}}
                                    value={this.state.name}
                                    type="text"
                                    />
                            </Segment>
                        </Form.Field>
                        <Form.Field required width={8}>
                            <Segment>
                                <label>Email</label>
                                <Input
                                    required
                                    transparent
                                    name="email"
                                    placeholder="Email..."
                                    onChange = {(e, data) => {this.handleChange(data)}}
                                    value={this.state.email}
                                    type="email"
                                    />
                            </Segment>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={8}>
                            <Segment>
                                <label>Téléphone</label>
                                <Input
                                    required
                                    transparent
                                    name="phone"
                                    placeholder="Téléphone..."
                                    onChange = {(e, data) => {this.handleChange(data)}}
                                    value={this.state.phone}
                                    type="tel"
                                    />
                            </Segment>
                        </Form.Field>
                        <Form.Field required width={8}>
                            <Segment>
                                <label>Sujet</label>
                                <Dropdown
                                    fluid
                                    required
                                    scrolling
                                    name="subject"
                                    clearable
                                    placeholder="Sujet..."
                                    value={this.state.subject}
                                    onChange={(e, data) => {this.handleChange(data)}}
                                    options={subjects}
                                    />
                            </Segment>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field width={16}>
                        <TextArea 
                            required
                            value={this.state.message}
                            onChange={(e, data) =>{this.handleChange(data)}}
                            name="message"
                            placeholder='Message...' 
                            style={{ minHeight: 150 }} 
                            />
                    </Form.Field>
                    <Button 
                        size="large"
                        color="blue" 
                        inverted 
                        type='submit'><Icon name="paper plane outline"/> Envoyer
                    </Button>
                  </Form>
                </div>
            </div>
    }
}

export default ContactForm;