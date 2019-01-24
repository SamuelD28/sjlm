//Initial Declaration and importation
import React from 'react';
import FormComponent from '../FormComponent.js';
import {Form, Grid} from 'semantic-ui-react';

class UserUpdate extends FormComponent{
    
    render(){
    return(
    <Form onSubmit={() => {this.UpdateInDb("/api/user/" + this.props.user._id)}}>
        <h2>{this.props.user.firstName} {this.props.user.lastName}</h2>
        <Grid divided>
            <Grid.Row>
                <Grid.Column>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <Form.Input fluid name="firstName" label="Prénom" type="text" defaultValue={this.props.user.firstName} onChange={this.HandleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <Form.Input fluid name="lastName"  label='Nom' type="text" defaultValue={this.props.user.lastName} onChange={this.HandleChange}/>
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Form.Input fluid name="email"  label='Nom Utilisateur' type="text" defaultValue={this.props.user.email} onChange={this.HandleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <button disabled={this.state.disableSubmit} type="submit" className="btn btn-primary">Modifier</button>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Form>
    )}
}

export default UserUpdate;