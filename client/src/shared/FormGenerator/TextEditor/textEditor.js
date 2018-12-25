import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import ReactQuill from 'react-quill';

const modules = {
    toolbar:[
      [{ 'header': [1, 2, 3, 4, 5 ,6] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'link'],
      [{'list': 'ordered'}, {'list': 'bullet'},{'indent': '-1'}, {'indent': '+1'},{ 'align': [] }],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
};
const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'indent','link',
    'align'
];

class TextEditor extends Component
{
    constructor(props){
        super(props);
        this.TextEditor = React.createRef();
        this.HandleChangeInTextEditor = props.handleChange;
    }

    render(){
    if(this.props.input.type === "FULL")
    return(
        <Form.Field
            disabled={(this.props.input.disabled !== undefined)? this.props.input.disabled(this.props.inputs): false}>
            <ReactQuill
            modules={modules}
            formats={formats}
            onChange={() => {this.HandleChangeInTextEditor(this.TextEditor, this.props.input.name)}}
            ref={this.TextEditor}
            />
        </Form.Field>
    )
    else
    return(
        <h1>Simple Text Editor</h1>
    )
    }
}

export default TextEditor;