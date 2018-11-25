GenerateTextEditor = (input) => {
        if(input !== undefined)
        return(
        <Form.Field>
            <ReactQuill
            modules={modules}
            formats={formats}
            onChange={() => {this.handleChangeInTextEditor(this.TextEditor, input.name)}}
            ref={this.TextEditor}
            />
        </Form.Field>
        )
    }
