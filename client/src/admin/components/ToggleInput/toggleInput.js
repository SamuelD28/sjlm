import React from 'react';
import {Form, Checkbox} from 'semantic-ui-react';

const ToggleInput = (props) =>
{
    return(
    <Form.Field
        width={props.input.width}
        disabled={(props.input.disabled !== undefined)? props.input.disabled(props.inputs): false}>
        <label>{props.input.label}</label>
        <Checkbox
        name={props.input.name}
        onChange={(e, data) => {props.handleChange(data)}}
        checked={props.input.value}
        toggle />
    </Form.Field>
    )
}

export default ToggleInput;