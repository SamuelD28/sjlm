 GenerateToggleInput = (input) => {
        if(input !== undefined)
        return(
        <Form.Field>
            <label>{input.label}</label>
            <Checkbox
            name={input.name}
            onChange={(e, data) => {this.handleChange(data)}}
            checked={input.value}
            toggle />
        </Form.Field>
        )
    }
