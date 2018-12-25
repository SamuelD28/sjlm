import {Utility} from '../utility.js';

class FormConfig
{
    //Constructor with optionnal arguments.
    //The arguments get initialised to a default value
    //when nothing is passed to the constructor.
    //You need to pass an object with corresponding keyname
    //in order to set the property to the right value
    constructor({
                title = "Formulaire",
                url = "",
                httpRequest = "",
                elementId= "",
                size = "small",
                modal = false,
                modalOpener} ={})
    {
        this.title = title;
        this.url = url;
        this.httpRequest = httpRequest.toUpperCase();
        this.elementId = elementId;
        this.size = size;
        this.modal = modal;
        this.modalOpener = modalOpener;

        //Verify that the properties correspond to the expected.
        Utility.VerifyProperty(this.modalOpener, Function);
        Utility.VerifyProperty(this.url, String);
        Utility.VerifyProperty(this.title, String);
        Utility.VerifyProperty(this.modal,Boolean);
        Utility.VerifyProperty(this.title,
                                String,
                                Utility.BetweenMaxMinLength,
                                {min : 4, max: 40});
        Utility.VerifyProperty(this.httpRequest,
                                String,
                                Utility.IsWithinEnumeration,
                                {enumeration : ['POST', 'PUT', 'DELETE']});
        Utility.VerifyProperty(this.size,
                                String,
                                Utility.IsWithinEnumeration,
                                {enumeration : ['MINI','TINY','SMALL','LARGE','FULLSCREEN']});
    }
}

export default FormConfig;