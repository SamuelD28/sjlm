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
    constructor({
                name,
                label,
                group,
                width,
                type,
                disabled,
                value,
                list,
                generator})
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

    VerifyProperty = (property, type, verificationFuntion, functionArguments) =>
    {
        if(property !== undefined)
        {
            if(property.constructor !== type)
                throw new TypeError("Input" + property + " does not match the type : " + type);

            if(verificationFuntion !== undefined && verificationFuntion instanceof Function)
            {
                if(!verificationFuntion(property, functionArguments))
                    throw new TypeError("Verification failed for input : " + property);
            }
        }
    }

    BetweenMinMaxNumber = (num, {min = 0, max = 10}) =>
    {
        if(num > max || num < min)
            return false;

        return true;
    }

    BetweenMaxMinLength = (str, {min = 5, max = 10} ={}) =>
    {
        if(!this.MinimumLength(str, {min : min}) || !this.MaximumLength(str, {max : max}))
            return false;

        return true;
    }

    MinimumLength = (str, {min = 5} = {}) =>
    {
        if(str.length < min)
            return false;

        return true;
    }

    MaximumLength = (str , {max = 10} = {}) =>
    {
        if(str.length > max)
            return false;

        return true;
    }

    //Handle verification logic
}
export default InputSchema;