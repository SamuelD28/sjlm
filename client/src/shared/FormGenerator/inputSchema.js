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

class InputSchema
{
    constructor({
                name = "Unnamed Input",
                label = "Unnamed Input...",
                group,
                width,
                type = "text",
                disabled = () => false,
                value = "",
                list = [],
                generator})
    {
        this.name = name;
        this.label = label;
        this.group = group;
        this.width = width;
        this.type = type.toLowerCase();
        this.disabled = disabled;
        this.value = value;
        this.list = list;
        this.generator = generator;

        //Verify that all the properties match a corresponding type
        //and that they meet a certain constrait trough functions
        Utility.VerifyProperty(this.name, String);
        Utility.VerifyProperty(this.label, String);
        Utility.VerifyProperty(this.list, Array);
        Utility.VerifyProperty(this.generator, Function);
        Utility.VerifyProperty(this.group,
                               Number,
                               Utility.BetweenMinMaxNumber,
                               {min: 0, max: 16});
        Utility.VerifyProperty(this.width,
                               Number,
                               Utility.BetweenMinMaxNumber,
                               {min: 0, max: 16});
        Utility.VerifyProperty(this.type,
                               String,
                               Utility.IsWithinEnumeration,
                               {enumeration : ['select','text','uploader','texteditor','toggle','password','tel','email']});
    }
}
export default InputSchema;