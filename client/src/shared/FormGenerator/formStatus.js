class FormStatus
{
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
    }
}

export default FormStatus;