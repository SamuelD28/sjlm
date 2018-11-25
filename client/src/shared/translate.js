let Translate = {};

Translate.PageCategory = function(pageCategory)
{
    let translatedContent;
        switch(pageCategory)
        {
            case "city": translatedContent = "Découvrir la ville"; break;
            case "administration": translatedContent = "Administration"; break;
            case "services": translatedContent = "Les Services"; break;
            case "cultures": translatedContent = "Cultures et loisirs"; break;
            case "finances": translatedContent = "Finances"; break;
            case "news": translatedContent = "Actualitées"; break;
            case "others": translatedContent = "Autres"; break;
            default: translatedContent = "Oops, erreur"; break;
        }
        return translatedContent;
}

Translate.NewsCategory = function(newsCategory)
{
    let translatedContent;
        switch(newsCategory)
        {
            case "events": translatedContent = "Évènements"; break;
            case "activity": translatedContent = "Activitées"; break;
            case "communicate": translatedContent = "Communiqués"; break;
            case "roadwork": translatedContent = "Travaux Routiers"; break;
            case "jobs": translatedContent = "Emploi"; break;
            case "public": translatedContent = "Avis public"; break;
            case "council": translatedContent = "Séances du conseil"; break;
            case "verbal": translatedContent = "Procès-verbaux"; break;
            case "other": translatedContent = "Autres"; break;
            default: translatedContent = "Oops, erreur"; break;
        }
        return translatedContent;
}

Translate.ModelKey = function(modelKey){

    let translatedContent;
    switch(modelKey){
        case "Principal": translatedContent = "Menu principal"; break;
        case "LinkTo": translatedContent = "Lien de navigation"; break;
        case "Icon": translatedContent = "Icon"; break;
        case "SubMenu": translatedContent = "Sous menu"; break;
        case "ParentMenu": translatedContent = "Menu parent"; break;
        case "Title": translatedContent = "Titre"; break;
        default: throw new Error("The key name can't be translated. Verify that a translation exists");
    }
    return translatedContent;
}

Translate.ModelError = function(modelError, modelProperties){
    let translatedContent;
    switch(modelError){
        case "required": translatedContent = "est requis"; break;
        case "minlength": translatedContent = "est inférieur à la limite " + modelProperties.minlength; break;
        case "maxlength": translatedContent = "est supérieur à la limite " + modelProperties.maxlength; break;
        case "ObjectID": translatedContent = " ne correspond pas à un Id existant"; break;
        case "CastError": translatedContent = " ne correspond pas au bon type de valeur"; break;
        default : translatedContent = "Une erreur inconnue est survenue";
    }
    return translatedContent;
}

export default Translate;
