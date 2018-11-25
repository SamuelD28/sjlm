GenerateSelectInput = (input) => {
        if(input !== undefined)
        return(
        <Form.Field>
            <label>{input.label}</label>
            <Select
                name={input.name}
                clearable
                placeholder={Translate.ModelKey(input.name) + "..."}
                selection
                value={input.value}
                onChange={(e, data) =>  {this.handleChange(data)}}
                options={input.generator()} />
        </Form.Field>
        )
    }