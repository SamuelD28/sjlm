import React from 'react';
import {default as UserSchema} from '../../formSchema/userSchema.js';

import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';

/**
 * Component for adding a new user
 * in the database
 */
const UserCreate = () =>{
    return <FormGenerator
                Inputs={UserSchema.GetEmptyInputs()}
                FormConfig={UserSchema.GetPostConfig()}
                FormStatus={new FormStatus()}
                RefreshDataSet={() => {}}
                />
}

export default UserCreate;