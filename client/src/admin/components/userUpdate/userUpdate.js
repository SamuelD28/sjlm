//Initial Declaration and importation
import React from 'react';
import FormComponent from '../FormComponent.js';
import {Form, Grid} from 'semantic-ui-react';
import LoaderComponent from '../loaderComponent/loaderComponent.js';

import adminStyles from '../../containers/index.module.css';

class UserUpdate extends FormComponent{
    
    render(){
    return(
    <Form className={adminStyles.sectionCard} onSubmit={() => {this.UpdateInDb("/api/user/" + this.props.user._id)}} style={{width: "30%"}}>
        <h1>{this.props.user.firstName} {this.props.user.lastName}</h1>
        <Grid divided>
            <Grid.Row>
                <Grid.Column>
                    <Form.Field>
                        <Form.Input fluid name="firstName" label="Prénom" type="text" defaultValue={this.props.user.firstName} onChange={this.HandleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input fluid name="lastName"  label='Nom' type="text" defaultValue={this.props.user.lastName} onChange={this.HandleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input fluid name="email"  label='Email' type="email" defaultValue={this.props.user.email} onChange={this.HandleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Role</label>
                        <select defaultValue="0">
                            <option value="0">0 | Utilisateur</option>
                            <option value="1">1 | Administrateur</option>
                        </select>
                    </Form.Field>
                    <Form.Field>
                        <button disabled={this.state.disableSubmit} type="submit" className="btn btn-primary">Modifier</button>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    <LoaderComponent action={this.state.action} />
    </Form>
    )}
}

export default UserUpdate;