import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';
import ReactQuill from 'react-quill';

//Default declaration used by the quill text edtior
const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', 'link'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
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
    'indent', 'link',
    'align'
];

/**
 * Component for creating a new text editor inside
 * the form generator. Creates a reactquill component
 * if the type is full or a simple textarea if the
 * type is simple.
 */
class TextEditor extends Component {
    constructor(props) {
        super(props);
        //This reference is needed for accessing the content of
        //the editor since it doesnt create an event target object
        //when we modify the value inside
        this.TextEditor = React.createRef();
        this.modules = modules;
        this.formats = formats;
        this.state = { text: props.input.value };
    }

    render() {
        if (this.props.input.type === "full")
            return (
                <ReactQuill
                    modules = { this.modules }
                    defaultValue = { this.props.input.value }
                    formats = { this.formats }
                    onChange = {
                        () => this.props.handleChangeEditor(this.TextEditor, this.props.input.name)
                    }
                    ref = {this.TextEditor}
                />)
        else
            return (
                <TextArea
                    style={{height: "100%"}}
                    name={this.props.input.name}
                    placeholder={this.props.input.placeholder}
                    value={this.props.input.value}
                    onChange={ (e, data) => this.props.handleChangeTextArea(data)}
                />
            )
    }
}

export default TextEditor;
