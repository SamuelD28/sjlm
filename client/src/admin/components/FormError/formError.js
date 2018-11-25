import React from 'react';
import {Form , Message} from 'semantic-ui-react';

const FormError = (props) => {

    if(!props.errorHandler.errors instanceof Array)
        throw new TypeError("The errors list must be an array");

    return(
    <Form.Field>
        <Message
            negative
            hidden={(props.errorHandler.errors.length === 0)}
            header={props.errorHandler.errorsHeader}
            list={props.errorHandler.errors}
            />
    </Form.Field>
    )
}

export default FormError;