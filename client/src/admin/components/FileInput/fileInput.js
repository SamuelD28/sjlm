GenerateUploader = (input) => {
        if(input !== undefined)
        return(
         <Form.Field>
            <CloudinaryUpload
                input={input}
                updateStateInputs={this.updateStateInputs}
                />
        </Form.Field>
        )
    }