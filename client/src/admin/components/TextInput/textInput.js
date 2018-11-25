GenerateTextInput = (input) => {
        if(input !== undefined)
        return(
        <Form.Field>
            <label>{input.label}</label>
            <Input
                name={input.name}
                placeholder={Translate.ModelKey(input.name) + "..."}
                onChange={(e, data) => {this.handleChange(data)}}
                value={input.value}
                type={input.type}
                ref={this[input.name]}/>
        </Form.Field>
        )
    }
