import { Utility } from '../utility.js';

//List of all the input types handled by the form generator
const inputTypes = ['select', 'text', 'uploader', 'texteditor', 'toggle', 'password', 'tel', 'email'];

/**
 * Class that represents the structure of an input inside
 * the form generator. All the propeties are initialised
 * to a default value to limit the verification needed by the
 * form generator.
 *
 * name : name of the input. Must match(case sensitive) the name of the backend
 * schema key it is linked to
 * label : label displayed on top of the input
 * group : number that represents the group the input belongs to.
 * Used this to group multiple input together and rearragne the order
 * they are displayed in the form.
 * width : number used to represent the width of the input. Based
 * on the semantic ui system for sizing up inputs. 0-16
 * type : type of the desired inputs. Based on the const inputTypes.
 * disaled : function used to determine wether this input shoudl be
 * disabled
 * value : initial value of the input. Can be string/number/array.
 * Always use an array if you use an uploader type input even if you
 * only need one data.
 * list : list of options used by the select type inputs
 * generator : function that lazy load a list of option
 * for the select type inputs
 * multiple : used to tell that multiple file are allowed
 * inside an uploader type input
 */
class InputSchema {
    constructor({
        name = "Unnamed Input",
        label = "Unnamed Input...",
        group,
        width,
        type = "text",
        disabled = () => false,
        value = "",
        list = [],
        generator,
        multiple = false
    }) {
        this.name = name;
        this.label = label;
        this.group = group;
        this.width = width;
        this.type = type.toLowerCase();
        this.disabled = disabled;
        this.value = value;
        this.list = list;
        this.generator = generator;
        this.multiple = multiple;

        //Verify that all the properties match a corresponding type
        //and that they meet a certain constrait trough functions
        Utility.VerifyProperty(this.name, String);
        Utility.VerifyProperty(this.label, String);
        Utility.VerifyProperty(this.multiple, Boolean);
        Utility.VerifyProperty(this.list, Array);
        Utility.VerifyProperty(this.generator, Function);
        Utility.VerifyProperty(this.group, Number, Utility.BetweenMinMaxNumber, { min: 0, max: 16 });
        Utility.VerifyProperty(this.width, Number, Utility.BetweenMinMaxNumber, { min: 0, max: 16 });
        Utility.VerifyProperty(this.type, String, Utility.IsWithinEnumeration, { enumeration: inputTypes });
    }
}
export default InputSchema;
