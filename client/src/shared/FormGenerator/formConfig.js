import { Utility } from '../utility.js';

/**
 * Class for handling form interaction with the database
 * and defining certain properties of the form. Properties :
 * title : title displayed in the form header
 * url : url to send the form data to
 * httpRequest : type of httprequest send to the url
 * elementId : id of the current data present in the form
 * used only when we define a form for updating a dataset
 * size : size of the displated form. Used only in case
 * we use a modal form
 * modal : tells if we create a modal form
 * modalOpener : the ui responsible for opening up the modal form
 */
class FormConfig {
    constructor({
        title = "Formulaire",
        url = "",
        httpRequest = "",
        elementId = "",
        size = "small",
        modal = false,
        modalOpener
    } = {}) {
        this.title = title;
        this.url = url;
        this.httpRequest = httpRequest.toLowerCase();
        this.elementId = elementId;
        this.size = size;
        this.modal = modal;
        this.modalOpener = modalOpener;

        //Verify that the properties correspond to the expected.
        Utility.VerifyProperty(this.modalOpener, Function);
        Utility.VerifyProperty(this.url, String);
        Utility.VerifyProperty(this.title, String);
        Utility.VerifyProperty(this.modal, Boolean);
        Utility.VerifyProperty(this.title,
            String,
            Utility.BetweenMaxMinLength, { min: 4, max: 40 });
        Utility.VerifyProperty(this.httpRequest,
            String,
            Utility.IsWithinEnumeration, { enumeration: ['post', 'put', 'delete'] });
        Utility.VerifyProperty(this.size,
            String,
            Utility.IsWithinEnumeration, { enumeration: ['mini', 'tiny', 'small', 'large', 'fullscreen'] });
    }
}

export default FormConfig;
