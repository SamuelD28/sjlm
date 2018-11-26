class FormStatus
{
    defaultFormStatus =
    {
        open: false,
        loading : false,
        errors : [],
        errorsHeader : "Les erreurs sont survenues : "
    };

    constructor(formStatus)
    {
        if(formStatus !== undefined && formStatus !== null)
            this.FormStatus = formStatus;
        else
            this.FormStatus = this.defaultFormStatus;

    }

    GetStatus = () =>
    {
        return this.FormStatus;
    }

    SetOpen = (open) =>
    {
        this.FormConfig.open = open;
    }

    SetLoading = (loading) =>
    {
        this.FormConfig.loading = loading;
    }

    SetErrors = (errors) =>
    {
        this.FormConfig.errors = errors;
    }

    FormStatusSetErrorsHeader = (errorsHeader) =>
    {
        this.FormConfig.errorsHeader = errorsHeader;
    }
}

export default FormStatus;