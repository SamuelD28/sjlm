import React from 'react';
import { Form, Segment } from 'semantic-ui-react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {formatDate} from 'react-day-picker/moment';
import 'moment/locale/it';

/**
 * Component for creating a new text input
 * inside the form generator.
 */
const DatePicker = (props) => {

    return (
        <Form.Field
        width={props.input.width}
        disabled={(props.input.disabled !== undefined)? props.input.disabled(props.inputs): false}
        >
        <Segment>
            <label>{props.input.label}</label>
            <DayPickerInput
                formatDate={formatDate}
                dayPickerProps={{
                    todayButton: "Aujourdh'ui"
                }}
                placeholder= "JJ/MM/AAAA"
                value={(props.input.value !== "" && props.input.value !== null && props.input.value !== undefined)? formatDate(props.input.value) : null}
                onDayChange={(date) => props.handleDateChange(date, props.input.name)}
                />
        </Segment>
    </Form.Field>
    )
}

export default DatePicker;
