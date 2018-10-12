//Initial Declaration and importation
import React from 'react';
import FormComponent from '../FormComponent.js';
import {Form, Grid} from 'semantic-ui-react';
import LoaderComponent from '../loaderComponent/loaderComponent.js';

import adminStyles from '../../containers/index.module.css';

//Component responsible for creating new page
class UserCreate extends FormComponent{
    
    render(){
    return(
    <Form className={adminStyles.sectionCard} onSubmit={() => {this.CreateInDb("/api/user")}} style={{width: "50%"}}>
        <h1>Ajouter un utilisateur</h1>
        <Grid divided>
            <Grid.Row>
                <Grid.Column>
                    <Form.Group widths="equal">
                        <Form.Input required fluid name="firstName" label="Prénom" type="text" placeholder='Prénom' onChange={this.HandleChange}/>
                        <Form.Input required fluid name="lastName"  label='Nom' type="text" placeholder='Nom' onChange={this.HandleChange}/>
                    </Form.Group>
                    <Form.Field>
                        <Form.Input required fluid name="email"  label='Email' type="email" placeholder='Email' onChange={this.HandleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Role</label>
                        <select defaultValue="0">
                            <option value="0">0 | Utilisateur</option>
                            <option value="1">1 | Administrateur</option>
                        </select>
                    </Form.Field>
                    <Form.Group widths="equal">
                        <Form.Input required fluid name="password" label="Mot de passe" type="password" placeholder='Mot de passe' onChange={this.HandleChange}/>
                        <Form.Input disabled fluid label='Répéter mot de passe' type="password" placeholder='Répéter mot de passe' onChange={this.HandleChange}/>
                    </Form.Group>
                    <Form.Field>
                        <button disabled={this.state.disableSubmit} type="submit" className="btn btn-primary">Ajouter</button>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    <LoaderComponent action={this.state.action} />
    </Form>
    )}
}

export default UserCreate;