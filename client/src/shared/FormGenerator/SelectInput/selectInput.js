import React from 'react';
import { Form, Select } from 'semantic-ui-react';
import Translate from '../../../shared/translate.js';

/**
 * Component for creating a select input inside
 * the form generator. Uses a list or a generator
 * to create his dataset for select options
 */
const SelectInput = (props) => {
    return (
        <Form.Field
        width={props.input.width}
        disabled={(props.input.disabled !== undefined)? props.input.disabled(props.inputs): false}>
        <label>{props.input.label}</label>
        <Select
            name={props.input.name}
            clearable
            placeholder={Translate.ModelKey(props.input.name) + "..."}
            selection
            value={props.input.value}
            onChange={(e, data) =>  {props.handleChange(data)}}
            options={(props.input.generator !== undefined)? props.input.generator(): props.input.list} />
    </Form.Field>
    )
}

export default SelectInput;
