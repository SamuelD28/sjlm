//------------Usage Guide---------//
// name : string (must match the schema name used in database),
// placeholder: string,
// type: string [simple/full], for creating textarea or quill editor
// disabled: anonymous function that return true/false needs a inputs parameter,
// value : string/bool/array,

import { Utility } from '../utility.js';

class EditorSchema {
    constructor({
        name = "Unnamed Input",
        placeholder = "Unnamed Input",
        type = "simple",
        disabled = () => false,
        value = "",
        width = 8,
        inline = false
    }) {
        this.name = name;
        this.placeholder = placeholder;
        this.type = type.toLowerCase();
        this.disabled = disabled;
        this.value = value;
        this.width = width;
        this.inline = inline;

        //Verify that all the properties match a corresponding type
        //and that they meet a certain constrait trough functions
        Utility.VerifyProperty(this.name, String);
        Utility.VerifyProperty(this.inline, Boolean);
        Utility.VerifyProperty(this.width, Number, Utility.BetweenMinMaxNumber, { min: 0, max: 14 });
        Utility.VerifyProperty(this.placeholder, String);
        Utility.VerifyProperty(this.value, String);
        Utility.VerifyProperty(this.type, String, Utility.IsWithinEnumeration, { enumeration: ['simple', 'full'] });
    }
}
export default EditorSchema;
