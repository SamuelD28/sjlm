import React from 'react';
import { Form, Input, Segment } from 'semantic-ui-react';

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
            required={props.input.required}
            size = {props.input.size}
            transparent
            name = { props.input.name }
            placeholder = { (props.input.name) + "..." }
            onChange = {
                (e, data) => { props.handleChange(data) } }
            value = { props.input.value }
            type = { props.input.type }    />
        </Segment>
    </Form.Field>
    )
}

export default TextInput;
