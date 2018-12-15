class FormConfig
{
    constructor({title, url, httpRequest, elementId, size, modal})
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