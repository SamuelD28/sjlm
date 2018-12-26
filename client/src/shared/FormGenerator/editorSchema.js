//------------Usage Guide---------//
// name : string (must match the schema name used in database),
// label: string,
// group: number > 0,
// width: number > 0 < 16,
// type: string [select/text/uploader/texteditor/toggle],
// disabled: anonymous function that return true/false needs a inputs parameter,
// value : string/bool/array,
// list : array
// generator : function that returns an array

import {Utility} from '../utility.js';

class EditorSchema
{
    constructor({
                name = "Unnamed Input",
                label = "Unnamed Input...",
                type = "simple",
                disabled = () => false,
                value = ""})
    {
        this.name = name;
        this.label = label;
        this.type = type.toLowerCase();
        this.disabled = disabled;
        this.value = value;

        //Verify that all the properties match a corresponding type
        //and that they meet a certain constrait trough functions
        Utility.VerifyProperty(this.name, String);
        Utility.VerifyProperty(this.label, String);
        Utility.VerifyProperty(this.value, String);
        Utility.VerifyProperty(this.type,
                               String,
                               Utility.IsWithinEnumeration,
                               {enumeration : ['simple', 'full']});
    }
}
export default EditorSchema;