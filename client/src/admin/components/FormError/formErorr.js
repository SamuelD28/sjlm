GenerateErrorHeader = (errorHandler) => {

        if(!errorHandler.errors instanceof Array)
            throw new TypeError("The errors list must be an array");

        return(
        <Form.Field>
            <Message
                negative
                hidden={(errorHandler.errors.length === 0)}
                header={errorHandler.headerTitle}
                list={errorHandler.errors}
                />
        </Form.Field>
        )
    }