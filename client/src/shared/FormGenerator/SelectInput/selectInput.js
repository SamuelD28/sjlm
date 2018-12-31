import React from 'react';
import { Form, Dropdown, Segment } from 'semantic-ui-react';
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
        <Segment>
            <label>{props.input.label}</label>
            <Dropdown
                size={props.input.size}
                fluid
                scrolling
                search={props.input.search}
                name={props.input.name}
                clearable={props.input.clearable}
                placeholder={Translate.ModelKey(props.input.name) + "..."}
                value={props.input.value}
                onChange={(e, data) =>  {props.handleChange(data)}}
                options={(props.input.generator !== undefined)? props.input.generator(): props.input.list} />
        </Segment>
    </Form.Field>
    )
}

export default SelectInput;
