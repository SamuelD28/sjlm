import FormConfig from './formConfig.js';
import FormStatus from './formStatus.js';

class FormSchema
{
    constructor(inputs, formConfig, formStatus)
    {
        if(formConfig === undefined || formConfig === null)
            this.FormConfig = new FormConfig();
        else
            this.FormConfig = new FormConfig(formConfig);

        if(formStatus === undefined || formStatus === null)
            this.FormStatus = new FormStatus();
        else
            this.FormStatus = new FormStatus(formStatus);

        if(!inputs instanceof Array || inputs === undefined)
            throw new Error("The constructor needs an array for the paramater inputs.");

        this.Inputs = inputs;
    }

    GetFormConfig  = () =>
    {
        return this.FormConfig.GetConfig();
    }
    
    GetFormStatus = () => 
    {
        return this.FormStatus.GetStatus();   
    }

    SetInputsList = (inputs) =>
    {
        if(inputs instanceof Array)
            this.Inputs = inputs;
        else
            throw new Error("You need to pass an Array as a parameter. If you wish to use add only one input use AddInput method");
    }

    AddInput = (input) =>
    {
        //Parse the input before adding it.

        this.Inputs.push(input);
    }

}

export default FormSchema;