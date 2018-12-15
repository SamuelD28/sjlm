import React from 'react';
import {Form} from 'semantic-ui-react';
import CloudinaryUpload from '../cloudinaryUpload/cloudinaryUpload.js';

const FileInput = (props) =>
{
    if(props.input !== undefined)
    return(
     <Form.Field
        width={props.input.width}
        disabled={(props.input.disabled !== undefined)? props.input.disabled(props.inputs): false}>
        <CloudinaryUpload
            input={props.input}
            updateStateInputs={props.updateStateInputs}
            />
    </Form.Field>
    )
}

export default FileInput;
