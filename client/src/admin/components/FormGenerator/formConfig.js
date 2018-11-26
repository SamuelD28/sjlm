class FormConfig
{
    defaultFormConfig =
    {
        title : "Formulaire",
        url : null,
        httpRequest : null,
        elementId : null,
        size : "small"
    };

    constructor(formConfig)
    {
        if(formConfig !== undefined && formConfig !== null)
            this.FormConfig = formConfig;
        else
            this.FormConfig = this.defaultFormConfig;

    }

    GetConfig = () =>
    {
        return this.FormConfig;
    }

    SetTitle = (title) =>
    {
        this.FormConfig.title = title;
    }

    SetUrl = (url) =>
    {
        this.FormConfig.url = url;
    }

    SetHttpRequest = (httpRequest) =>
    {
        this.FormConfig.httpRequest = httpRequest;
    }

    SetElementId = (id) =>
    {
        this.FormConfig.elementId = id;
    }

    SetSize = (size) =>
    {
        this.FormConfig.size = size;
    }

}

export default FormConfig;