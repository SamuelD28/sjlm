import React, {Component} from 'react';
import {Form, TextArea} from 'semantic-ui-react';
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
    }

    render(){
    if(this.props.input.type === "full")
    return(
        <Form.Field
            disabled={(this.props.input.disabled !== undefined)? this.props.input.disabled(this.props.inputs): false}>
            <ReactQuill
            modules={modules}
            formats={formats}
            onChange={() => {this.props.handleChange(this.TextEditor, this.props.input.name)}}
            ref={this.TextEditor}
            />
        </Form.Field>
    )
    else
    return(
        <TextArea
            style={{height: "100%"}}
            name={this.props.input.name}
            placeholder={this.props.input.placeholder}
            onChange={() => {this.props.handleChange(this.TextEditor, this.props.input.name)}}
            ref={this.TextEditor}
            />
    )}
}

export default TextEditor;