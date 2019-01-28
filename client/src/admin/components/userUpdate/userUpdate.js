//Initial Declaration and importation
import React from 'react';

import {default as UserSchema} from '../../formSchema/userSchema.js';
import {FormGenerator, FormStatus} from '../../../shared/FormGenerator/formGenerator.js';

/**
 * Component for editing a new user
 * in the database
 */
const UserUpdate = (props) =>{
    return <FormGenerator
                Inputs={UserSchema.GetBindedInputs(props.user)}
                FormConfig={UserSchema.GetBindedPutConfig(props.user._id)}
                FormStatus={new FormStatus()}
                RefreshDataSet={() => {}}
                />
}

export default UserUpdate;