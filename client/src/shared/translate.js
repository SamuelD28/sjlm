let Translate = {};

Translate.PageCategory = function (pageCategory) {
    let translatedContent;
    switch (pageCategory) {
    case "city":
        translatedContent = "Découvrir la ville";
        break;
    case "administration":
        translatedContent = "Administration";
        break;
    case "services":
        translatedContent = "Les Services";
        break;
    case "cultures":
        translatedContent = "Cultures et loisirs";
        break;
    case "finances":
        translatedContent = "Finances";
        break;
    case "news":
        translatedContent = "Actualitées";
        break;
    case "others":
        translatedContent = "Autres";
        break;
    default:
        translatedContent = "Oops, erreur";
        break;
    }
    return translatedContent;
}

Translate.NewsCategory = function (newsCategory) {
    let translatedContent;
    switch (newsCategory) {
    case "events":
        translatedContent = "Évènements";
        break;
    case "activity":
        translatedContent = "Activitées";
        break;
    case "communicate":
        translatedContent = "Communiqués";
        break;
    case "roadwork":
        translatedContent = "Travaux Routiers";
        break;
    case "jobs":
        translatedContent = "Emploi";
        break;
    case "public":
        translatedContent = "Avis public";
        break;
    case "council":
        translatedContent = "Séances du conseil";
        break;
    case "verbal":
        translatedContent = "Procès-verbaux";
        break;
    case "other":
        translatedContent = "Autres";
        break;
    default:
        translatedContent = "Oops, erreur";
        break;
    }
    return translatedContent;
}

Translate.ModelKey = function (modelKey) {

    let translatedContent;
    switch (modelKey) {
    case "Principal":
        translatedContent = "Menu principal";
        break;
    case "LinkTo":
        translatedContent = "Lien de navigation";
        break;
    case "Icon":
        translatedContent = "Icon";
        break;
    case "SubMenu":
        translatedContent = "Sous menu";
        break;
    case "ParentMenu":
        translatedContent = "Menu parent";
        break;
    case "Title":
        translatedContent = "Titre";
        break;
    case "FirstName":
        translatedContent = "Nom";
        break;
    case "LastName":
        translatedContent = "Prénom";
        break;
    case "Email":
        translatedContent = "Email";
        break;
    case "Phone":
        translatedContent = "Téléphone";
        break;
    case "Occupation":
        translatedContent = "Occupation";
        break;
    case "PersonnalNote":
        translatedContent = "Note Personnel";
        break;
    case "Photo":
        translatedContent = "Photo";
        break;
    case "Template":
        translatedContent = "Template";
        break;
    case "PageTitle":
        translatedContent = "Titre";
        break;
    case "PageContent":
        translatedContent = "Contenu";
        break;
    case "PageGallery":
        translatedContent = "Gallerie";
        break;
    case "Important":
        translatedContent = "Importante";
        break;
    case "Category":
        translatedContent = "Categorie";
        break;
    case "DatePublished":
        translatedContent = "Date de publication";
        break;
    case "File":
        translatedContent = "Fichier";
        break;
    case "Description":
        translatedContent = "Description";
        break;
    case "Files":
        translatedContent = "Fichiers";
        break;
    default:
        translatedContent = modelKey + "**" //remove when going in production
    }
    return translatedContent;
}

Translate.ModelError = function (modelError, modelProperties) {
    let translatedContent;
    switch (modelError) {
    case "required":
        translatedContent = "est requis";
        break;
    case "minlength":
        translatedContent = "est inférieur à la limite " + modelProperties.minlength;
        break;
    case "maxlength":
        translatedContent = "est supérieur à la limite " + modelProperties.maxlength;
        break;
    case "ObjectId":
        translatedContent = " ne correspond pas à un Id existant";
        break;
    case "CastError":
        translatedContent = " ne correspond pas au bon type de valeur";
        break;
    default:
        translatedContent = "la validation à échoué";
    }
    return translatedContent;
}

export default Translate;
