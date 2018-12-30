import React from 'react';
import { Form, Message } from 'semantic-ui-react';

/**
 * Component responsible for displaying error message that occured in the
 * backend validation of the submitted form
 */
const FormError = (props) => {
    return (
        <Message
            negative
            hidden={(props.errorHandler.errors.length === 0)}
            header={props.errorHandler.errorsHeader}
            list={props.errorHandler.errors}
            />
    )
}

export default FormError;
