class FormConfig
{
    constructor({
                title = "Formulaire",
                url = "",
                httpRequest = "",
                elementId= "",
                size = "small",
                modal = false} ={})
    {
        this.title = title;
        this.url = url;
        this.httpRequest = httpRequest;
        this.elementId = elementId;
        this.size = size;
        this.modal = modal;
    }
}

export default FormConfig;