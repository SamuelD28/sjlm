import React from 'react';
import { Form, Input, Segment } from 'semantic-ui-react';
import Translate from '../../../shared/translate.js';

/**
 * Component for creating a new text input
 * inside the form generator.
 */
const TextInput = (props) => {
    return (
        <Form.Field
        width={props.input.width}
        disabled={(props.input.disabled !== undefined)? props.input.disabled(props.inputs): false}
        >
        <Segment>
            <label>{props.input.label}</label>
            <Input
            transparent
            name = { props.input.name }
            placeholder = { Translate.ModelKey(props.input.name) + "..." }
            onChange = {
                (e, data) => { props.handleChange(data) } }
            value = { props.input.value }
            type = { props.input.type }    />
        </Segment>
    </Form.Field>
    )
}

export default TextInput;
