import React from 'react';
import { Form, Checkbox, Segment } from 'semantic-ui-react';

/**
 * Component that create a new toggle input
 * inside the form generator.
 */
const ToggleInput = (props) => {
    return (
        <Form.Field
        width={props.input.width}
        disabled={(props.input.disabled !== undefined)? props.input.disabled(props.inputs): false}>
        <Segment>
            <label>{props.input.label}</label>
            <Checkbox
            name={props.input.name}
            onChange={(e, data) => {props.handleChange(data)}}
            checked={props.input.value}
            toggle />
        </Segment>
    </Form.Field>
    )
}

export default ToggleInput;
