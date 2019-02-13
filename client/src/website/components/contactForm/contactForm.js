import React, {Component} from 'react';
import Ajax from '../../../shared/ajax.js';

import PageHeader from '../pageHeader/pageHeader.js';
import {Form, Input, Button, Dropdown, Segment, TextArea, Icon} from 'semantic-ui-react';

class ContactForm extends Component{
    
    state ={name : "", email : "", message : "", subject : "", phone : "", loading: false}
    
    handleChange = (data) =>{
        this.setState({[data.name.valueOf()] : data.value});
    }
    
    handleSubmit = async() =>{
        
        this.setState({loading: true});
        
        let request = await Ajax.PostData("/send_mail", this.state);
        
        if(request.success){
            this.setState({loading: false});
        }
    }
    
    render(){
    return  <div className="component-card rounded large-gutters">
                <PageHeader title="Joindre" category="Contact"/>
                <div style={{marginTop: "2vw"}}>
                <Form
                    loading={this.state.loading}
                    onSubmit={this.handleSubmit}>
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
                                    options={[{text: "test", value: "test"}]}
                                    />
                            </Segment>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field width={16}>
                        <TextArea 
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