import {Utility} from '../utility.js';

class FormStatus
{
    //Constructor with optionnal arguments. Initialised all
    //the value that havent received a value to a default one.
    //You need to pass an object with corresponding keyname
    //in order to assign the right value to the properties
    constructor({
        open = false,
        loading = false,
        errors = [],
        errorsHeader = "Les erreurs suivantes sont survenues"} = {})
    {
        this.open = open;
        this.loading = loading;
        this.errors = errors;
        this.errorsHeader = errorsHeader;

        //Veirfy that the properties match a corresponding type
        Utility.VerifyProperty(this.open, Boolean);
        Utility.VerifyProperty(this.loading, Boolean);
        Utility.VerifyProperty(this.errors, Array);
        Utility.VerifyProperty(this.errorsHeader, String);
    }
}

export default FormStatus;