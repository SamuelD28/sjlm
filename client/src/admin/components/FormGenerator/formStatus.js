class FormStatus
{
    constructor({open, loading, errors, errorsHeader})
    {
        this.open = open;
        this.loading = loading;
        this.errors = errors;
        this.errorsHeader = errorsHeader;
    }
}

export default FormStatus;