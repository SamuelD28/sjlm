import React, { Component } from 'react';
import { TextArea } from 'semantic-ui-react';
import Quill from 'quill';

//Default declaration used by the quill text edtior
const modules = {
    table: true,
    toolbar: "#toolbar",
    clipboard: {
        matchVisual: false
    }
};

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
        this.state = { text: props.input.value };
    }

    componentDidMount() {

        var snow = new Quill('#editor', {
            theme: 'snow',
            modules: modules
        });
        const table = snow.getModule('table');
        snow.clipboard.dangerouslyPasteHTML(0, this.props.input.value);
        snow.on('text-change', (delta, oldDelta, source) => {
            this.props.handleChangeEditor({ name: this.props.input.name, value: snow.root.innerHTML });
        });

        document.querySelector('#insert-table').addEventListener('click', function () {
            table.insertTable(2, 2);
        });
        document.querySelector('#insert-row-above').addEventListener('click', function () {
            table.insertRowAbove();
        });
        document.querySelector('#insert-row-below').addEventListener('click', function () {
            table.insertRowBelow();
        });
        document.querySelector('#insert-column-left').addEventListener('click', function () {
            table.insertColumnLeft();
        });
        document.querySelector('#insert-column-right').addEventListener('click', function () {
            table.insertColumnRight();
        });
        document.querySelector('#delete-row').addEventListener('click', function () {
            table.deleteRow();
        });
        document.querySelector('#delete-column').addEventListener('click', function () {
            table.deleteColumn();
        });
        document.querySelector('#delete-table').addEventListener('click', function () {
            table.deleteTable();
        });
    }

    render() {
        if (this.props.input.type === "full")
            return <div>
                        <div id="toolbar">
                            <div className="ql-formats">
                                <select className="ql-header">
                                    <option value="1"></option>
                                    <option value="2"></option>
                                    <option value="3"></option>
                                    <option value="4"></option>
                                    <option value="5"></option>
                                    <option value="6"></option>
                                </select>
                                <select className="ql-size">
                                    <option value="huge"></option>
                                    <option value="large"></option>
                                    <option value="normal"></option>
                                    <option value="small"></option>
                                </select>
                            </div>
                            <div className="ql-formats">
                                <select className="ql-color">
                                </select>
                                <select className="ql-background">
                                </select>
                                <button className="ql-bold"></button>
                                <button className="ql-italic"></button>
                                <button className="ql-underline"></button>
                                <button className="ql-strike"></button>
                                <button className="ql-blockquote"></button>
                                <button className="ql-link"></button>
                            </div>
                            <div className="ql-formats">
                                <button className="ql-list" value="bullet"></button>
                                <button className="ql-list" value="ordered"></button>
                                <select className="ql-align">
                                </select>
                            </div>
                            <div className="ql-formats">
                                <button id="insert-table"><i className="icon table-btn table"></i></button>
                                <button id="insert-row-above"><i className="icon table-btn hand point up outline"></i></button>
                                <button id="insert-row-below"><i className="icon table-btn hand point down outline"></i></button>
                                <button id="insert-column-left"><i className="icon table-btn hand point left outline"></i></button>
                                <button id="insert-column-right"><i className="icon table-btn hand point right outline"></i></button>
                                <button id="delete-row"><i className="icon table-btn window close outline"></i></button>
                                <button id="delete-column"><i className="icon table-btn window close"></i></button>
                                <button id="delete-table"><i className="icon table-btn delete"></i></button>
                            </div>
                            <div className="ql-formats">
                                <button className="ql-clean"></button>
                            </div>
                        </div>
                        <div id="editor" ref={this.TextEditor}></div>
                    </div>
        else
            return (
                <TextArea
                    style={(!this.props.input.inline)? {height: "100%"}: {height: "auto"}}
                    name={this.props.input.name}
                    placeholder={this.props.input.placeholder}
                    value={this.props.input.value}
                    onChange={ (e, data) => this.props.handleChangeTextArea(data)}
                />
            )
    }
}

export default TextEditor;


// return (
//                 <ReactQuill
//                     modules = { this.modules }
//                     defaultValue = { this.props.input.value }
//                     formats = { this.formats }
//                     onChange = {
//                         () => {
//                             this.props.handleChangeEditor(this.TextEditor, this.props.input.name)
//                         }
//                     }
//                     ref = {this.TextEditor}
//                 />)
