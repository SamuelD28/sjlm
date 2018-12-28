import { Utility } from '../utility.js';

/**
 * Class used to give the user feedback on the interaction
 * happening inside the form.
 *
 * open : used to open the form if its a modal form
 * openConfirm : used to open the confirm dialog when
 * deleting a dataset
 * loading : used to display that the form is beeing proccessed
 * modified : used to tell the user that the form has been modified
 * errors : list of all the errors that occured when the form was
 * send to the backend server
 */
class FormStatus {
    constructor({
        open = false,
        openConfirm = false,
        loading = false,
        modified = false,
        errors = [],
        errorsHeader = "Les erreurs suivantes sont survenues"
    } = {}) {
        this.open = open;
        this.loading = loading;
        this.errors = errors;
        this.errorsHeader = errorsHeader;
        this.modified = modified;
        this.openConfirm = openConfirm;

        //Veirfy that the properties match a corresponding type
        Utility.VerifyProperty(this.modified, Boolean);
        Utility.VerifyProperty(this.open, Boolean);
        Utility.VerifyProperty(this.loading, Boolean);
        Utility.VerifyProperty(this.errors, Array);
        Utility.VerifyProperty(this.errorsHeader, String);
    }
}

export default FormStatus;
