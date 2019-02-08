//Initial Declaration and importation
import React, {Component} from 'react';

import {default as UserSchema} from '../../formSchema/userSchema.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';

/**
 * Component for editing a new user
 * in the database
 */
class UserUpdate extends Component{
    
    constructor(props){
        super(props);
        this.PutConfig = UserSchema.GetBindedPutConfig(props.user._id);
        this.PutConfig.modalOpener = this.ModalOpener;
    }
        
    ModalOpener = () =>{
        return <div className="item-card">{this.props.user.email}</div>
    }
        
    render(){
        return <FormGenerator
                    Inputs={UserSchema.GetBindedInputs(this.props.user)}
                    FormConfig={this.PutConfig}
                    FormStatus={new FormStatus()}
                    RefreshDataSet={() => {}}
                    />
    }
}

export default UserUpdate;