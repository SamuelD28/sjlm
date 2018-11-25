import React from 'react';
import {Form} from 'semantic-ui-react';

const SubmitBtn = (props) =>
    {
        return (
        <Form.Field>
            <button type="submit" className={props.btnClassStyle}>
                {props.btnText}
            </button>
        </Form.Field>
        )
    }

export default SubmitBtn;