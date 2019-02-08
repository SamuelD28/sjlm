import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {default as UserSchema} from '../../formSchema/userSchema.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';

/**
 * Component for adding a new user
 * in the database
 */
class UserCreate extends Component{
    
    constructor(props){
        super(props);
        this.PostConfig = UserSchema.GetPostConfig();
        this.PostConfig.modalOpener  = this.ModalOpener;
    }
    
    ModalOpener = () =>{
        return <Button className="rounded-right" color="teal">Ajouter Utilisateur</Button>
    }
    
    render(){
        return <FormGenerator
                    Inputs={UserSchema.GetEmptyInputs()}
                    FormConfig={this.PostConfig}
                    FormStatus={new FormStatus()}
                    RefreshDataSet={() => {}}
                    />
    }
}

export default UserCreate;