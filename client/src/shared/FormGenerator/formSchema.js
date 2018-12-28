/**
 *  Script that holds all the data used by the form generatro to generate
 *  multiple type of forms based on the data type.
 */
class FormSchema
{
    /**
     * Function that creates a deep copy of the menu inputs and
     * returns the copy in the form of an array. Necessary in order
     * to avoid having collision betweens inputs and different forms.
    */
    Clone = () =>
    {
        let inputsCopy = [];
        this.inputs.forEach((input) =>
        {
            inputsCopy.push(Object.assign({}, input));
        });
        return inputsCopy;
    }

    /**
     * Methods that returns a new array with empty inputs
     */
    GetEmptyInputs = () =>
    {
        return this.Clone();
    }

    /**
     * Method that return a new object based on the put config
     */
    GetPutConfig = () =>
    {
        return Object.assign({}, this.putConfig);
    }

    /**
     * Method that return a new object based on the post config
     */
    GetPostConfig = () =>
    {
        return Object.assign({}, this.postConfig);
    }

    /**
     * Method that populate the inputs with an existing menu.
     * return a set of inputs with value in them and modify returns
     * a putconfig with the menu id.
     * menu : menu object to bind the inputs to
     * return : array of all the binded inputs
     */
    GetBindedInputs = (data) =>
    {
        let bindedInputs = this.Clone();
        bindedInputs.forEach((input) =>{
            if(data[input.name] !== undefined){
                input.value = data[input.name];

                if(this.ApplyCustomConstraints !== undefined)
                    this.ApplyCustomConstraints(input);
            }
        });
        return bindedInputs;
    }

    /**
     * Method that return a new object based on the put config and
     * assign the elementid property to the parameter id
     * id : id to assign the config to
     * return : the binded put configuration
     */
    GetBindedPutConfig = (id) =>
    {
        let bindedPutConfig = this.GetPutConfig();
        bindedPutConfig.elementId = id;
        return bindedPutConfig;
    }

    GetEmptyEditor = () =>
    {
        return Object.assign({}, this.textEditor);
    }

    GetBindedEditor = (editorValue) =>
    {
        return Object.assign({}, this.textEditor, {value : editorValue});
    }
}
export default FormSchema;