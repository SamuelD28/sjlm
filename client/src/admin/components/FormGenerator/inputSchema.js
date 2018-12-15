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

class InputSchema
{
    constructor({name, label, group, width, type, disabled, value, list, generator})
    {
        this.name = name;
        this.label = label;
        this.group = group;
        this.width = width;
        this.type = type;
        this.disabled = disabled;
        this.vaue = value;
        this.list = list;
        this.generator = generator;
    }

    //Handle verification logic
}
export default InputSchema;