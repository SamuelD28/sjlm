//----------------Dependencies-------------//

let mongoose    = require("mongoose"),
    News        = require("../api/NewsAPI.js"),
    Members     = require("../api/MembersAPI.js"),
    Pages       = require("../api/PagesAPI.js");

//----------------Initialisation-------------//

let newsData    = [
{
    Title: "Cueillette de Fraise",
    Category: "Activité",
    DatePublished: "2018-07-13",
    DateDue: "2018-07-13",
    Image: "sample2.jpg",
    File: "test.pdf",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat metus sit amet mattis viverra. Sed tempor mollis sodales. Nullam quis finibus turpis. Nulla vulputate dui et erat ullamcorper pretium. Morbi vel justo nec nisl lacinia elementum quis nec sapien. Nullam eleifend tristique laoreet. Etiam maximus tortor eu neque malesuada ultricies. Mauris dignissim, mauris sit amet vestibulum varius, purus justo placerat nulla, sed euismod quam ligula nec ipsum. Suspendisse ut erat fermentum, rutrum felis quis, faucibus nisi. Sed blandit lacus libero, non mollis orci volutpat facilisis. Integer turpis elit, faucibus quis odio non, commodo finibus eros. Duis non pellentesque elit. Nam sit amet lacus sapien. Vivamus tristique volutpat dolor, sed faucibus felis facilisis sed."
},
{
    Title: "Récolte Agricole",
    Category: "Évènement",
    DatePublished: "2018-07-13", 
    DateDue: "2018-09-01",
    Image: "sample1.jpg",
    File: "test.pdf",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat metus sit amet mattis viverra. Sed tempor mollis sodales. Nullam quis finibus turpis. Nulla vulputate dui et erat ullamcorper pretium. Morbi vel justo nec nisl lacinia elementum quis nec sapien. Nullam eleifend tristique laoreet. Etiam maximus tortor eu neque malesuada ultricies. Mauris dignissim, mauris sit amet vestibulum varius, purus justo placerat nulla, sed euismod quam ligula nec ipsum. Suspendisse ut erat fermentum, rutrum felis quis, faucibus nisi. Sed blandit lacus libero, non mollis orci volutpat facilisis. Integer turpis elit, faucibus quis odio non, commodo finibus eros. Duis non pellentesque elit. Nam sit amet lacus sapien. Vivamus tristique volutpat dolor, sed faucibus felis facilisis sed."
},
{
    Title: "Le Jacqueminois de Juillet",
    Category: "Commniqué",
    DatePublished: "2018-07-14",
    DateDue: "2018-08-11",
    Image: "sample3.jpg",
    File: "test.pdf",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat metus sit amet mattis viverra. Sed tempor mollis sodales. Nullam quis finibus turpis. Nulla vulputate dui et erat ullamcorper pretium. Morbi vel justo nec nisl lacinia elementum quis nec sapien. Nullam eleifend tristique laoreet. Etiam maximus tortor eu neque malesuada ultricies. Mauris dignissim, mauris sit amet vestibulum varius, purus justo placerat nulla, sed euismod quam ligula nec ipsum. Suspendisse ut erat fermentum, rutrum felis quis, faucibus nisi. Sed blandit lacus libero, non mollis orci volutpat facilisis. Integer turpis elit, faucibus quis odio non, commodo finibus eros. Duis non pellentesque elit. Nam sit amet lacus sapien. Vivamus tristique volutpat dolor, sed faucibus felis facilisis sed."
},
{
    Title: "Vente de Billet de l'impact",
    Important: true,
    Category: "Évènement",
    DatePublished: "2018-07-15",
    DateDue: "2018-11-02",
    Image: "sample4.jpg",
    File: "test.pdf",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat metus sit amet mattis viverra. Sed tempor mollis sodales. Nullam quis finibus turpis. Nulla vulputate dui et erat ullamcorper pretium. Morbi vel justo nec nisl lacinia elementum quis nec sapien. Nullam eleifend tristique laoreet. Etiam maximus tortor eu neque malesuada ultricies. Mauris dignissim, mauris sit amet vestibulum varius, purus justo placerat nulla, sed euismod quam ligula nec ipsum. Suspendisse ut erat fermentum, rutrum felis quis, faucibus nisi. Sed blandit lacus libero, non mollis orci volutpat facilisis. Integer turpis elit, faucibus quis odio non, commodo finibus eros. Duis non pellentesque elit. Nam sit amet lacus sapien. Vivamus tristique volutpat dolor, sed faucibus felis facilisis sed."
},
{
    Title: "Caravane des cultures",
    Category: "Activité",
    DatePublished: "2018-07-16",
    DateDue: "2018-09-11",
    Image: "sample5.jpg",
    File: "test.pdf",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat metus sit amet mattis viverra. Sed tempor mollis sodales. Nullam quis finibus turpis. Nulla vulputate dui et erat ullamcorper pretium. Morbi vel justo nec nisl lacinia elementum quis nec sapien. Nullam eleifend tristique laoreet. Etiam maximus tortor eu neque malesuada ultricies. Mauris dignissim, mauris sit amet vestibulum varius, purus justo placerat nulla, sed euismod quam ligula nec ipsum. Suspendisse ut erat fermentum, rutrum felis quis, faucibus nisi. Sed blandit lacus libero, non mollis orci volutpat facilisis. Integer turpis elit, faucibus quis odio non, commodo finibus eros. Duis non pellentesque elit. Nam sit amet lacus sapien. Vivamus tristique volutpat dolor, sed faucibus felis facilisis sed."
},
{
    Title: "Festival de musique",
    Category: "Évènement",
    DatePublished: "2018-07-17",
    DateDue: "2018-08-01",
    Image: "sample6.jpg",
    File: "test.pdf",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat metus sit amet mattis viverra. Sed tempor mollis sodales. Nullam quis finibus turpis. Nulla vulputate dui et erat ullamcorper pretium. Morbi vel justo nec nisl lacinia elementum quis nec sapien. Nullam eleifend tristique laoreet. Etiam maximus tortor eu neque malesuada ultricies. Mauris dignissim, mauris sit amet vestibulum varius, purus justo placerat nulla, sed euismod quam ligula nec ipsum. Suspendisse ut erat fermentum, rutrum felis quis, faucibus nisi. Sed blandit lacus libero, non mollis orci volutpat facilisis. Integer turpis elit, faucibus quis odio non, commodo finibus eros. Duis non pellentesque elit. Nam sit amet lacus sapien. Vivamus tristique volutpat dolor, sed faucibus felis facilisis sed."
},
{
    Title: "Inauguration des promenade Le Mineur",
    Category: "Évènement",
    Important: true,
    DatePublished: "2018-07-18",
    DateDue: "2018-07-21",
    Image: "sample7.jpg",
    File: "test.pdf",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat metus sit amet mattis viverra. Sed tempor mollis sodales. Nullam quis finibus turpis. Nulla vulputate dui et erat ullamcorper pretium. Morbi vel justo nec nisl lacinia elementum quis nec sapien. Nullam eleifend tristique laoreet. Etiam maximus tortor eu neque malesuada ultricies. Mauris dignissim, mauris sit amet vestibulum varius, purus justo placerat nulla, sed euismod quam ligula nec ipsum. Suspendisse ut erat fermentum, rutrum felis quis, faucibus nisi. Sed blandit lacus libero, non mollis orci volutpat facilisis. Integer turpis elit, faucibus quis odio non, commodo finibus eros. Duis non pellentesque elit. Nam sit amet lacus sapien. Vivamus tristique volutpat dolor, sed faucibus felis facilisis sed."
},
{
    Title: "Ouverture de la saison de la chasse",
    Category: "Évènement",
    DateDue: "2018-12-19",
    Image: "sample8.jpg",
    File: "test.pdf",
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas feugiat metus sit amet mattis viverra. Sed tempor mollis sodales. Nullam quis finibus turpis. Nulla vulputate dui et erat ullamcorper pretium. Morbi vel justo nec nisl lacinia elementum quis nec sapien. Nullam eleifend tristique laoreet. Etiam maximus tortor eu neque malesuada ultricies. Mauris dignissim, mauris sit amet vestibulum varius, purus justo placerat nulla, sed euismod quam ligula nec ipsum. Suspendisse ut erat fermentum, rutrum felis quis, faucibus nisi. Sed blandit lacus libero, non mollis orci volutpat facilisis. Integer turpis elit, faucibus quis odio non, commodo finibus eros. Duis non pellentesque elit. Nam sit amet lacus sapien. Vivamus tristique volutpat dolor, sed faucibus felis facilisis sed."
}
];
let membersData = [
{
    FirstName: "Normand",
    LastName: "Dyotte",
    Photo: "people1.jpg",
    Occupation: "Maire",
    PersonnalNote: "Vivre à Candiac est un véritable bonheur… De plus, en tant que maire, avoir l’opportunité de contribuer au développement de la municipalité et au bien-être de la collectivité tout en répondant aux attentes des citoyens est source de grande fierté. Planifier l’avenir de la ville en y intégrant des valeurs qui me tiennent à cœur comme la famille, le développement durable, l’entraide et le transport collectif représente un privilège. Ainsi, je remercie tous les citoyens pour la confiance qu’ils me témoignent.",
    Email: "mairie@ville.candiac.qc.ca",
    Phone: "450 444-6000"
},
{
    FirstName: "Mélanie",
    LastName: "Roldan",
    Photo: "people2.jpg",
    Occupation: "Conseillère municipale",
    PersonnalNote: "Vivre à Candiac est un véritable bonheur… De plus, en tant que maire, avoir l’opportunité de contribuer au développement de la municipalité et au bien-être de la collectivité tout en répondant aux attentes des citoyens est source de grande fierté. Planifier l’avenir de la ville en y intégrant des valeurs qui me tiennent à cœur comme la famille, le développement durable, l’entraide et le transport collectif représente un privilège. Ainsi, je remercie tous les citoyens pour la confiance qu’ils me témoignent.",
    Email: "mroldan@ville.candiac.qc.ca",
    Phone: "450 444-6000"
},
{
    FirstName: "Vincent",
    LastName: "Chatel",
    Photo: "people3.jpg",
    Occupation: "Conseiller municipal",
    PersonnalNote: "Vivre à Candiac est un véritable bonheur… De plus, en tant que maire, avoir l’opportunité de contribuer au développement de la municipalité et au bien-être de la collectivité tout en répondant aux attentes des citoyens est source de grande fierté. Planifier l’avenir de la ville en y intégrant des valeurs qui me tiennent à cœur comme la famille, le développement durable, l’entraide et le transport collectif représente un privilège. Ainsi, je remercie tous les citoyens pour la confiance qu’ils me témoignent.",
    Email: "vchatel@ville.candiac.qc.ca",
    Phone: "450 444-6000"
},
{
    FirstName: "Kevin",
    LastName: "Vocino",
    Photo: "people4.jpg",
    Occupation: "Conseiller municipal",
    PersonnalNote: "Vivre à Candiac est un véritable bonheur… De plus, en tant que maire, avoir l’opportunité de contribuer au développement de la municipalité et au bien-être de la collectivité tout en répondant aux attentes des citoyens est source de grande fierté. Planifier l’avenir de la ville en y intégrant des valeurs qui me tiennent à cœur comme la famille, le développement durable, l’entraide et le transport collectif représente un privilège. Ainsi, je remercie tous les citoyens pour la confiance qu’ils me témoignent.",
    Email: "kvocino@ville.candiac.qc.ca",
    Phone: "450 444-6000"
},
];
let pagesData   = [
{
    Banner: "sample1.jpg",
    PageTitle: "LA MUNICIPALITÉ",
    PageContent: "Nous vous invitons à découvrir d’où vient notre appellation. Qui était Saint Jacques le Mineur. ''Saint Jacques apôtre'', est appelé Jacques d’Alphée, c’est-à-dire fils d’Alphée, frère du Seigneur, Jacques le Mineur et Jacques le Juste. Telles sont les origines du nom de notre communauté. Parcourez ensuite les textes relatant l’histoire et les origines de notre fondation sous le système seigneurial de l’an 1834. Puis, reportez-vous en 1873 et revivez l’atmosphère de l’époque dans notre paroisse. Si vous désirez en savoir plus sur les origines de notre belle municipalité; ses curés, ses églises et leurs difficultés d’implantation, les cimetières, les croix de chemin, la très belle chapelle reposoir, la vie municipale de l’époque avec ses écoles, ses chemins et montées. La vie scolaire, la vie d’autrefois avec une multitude de merveilleuses photos relatant les pratiques d’antan, l’architecture québécoise des années 1750-1825, des années 1800-1900, les maisons de la fin du 19e siècle et du début du 20e siècle, et plus encore sur la vie des familles fondatrices de Saint-Jacques-le-Mineur, nous vous invitons à vous procurer le très beau livre publié lors du 150ième anniversaire de fondation de la municipalité. ‘’ En hommage aux familles d’hier à celles d’aujourd’hui et à celles de demain’’."
},
{
    Banner: "sample1.jpg",
    PageTitle: "HISTORIQUE",
    PageContent: `LES ORIGINES
                    Les limites du territoire actuel de Saint-Jacques-le-Mineur se sont définies entre 1834 et 1856. En septembre 1832, une partie des habitants de la Côte St-Marc, St-André et Ste-Marguerite-de-Blairfindie (L’acadie) font part dans une requête, de leur désir d’être érigés en nouvelle paroise. Mgr Signay, évêque de Québec (l’évêché de Montréal n’existera qu’à partir de 1836), leur accorde ce privilège le 26 novembre 1834 après s’être assuré qu’il y avait assez de propriétaires pour bâtir une église et faire vivre un curé.
                    Depuis quand y avait-il des gens établis sur ces terres? Pour essayer de trouver une réponse à cette question, nous avons cherché du côté de L’Acadie et de St-Philippe, d’où arrivèrent les premiers habitants. Faute de documentations précises consultées nous ne pouvons que présumer de certains faits.
                    Du côté de St-Philippe, les premières concessions accordées à la Côte St-André, St-Jacques et St-Marc (parties desquelles St-Jacques sera constitué) se situent vers 1750. Le peuplement naturel se fait souvent en suivant un cours d’eau. On peut en conclure que le long de la rivière St-Jacques, les premiers habitants de ce que sera le territoire de Saint-Jacques-le-Mineur arrivèrent vers la fin du 18e siècle.
                    LE SYSTÈME SEIGNEURIAL 
                    En 1834, le régime seigneurial est toujours en vigueur. Il avait été instauré dès les premiers temps de la colonie pour favoriser le peuplement de la Nouvelle-France. On concédait des territoires plus ou moins grands à des seigneurs qui, eux, avaient l’obligation de céder des lopins à tous ceux qui en faisaient la demande. Les paysans ne déboursaient aucune somme d’argent. Ils avaient cependant certaines obligations envers leur seigneur : les cens (impôt plutôt symbolique), les rentes, certaines taxes, etc… et le devoir de lui fournir quelques jours de travail gratuit (la corvée). Contrairement au paysan français, le paysan canadien-français est un homme libre qui possède sa terre. Après la conquête de 1760, le régime est contesté par les nouveaux colons et marchands anglais surtout, qui veulent son abolition. On en arrive, en 1854, à un compromis : tous les droits des seigneurs sont réduits à une seule rente, payable une fois l’an et rachetable. Cependant, la plupart des paysans ne purent la racheter et choisirent de payer cette rente annuelle.
                    QUELQUES STATISTIQUES PAROISSIALES 
                    En 1840, première année de l’ouverture des registres paroissiaux, on dénombre 47 baptêmes, 6 mariages et 21 sépultures à St-Jacques-le-Mineur. En 1880, on en est rendu à 3 367 baptêmes, 559 mariages et 1 266 sépultures; pour 1936, les chiffres sont de 5 577 baptêmes, 996 mariages et 2 574 sépultures. Finalement, pour donner des chiffres plus récents, en 1973, on retrouve 6 352 baptêmes, 1279 mariages et 3 040 sépultures, toujours depuis 1840.
                    Sans avoir fait d’études approfondies, nous nous permettons simplement quelques constatations démographiques sur l’évolution de la population de Saint-Jacques-le-Mineur. À la fondation, on compte 1600 âmes. Deux ans après la fin des annexions, soit en 1860, on retrouve 2 090 âmes. Par la suite, la population décroît presque continuellement, sauf pour une courte période, et parfois même de façon dramatique, comme en fait foi le tableau qui suit :
                    Comme partout dans le Québec, la période 1860 à 1930 est marquée par un exode massif de la population canadienne-française vers les Etats-Unis et les villes. La paroisse de Saint-Jacques-le-Mineur n’échappe pas à cette vague. Toutefois, on constate dans les derniers chiffres une remontée sensible due en grande partie à l’arrivée de nouveaux venus recherchant très souvent le calme et la paix de la vie à la campagne.

                    Le curé qui recensait sa paroisse y allait parfois de ses commentaires et ne se contentait pas toujours d’une énumération des résidants. En voici deux exemples tirés des archives paroissiales :
                    
                    Recensement de 1900 – dans toute la paroisse 
                    244 feux -1420 âmes - 714 hommes - 706 femmes - 947 communiants - 473 non communiants - 17 veufs - 39 veuves et 1 femme séparée de son mari – 200 couples mariés - 142 garçons et 115 filles de 15 à 30 ans - 26 garçons et 43 filles de 30 à 60 ans - 9 familles arrivées depuis 1 an et 9 familles parties - 1 garçon et une fille de plus de 14 ans n’ont pas encore communié - 5 idiots et 3 muets - 3 croix dans la paroisse.
                    D’OÙ PROVIENT LE NOM ST-JACQUES
                    Saint Jacques, dit le Mineur , fils d’Alphée et frère de Jude, originaire de Nazareth, était un parent du Seigneur et fut le premier évêque de Jérusalem, à la demande expresse de Jésus si l’on en croit saint Jérôme et saint Epiphane. On le nomme frère du Seigneur parce qu’il lui ressemblait au point que beaucoup les prenaient l’un pour l’autre en les voyant. Ce fut pour cela que lorsque les Juifs vinrent se saisir de J.-C., de peur de prendre Jacques à sa place, Judas, (39) qui vivant avec eux savait les distinguer, leur donna pour signal le baiser.
                    On l’appelle encore Jacques le mineur, pour le distinguer de Jacques le majeur, fils de Zébédée; car quoique Jacques de Zébédée eût été plus âgé, il fut cependant appelé après lui. De là vient la coutume qui s’observe dans la plupart des maisons religieuses que celui qui vient le premier s’appelle minor, et celui qui vient le dernier s’appelle major, quand bien même celui-ci serait plus ancien d’âge ou plus digne par sa sainteté. On l’appelle aussi Jacques le Juste à cause du mérite de son excellentissime sainteté; car, d’après saint Jérôme, il fut en telle révérence et sainteté au peuple, que c’était à qui pourrait toucher le bord de son vêtement.
                    Il fut favorisé d’une apparition spéciale du Sauveur réssuscité dont saint Paul se fait l’écho, et dans laquelle, selon saint Clément d’Alexandrie, lui fut communiqué de manière particulière le don de science.
                    Évêque de Jérusalem, il jouit d’un prestige particulier et d’une autorité considérable : c’est à lui que saint Pierre veut que l’on annonce d’abord sa délivrance; c’est lui qui contrôle la doctrine et la mission de Paul; c’est lui qui au conseil de Jérusalem, résume le discours de Pierre et règle ce qui doit être observé lors de la conversion des paiens; c’est encore chez lui que Paul, lors de son dernier voyage à Jérusalem, rend compte de sa mission. Il est enfin l’auteur d’épître de Saint Jacques.
                    Source : Livre du 150e anniversaire de Saint-Jacques-le-Mineur,1983`
},
{
    Banner: "sample1.jpg",
    PageTitle: "ÉLUS ET ADMINISTRATION",
    PageContent: `Les municipalités disposent de pouvoirs qui leur sont délégués en vertu des lois adoptées par l’Assemblée nationale du Québec pour répondre aux besoins de leur population. Les principales compétences qui leur sont conférées concernent l’urbanisme, le zonage, le réseau routier local, l’eau potable et l’assainissement des eaux usées, la gestion des matières résiduelles, le développement communautaire et culturel, la cour municipale, l’habitation et le logement social, la police et la protection des incendies et les mesures d’urgence. Elles peuvent aussi intervenir dans plusieurs autres domaines tels la culture, les loisirs, les activités communautaires, les parcs et le développement économique local entre autres.
                  Nous vous invitons à découvrir les milles et uns aspects de la vie municipale. Vous retrouverez dans cette section les règlements municipaux, les avis publics, les procès-verbaux, le bottin des employés. Les membres du conseil municipal vous y sont présentés et le calendrier des séances du conseil est indiqué. C’est votre municipalité apprenez à la connaître.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "MOT DE LA MAIRESSE",
    PageContent: `C’est avec une grande fierté que je vous souhaite la bienvenue sur le site de la municipalité de Saint-Jacques-le-Mineur et vous convie à y faire une visite virtuelle ! 
                Le site regroupe une foule d’informations tant sur notre histoire que sur notre structure organisationnelle et politique actuelle. Il présente également les différents services que nous offrons aux Jacqueminois et Jacqueminoises ; notre programmation culturelle, sportive et de loisirs ; les différents comités actifs sur notre territoire ; le bottin de nos entreprises et artisans locaux. Vous y trouverez également des informations ponctuelles d’intérêt général.
                J’espère que vous y trouverez réponse à toutes vos questions, mais si ce n’était pas le cas, n’hésitez pas à nous contacter par courriel à info@sjlm.ca ou par téléphone au 450-347-5446.
                Cordialement, 
                Lise Sauriol
                Mairesse`
},
{
    Banner: "sample1.jpg",
    PageTitle: "CONSEIL MUNICIPAL",
    PageContent: `Le conseil municipal représente la population et prend les décisions sur les orientations et les priorités d’action de la municipalité. Il doit s’assurer que les services offerts dans la municipalité répondent aux besoins de la communauté.
                    La séance du conseil municipal est par excellence un exercice de démocratie municipale. Les élus prennent les décisions sous la forme de résolutions ou de règlements qu’ils adoptent lors d’une telle séance.
                    Le conseil assume les pouvoirs et les devoirs dévolus par les principales lois, soit la Loi sur les cités et ville ou pour nous le Code municipal du Québec, de même que par certaines lois connexes. De plus, le Code civil du Québec fait en sorte que les élus doivent respecter les obligations que les lois, leur charte ou les règlements leur imposent. Ils doivent agir dans les limites des pouvoirs qui leur sont conférés. Ils doivent également agir avec prudence et diligence, honnêteté et intégrité.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "SÉANCE DU CONSEIL",
    PageContent: `La séance du conseil est le moment où se prend les décisions. Toutes les séances, ordinaires ou extraordinaires, sont publiques. Les citoyens et les citoyennes peuvent donc y assister pour connaître les décisions et les orientations prises par les élus. Une séance ordinaire doit être tenue à tous les mois selon le calendrier préétabli. Les séances extraordinaires, quant à elles, sont convoquées au besoin lorsqu’une décision du conseil est nécessaire avant la prochaine séance ordinaire.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "BUDGET ANNUEL",
    PageContent: `Le budget annuel de la Municipalité de Saint-Jacques-le-Mineur est adopté par le conseil municipal lors d’une séance extraordinaire à tous les ans à la mi-décembre.
                    En vertu des lois, les municipalités ont l’obligation de présenter un budget équilibré, c’est-à-dire que les revenus doivent être au moins égaux aux dépenses prévues au budget. Le budget annuel, dont la principale source de revenus est issue des taxes municipales, permet à la municipalité d’absorber les coûts des services offerts aux contribuables.
                    Le rôle d’évaluation
                    Un des outils dont dispose la municipalité pour préparer le budget est le rôle d’évaluation. En effet, le prélèvement des taxes constitue la principale source de recettes de la municipalité et il est basé en majeure partie sur l’évaluation foncière municipale. Le rôle est également un outil de gestion et de planification puisqu’il contient des données sur le parc immobilier de la municipalité.
                    Le conseil municipal n’a pas à approuver le rôle d’évaluation. De plus, afin d’en préserver l’intégrité, la municipalité ne peut déposer une demande de révision à l’égard d’un bien qui n’est pas inscrit au rôle à son nom à moins que cette demande ne soit fondée sur une question de droit.
                    Il revient au contribuable que s’estime lésé de contester une inscription au rôle en déposant une demande de révision administrative auprès de la municipalité ou de l’organisme municipal responsable de l’évaluation. Si la révision administrative n’a pas permis de résoudre le litige, un recours peut être exercé devant le Tribunal administratif du Québec.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "LOI SUR L’ACCÈS À L’INFORMATION",
    PageContent: `Accès à l’information
                    L’accès aux documents de la Municipalité permet aux citoyens de consulter les procès-verbaux des réunions du conseil, les livres de comptes, les pièces justificatives de même que tous les documents faisant partie des archives de la Municipalité.
                    Les municipalités sont soumises aux dispositions de la Loi sur l’accès aux documents des organismes publics et sur la protection des renseignements personnels. Elle rend accessible au public des documents détenus par les municipalités. Par contre, il existe certaines exceptions à la règle de l’accessibilité qui doivent être appliquées par le responsable de l’accès aux documents de la municipalité.
                    Une demande d’accès à l’information doit être faite par écrit auprès de la personne responsable et contenir suffisamment de détails sur la nature de la demande et les coordonnées du requérant. La municipalité bénéficie d’un délai de vingt jours de la réception de la demande pour l’étudier, déterminer si les informations demandées sont accessibles au public et transmettre la réponse au requérant. En cas d’impossibilité de répondre dans les délais prévus, un délai supplémentaire de dix jours est accordé à la municipalité sur avis écrit envoyé au requérant.
                    La consultation des documents est gratuite sous réserve des coûts engendrés pour la transmission, la reproduction ou la transcription des documents requis. En cas de refus de la municipalité de permettre l’accès aux documents requis, une demande de révision peut être formulée à la Commission d’accès à l’information.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "TAXES ET ÉVALUATIONS FONCIÈRES",
    PageContent: `Le rôle d’évaluation
                    Le rôle d’évaluation foncière est un résumé de l’inventaire des immeubles situés sur le territoire de la municipalité, évalués sur une même base et à une même date. En vigueur pour trois exercices financiers municipaux consécutifs, il sert principalement à indiquer la valeur de ces immeubles aux fins des taxations foncière municipale et scolaire. Le rôle d’évaluation foncière et une pièce majeure de l’information dont dispose le conseil pour préparer le budget. En effet, le prélèvement des taxes, qui constitue la principale source de recettes des municipalités, est basé en majeure partie sur l’évaluation foncière municipale.
                    Le régime d’impôt foncier à taux variés
                    Le régime d’impôt foncier à taux variés autorise les municipalités à fixer plusieurs taux de taxe foncière générale en fonction des catégories d’immeubles auxquelles appartiennent les unités d’évaluation. Le régime permet également aux municipalités d’imposer aux immeubles non résidentiels et aux terrains vagues desservis un taux de taxe foncière générale qui est supérieur au taux de base, même dans le cas où aucun transfert fiscal n’est appréhendé. Les municipalités peuvent fixer jusqu’à six taux de taxe foncière générale, selon les catégories d’immeubles suivantes :
                    La catégorie des immeubles non résidentiels;
                    La catégorie des immeubles industriels;
                    La catégorie des immeubles de six logements ou plus;
                    La catégorie des terrains vagues desservis par les services d’aqueduc et d’égout;
                    La catégorie des immeubles agricoles;
                    La catégorie résiduelle (taux de base).
                    Cliquez ici pour consulter:
                    Règlement pour fixer le taux de taxe municipale et les conditions de perception de l'exercice 2018
                    Paiement en quatre versements
                    Pour acquitter votre compte de taxes, la Municipalité de Saint-Jacques-le-Mineur a opté pour le mode de quatre (4) versements. Les quatre échéances ont été suffisamment distancées pour en faciliter les paiements. Les échéances pour l’année sont: DATES POUR L'ANNÉE 2018
                    Premier paiement :   15 mars 2018
                    Deuxième paiement :  10 mai 2018
                    Troisième paiement :  12 juillet 2018
                    Quatrième paiement : 13 septembre 2018
                    En respectant ces échéances, on évite de payer des intérêts.
                    Note aux professionnels
                    Afin d'améliorer les services offerts par la Municipalité, le rôle d'évaluation est maintenant disponible en ligne pour votre consultation. Il s'agit d'un guichet unique centré sur l'unité d'évaluation qui vous permet de consulter certaines informations contenues dans le rôle d'évaluation.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "TRAVAUX PUBLICS ET URBANISME",
    PageContent: `Le Conseil de ville, la direction et les employés de la municipalité travaillent quotidiennement à offrir un environnement sain et une qualité de vie aux citoyens; à leur dispenser toute une gamme de services; et à répondre à leurs besoins dans des sphères d’activité très variées:
                Environnement : collecte des ordures et recyclage, écocentre, récupération de piles etc.
                Urbanisme : permis, certificats, demandes de dérogations mineures etc.
                Service de Sécurité Incendie et Premiers répondants : permis pour feux à ciel ouvert, sécurité publique, activités communautaires.
                Publications : communiqués et journal municipal Le Jacqueminois et Le Jacqueminois Ami des Aînés (JADA)
                Locations de salles : pour fêtes familiales, mariages, etc.
                Mariages et unions civiles : la mairesse et le directeur général possèdent les qualifications et autorisations requises pour agir comme célébrants pour des mariages et des unions civiles.
                Loisirs, culture et fêtes :  toute une gamme d’activités est proposée à chaque saison
                Bibliothèque : prêts de livres, livres numériques, trousses et activités organisées par des bénévoles`
},
{
    Banner: "sample1.jpg",
    PageTitle: "SERVICES PUBLICS",
    PageContent: `Animal errant, perdu ou trouvé
                    Déneigement
                    Animal errant, perdu ou trouvé
                    Si vous apercevez un animal domestique errant, avez perdu votre animal ou en avez trouvé un, communiquez avec :
                    Services Animaliers A.M.R.
                    47, St-Pierre,
                    Saint-Constant, Qc
                    Téléphone: 450-638-9698 ou 514-875-4690
                    Site web: www.refugeamr.com
                    Déneigement
                    Le stationnement de nuit est interdit sur tout le territoire de Saint-Jacques-le-Mineur, et ce, du 15 novembre au 15 avril; de 00h00 à 6h00.
                    Votre véhicule a été remorqué, contactez le service de police au 450-245-0666.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "Permis",
    PageContent: `Faire une demande
                    Voici les formulaires de demande de permis à remplir pour l'obtention d'un permis.
                    Demande de permis général et certificat - Télécharger le formulaire   PDF
                    Branchement privé à l'aqueduc et aux égouts - Télécharger le formulaire     PDF
                    Il suffit de compléter le formulaire approprié et de le retourner, en personne, par courriel ou par télécopie au Service de l’urbanisme :
                    Adresse : 91, rue Principale Saint-Jacques-le-Mineur, Qc J0J 1Z0
                    Courriel : amenagement@sjlm.ca
                    Télécopie : 450-347-5754
                    Un suivi sera fait auprès de vous rapidement, soit par courriel ou par téléphone. Si des documents complémentaires sont requis nous vous en aviserons. Il est également possible de communiquer directement avec le Service de l’urbanisme au (450) 347-5446 #203, pour parler à notre préposée.
                    Tarifs applicables: PDF
                    Le paiement de votre permis peut se faire sur place, au bureau municipal (argent comptant ou chèque), ou encore par courrier, en expédiant un chèque à l’ordre de :
                    Municipalité Saint-Jacques-le-Mineur
                    91, rue Principale
                    Saint-Jacques-le-Mineur (Qc)
                    J0J 1Z0
                    IMPORTANT : Il est impératif de vérifier auprès du Service de l’urbanisme de la municipalité si les travaux que vous envisagez sont réglementaires ou nécessitent l’octroi d’un permis.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "DÉVELOPPEMENT COMMERCIAL",
    PageContent: `Saint-Jacques-le-Mineur est composé de deux périmètres urbains distincts dont les vocations sont totalement différentes. Un premier qui englobe le village avec sa vision locale et de proximité. Nous espérons y voir se développer dans un avenir prochain une vie commerciale proche du citoyen. L’architecture québécoise est chez nous représentée par différents styles de maisons. Il y aurait certainement une de ces belles propriétés qui pourrait être transformée en B & B prête à accueillir les visiteurs pour une nuitée ou deux. Une autre pourrait se développer en épicerie locale, genre marché général ou en boutique pour vendre nos fabuleux produits locaux. Les opportunités sont grandes. Vous avez un projet; venez nous rencontrer.
                  Notre second périmètre urbain est établi à la sortie 21 de l’autoroute 15. Il s’inscrit dans un rayonnement régional et est désigné pôle économique pour son affectation de commerce lourd. Sa localisation de proximité avec l’autoroute 15 et sa position géographique de 29 kilomètres de l’entrée au Canada des visiteurs venant des États américains font de ce périmètre un choix des plus intéressant pour tout investisseur. Vous désirez implanter une entreprise, les portes de l’hôtel de ville vous sont grandes ouvertes. Venez en discuter avec nous.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "ÉDUCATION",
    PageContent: `École Saint-Jacques
        115, rue Renaud, Saint-Jacques-le-Mineur, J0J 1Z0
        Téléphone : 450-347-4400
        Télécopie : 450-347-4228
        EpStJacquesMineur@csdhr.qc.ca
        Gino Jean, directeur
        Nathalie Beauchemin, secrétaire d’école
        Ève Picotin, responsable du service de garde`
},
{
    Banner: "sample1.jpg",
    PageTitle: "PRÉVENTION ET SÉCURITÉ",
    PageContent: `Service de protection des incendies de la municipalité de Saint-Jacques-le-Mineur
La mission du service de sécurité incendie s’inscrit dans les responsabilités dévolues à une municipalité en matière de protection de ses citoyens.

Les principaux objectifs du service sont:

Assurer aux citoyens du territoire de la municipalité la protection des personnes et des biens contre les incendies de toute nature ainsi que l’organisation des sauvetages lors de sinistres, l’organisation de secours aux victimes d’accidents, des secours à la personne sinistrée ainsi que leur évacuation d’urgence. Assurer la protection de leur vie, de leur santé ainsi que celle de leur patrimoine.

Prévenir des sinistres et des catastrophes par l’élaboration du schéma de risques d’incendie et des autres sinistres, par l’information, la formation, l’élaboration et l’application des règlements municipaux. Rechercher le point d’origine, les causes probables et les circonstances d’un incendie.

Le service de sécurité incendie de Saint-Jacques-le-Mineur existe depuis 1984. Des pompiers à temps partiel sont responsables de son bon fonctionnement.

Quand faire appel au service de protection des incendies?

Saviez-vous que l’on peut faire appel aux pompiers pour d’autres raisons qu’éteindre un feu? Ces spécialistes de l’intervention, de la prévention des incendies et de la sécurité civile sont là pour être au service des citoyens.

Voici donc les services offerts aux citoyens de la municipalité de Saint-Jacques-le-Mineur par le service de protection des incendies :

Incendie de bâtiment
Système d’alarme en opération ou leur rétablissement
Délivrance de permis de brûlage (branches, brindilles)
Feu de champ, feu d’herbe, feu de broussailles
Feu de déchets
Feu à ciel ouvert qui risque d’indisposer le voisinage par la fumée (feu de foyer conforme ou non-conforme)
Accident de la route et feu de véhicule
Désincarcération de victimes lors d’accident automobile
Fuite de liquide au sol (essences, huile à moteur, prestone)
Intervention en présence de matières dangereuses ou toutes autres odeurs suspectes
Intervention lors de dégât d’eau et d’inondation
Sauvetage de personnes prises sur un toit, dans un échafaud
Structure dangereuse
Toutes autres requêtes d’assistance aux citoyens (craintes, vérification)
Danger ou crainte électrique
Assitance dans les évènements pyrotechniques
Assistance aux ambulanciers
Assistance aux policiers
Vérification
Visite de caserne par les citoyens (famille, école, camp de jour)
Application des règlements et émission de contravention
Prévention domiciliaire (détecteur de fumée, évaluation de potentiel d’incendie, sorties d’urgence)
Directeur du service incendie de Saint-Jacques-le-Mineur
Danny Deragon

Coordonnées :
Caserne #33
93, rue Principale Saint-Jacques-le-Mineur, Qc, J0J 1Z0
Urgence : 911
Renseignements généraux : 450-347-5446 #350

Service de premiers répondants
Saint-Jacques-le-Mineur fait partie des municipalités pionnières en soins pré-hospitaliers d’urgence. La municipalité a en effet été l’une des premières qui a instauré en 1988 un service de premiers répondants qui répondent aux urgences médicales déterminées par la Centrale Alerte Santé (911) et ce en attendant l’arrivée des techniciens ambulanciers.

Les premiers répondants membres du services ont suivi une formation rigoureuse de 60 heures qui comprend la réanimation cardio-respiratoire, les traumatismes (accident, chute, etc.), les AVC, convulsions, hémorragies, difficultés respiratoires, intoxications, etc.

Dans 40 à 60% des cas, les services ambulanciers mettent plus de 8 minutes à répondre. C’est dans ce type de situation que les premiers répondants font toute la différence.

En effet, dans les situations où une intervention d’urgence pourrait éviter un décès, on enregistre 5 fois moins de décès dans les territoires où sont présents les premiers répondants.

Lorsqu’une personne doit être transportée rapidement à l’hôpital suite à un accident ou à une maladie, le temps d’intervention des premiers secours fera souvent la différence entre la vie et la mort pour cet individu.

Les premiers répondants de Saint-Jacques-le-Mineur offrent différents services :

Soins pré-hospitaliers d’urgence;
Soutien aux services d’urgence et de sécurité incendie;
Aide humanitaire;
Autres demandes pertinentes.
Renseignements généraux : 450-347-5446 #300
Directeur du service
Kevin Henderson

Coordonnées : 93, rue Principale, Saint-Jacques-le-Mineur, Qc, J0J 1Z0
Urgence : 911
incendie@sjlm.ca

Service de police : Sûreté du Québec
Poste de la MRC des Jardins-de-Napierville
522, rue Saint-Jacques
C.P. 1128
Napierville J0J 1L0
Urgence : 911 ou 310-4141
Renseignements généraux : 450-245-0666`
},
{
    Banner: "sample1.jpg",
    PageTitle: "RÈGLEMENTS MUNICIPAUX",
    PageContent: `Le conseil d’une municipalité ne peut adopter des règlements que sur les sujets que la loi lui permet de réglementer. Le règlement est la décision du conseil qui fixe des règles relatives à une question d’ordre général. Contrairement à l’adoption de la résolution, l’adoption du règlement est soumise à des formalités fixées par la loi. Notamment, le règlement devra être précédé d’un avis de motion et être publié. Enfin, certains règlements sont également soumis à l’approbation des citoyens, ou d’une partie de ceux-ci, ou encore à l’approbation du gouvernement, du Ministre des Affaires municipales, des Régions et de l’Occupation du territoire, ou enfin à l’approbation d’un autre ministre ou organisme.
                C’est la loi qui prévoit les cas où le conseil doit procéder par règlement et non par résolution.
                Vous trouverez plus bas une brève description de certains de nos règlements municipaux. Nous n’avons retenu que ceux que nous jugeons les plus utiles à connaître sur une base très générale. N’hésitez pas à contacter nos services aménagement et urbanisme pour en connaître davantage sur ces règlements et les autres en vigueur sur notre territoire.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "ENVIRONNEMENT",
    PageContent: `L’un des grands défis pour la municipalité est de gérer de façon responsable les matières résiduelles produites sur notre territoire. L’élimination complète des déchets a longtemps été l’unique façon d’en disposer. De nos jours, la notion de gestion des matières résiduelles va bien au-delà de l’enfouissement et de l’incinération.
                En matière de gestion des matières résiduelles, les 3RV… vous connaissez?
                Il s’agit de Réduire à la source, de favoriser le Réemploi, de Recycler et de Valoriser les déchets que l’on appelle désormais les ‘’ matières résiduelles’’.
                Le premier R : Réduire à la source
                Le meilleur moyen de lutter contre le '' trop plein'' de déchets est de Réduire à la source. C’est le plus important des 3 ''R'' puisqu’il agit à titre préventif… le déchet le moins polluant et le plus facile à ''gérer'' n’est-il pas celui que l’on ne produit pas? De façon générale, nous réduisons le gaspillage en évitant d’acheter ou d’utiliser des produits jetables, suremballés ou présentés en portions individuelles.
                Le deuxième R : Le Réemploi
                Un autre moyen de diminuer la quantité de déchets produit est de réutiliser au maximum. Vous n’en voulez plus? Donner-les à ceux qui pourraient en avoir besoin. ‘’ Les résidus des uns font le bonheur des autres’’.
                Le troisième R : Recyclés et le V : Valoriser les déchets
                Abandonnés, ce sont des déchets. Recyclés, ce sont des ressources inestimables. La récupération et le recyclage de contenants, d’emballages, de matières ou de produits ainsi que leur valorisation dans une perspective de conservation des ressources tels sont les objectifs de la politique environnementale. Son principe général étant de gérer ses activités de façon responsable et en conformité avec les principes du développement durable.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "MATIÈRES RÉSIDUELLES",
    PageContent: `Collecte pêle-mêle des matières recyclables et bac admissible
                À compter du 15 octobre 2012, toutes les matières recyclables pourront être mélangées ensemble dans votre bac de recyclage. Verre, papier, plastique, carton et métal peuvent être déposés d’un côté du bac comme de l’autre. Toutes les matières doivent être à l’intérieur du bac car le camion mécanisé ne permet pas une collecte manuelle des matières qui seraient dans un sac ou une boîte à côté du bac.
                Seul le bac roulant, avec ou sans séparation, de 360 litres fournis par la Municipalité est autorisé pour la collecte.
                Retour au haut de la page
                Pourquoi des bacs identifiés au logo de la municipalité?
                En 2008, la municipalité de Saint-Jacques-le-Mineur a distribué à chaque résidence un bac de recyclage de 360 litres. Ce bac est rattaché à la résidence et non à la personne, il doit rester sur place lors des déménagements. Tous les propriétaires de nouvelle construction principale doivent appeler la municipalité pour recevoir gratuitement son bac roulant bleu identifié aux armoiries de Saint-Jacques-le-Mineur.
                Les sacs, les boîtes de carton et les petits bacs bleus déposés à côté de votre bac ne seront pas ramassés. En conclusion, seulement les matières à l’intérieur du bac roulant fourni par la municipalité seront ramassées.
                Vous pouvez vous procurer un second bac au coût de 100$ auprès de la municipalité.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "RECYCLER LES VIEUX ÉLECTRONIQUES",
    PageContent: `Pourquoi les produits électroniques doivent être recyclés?
                Comme les boîtes de conserve et les journaux, les produits électroniques ne devraient jamais finir dans la poubelle. Une grande partie des plastiques et des métaux qu’ils contiennent peut être récupérée et réutilisée afin de fabriquer toutes sortes de choses.
                De plus, bon nombre de produits électroniques contiennent des substances préoccupantes qui, si elles ne sont pas manipulées correctement, pourraient avoir un impact sur l’environnement et causer des problèmes pour la santé. C’est le cas, entre autres, du plomb qui a des effets néfastes sur le système neurologique. Aussi, si les produits électroniques sont dirigés vers les sites d’enfouissement, ils contaminent graduellement le sol et l’eau.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "Collectes des branches",
    PageContent: `Trois dates à retenir en 2018 :  22 mai, 7 août et 23 octobre 2018
                    Les branches doivent être déposées en bordure de la rue, le bout coupé du côté de la chaussée, au plus tard à 7h la journée de la collecte;
                    Le service passera une seule fois par collecte dans votre rue:
                    Les branches pêle-mêle ne seront pas ramassées;
                    Le diamètre des branches ne doit pas excéder 5 pouces (12.7cm);
                    Les branches doivent être coupées en longueur de 5 pieds (1.5m) maximum;
                    Les vignes doivent être coupées en longueur de 4 pieds (1.2m) et attachées en paquet de ½ pied (15cm) de diamètre maximum;
                    Les petites branches de moins de 3 pieds (0.9 m) de longueur doivent être attachées en paquet de ½ pied (15cm) de diamètre maximum;
                    Pour les citoyens qui auront à disposer d’une grande quantité de branches, un maximum de 15 minutes sera alloué pour le déchiquetage par adresse;
                    Les souches, les grosses branches et les troncs ne sont pas acceptés;
                    Les branches épineuses pouvant causer des blessures pendant le déchiquetage doivent être mises dans un tas à part en bordure de la rue et respecter les mêmes consignes que les branches non épineuses.`
},
{
    Banner: "sample1.jpg",
    PageTitle: "MESURES PRISES PAR LA MUNICIPALITÉ",
    PageContent: `Vidange des fosses septiques
Obligation de la municipalité

Il est de la responsabilité de toute municipalité d’exécuter et de faire exécuter le règlement sur l’évacuation et le traitement des eaux usées des résidences isolées (Q-2,r.22) et de statuer sur les demandes de permis soumises pour la construction d’installations septiques desservant moins de six chambres à coucher.

Le règlement sur l’évacuation et le traitement des eaux usées des résidences isolées oblige les responsables des installations à procéder à une vidange des boues des fosses une fois par deux ans.

Pour fin de suivi, nous vous demandons d’acheminer une copie de votre facture (preuve de la vidange) au service de l’aménagement et d’urbanisme de la municipalité :
91, rue Principale
Saint-Jacques-le-Mineur, Québec J0J 1Z0

Pour toute question concernant la vidange de fosses septiques, veuillez communiquer avec le service de l’aménagement et d’urbanisme par courriel ou par téléphone :
amenagement@sjlm.ca
Tél. 450-347-5446 #203

Le but final de la gestion des vidanges des fosses septiques est de faire respecter la Loi sur l’environnement et d’enrayer toute contamination de l’environnement.

Ultimement cette gestion aidera la municipalité à repérer les installations polluantes et à procéder ou à faire procéder à leur mise aux normes. À noter que le territoire de Saint-Jacques-le-Mineur est assis sur une réserve hydrogéoloqique d’envergure que nous devons protégeré.

Couches lavables pour bébé
UN CHOIX ÉCOLOGIQUE ET ÉCONOMIQUE…

La Municipalité de Saint-Jacques-le-Mineur a décidé d’offrir le programme de subventions de couches lavables pour bébé de 0 à 6 mois. Cette mesure a pour but d’encourager les parents de notre territoire qui décident d’adopter ce type de couches pour le bien-être de leur enfant et pour l’environnement.

L’utilisation de couches lavables représente une économie monétaire d’au moins 1 000$ par enfant et permet une réduction significative des déchets envoyés au site d’enfouissement. Un bébé utilise plus de 7 000 couches jetables, soit près d’une tonne de déchets. Au Canada, plus de deux millions d’arbres sont coupés, chaque année, pour fabriquer des couches jetables.

Pour être admissible, les critères suivants doivent être remplis :

Être enceinte ou avoir un bébé de moins de 6 mois.
Résider sur le territoire de Saint-Jacques-le-Mineur.
Utiliser les couches lavables pendant la période complète durant laquelle l’enfant sera aux couches.
S’inscrire avant le 31 décembre de chaque année.

Faire parvenir les pièces justificatives (voir la liste) à la Municipalité de Saint-Jacques-le-Mineur, 91 rue Principale, Saint-Jacques-le-Mineur (Québec) J0J 1Z0.

Pièces justificatives : *La subvention sera versée uniquement après la réception de tous les documents

Formulaire d’inscription dûment rempli et signé par le(s) parent(s).
Preuve de résidence mentionnant votre adresse complète (compte de taxes, facture d’Hydro-Québec ou autres).
Facture originale, datée de l’année 2013 (ou d’au plus 6 mois précédant l’année du programme 2013) pour un ensemble minimum de 20 couches lavables neuves ou du tissu et des accessoires achetés dans le but de confectionner soi- même ses couches lavables.
Preuve de naissance de votre enfant (certificat de naissance ou acte de naissance). Cette preuve peut-être acheminée dans un second envoi.

*Maximum 100$ pour un achat fait au Québec. 50$ pour un achat fait à l’extérieur du Québec. (L’adresse de la boutique doit figurer sur la facture).`
},
{
    Banner: "sample1.jpg",
    PageTitle: "LOISIRS ET BIBLIOTHÈQUE",
    PageContent: `Que serait une municipalité sans ses acteurs et installations sportives et communautaires? La municipalité de Saint-Jacques-le-Mineur offre des équipements et infrastructures qui font le plaisir de tous : terrains de jeu, parcs, terrain de baseball, patinoire, bibliothèque, organismes locaux tels que le Cercle des Fermières, etc.
                Un merci chaleureux à nos nombreux bénévoles!
                Politique de remboursement pour les activités culturelles, sportives et de loisirs
                Un montant fixe de 30$ est remis à tout adulte ou jeune résident de Saint-Jacques-le-Mineur, une fois par année, pour rembourser une partie des frais d'inscription à une activité sportive ou de loisir de son choix qui ne se donne pas dans la municipalité de Saint-Jacques-le-Mineur.
                Le montant est remis, dans l'année de cours, sur présentation d'un reçu d'inscription à l'activité. Il faut présenter le reçu aux bureaux municipaux à l'adresse suivante :
                91 rue Principale
                Saint-Jacques-le-Mineur
                J0J 1Z0`
},
{
    Banner: "sample1.jpg",
    PageTitle: "BIBLIOTHÈQUE",
    PageContent: `Heures d’ouvertures
                Lundi 18h30 à 20h30
                Mercredi 13h à 16h30 et 18h30 à 20h30
                Samedi 10h30 à 12h
                MA BIBLIOTHÈQUE, MA FIERTÉ !
                FÉLICITATIONS à notre bibliothèque pour avoir remporté quatre sceaux livresques dans le cadre du programme BiblioQUALITÉ qui vise à reconnaître les efforts d’investissements en matière de bibliothèque publique de chaque municipalité membre d’un Réseau BIBLIO régional participant. 
                Les Réseaux BIBLIO participants reconnaissent que les municipalités et leurs citoyens travaillent à améliorer leur cadre de vie en participant activement à l’amélioration des services offerts aux citoyens, notamment celui de la bibliothèque publique.  Ils espèrent que l’obtention du nombre de sceaux livresques sera, pour les municipalités, une motivation permanente à l’amélioration continue des services offerts par leur bibliothèque publique.
                Un pointage, octroyé à chacun des indicateurs (livres, ressources humaines, heures d’ouverture, superficie et gratuité de l’abonnement) a permis de remettre à notre bibliothèque quatre sceaux livresques  La classification consiste à attribuer, aux municipalités participantes, d’un à cinq sceaux. `
},
{
    Banner: "sample1.jpg",
    PageTitle: "CONTRATS",
    PageContent: `La loi prévoit des modalités différentes d’adjudication des contrats selon le montant et la nature du contrat à octroyer.
                    Pour les contrats comportant une dépense inférieure à 25 000$, il n’existe aucune règle précise et on peut procéder de gré à gré.
                    Pour les contrats comportant une dépense de 25 000$ et plus, mais inférieure à 100 000$, on doit procéder par procédure d’appel d’offres sur invitation écrite auprès d’au moins deux fournisseurs ou entrepreneurs. Pour les contrats d’assurance, d’exécution de travaux, de fourniture de matériel ou matériaux, de fourniture de services et enfin de location d’équipement assorti d’une option d’achat comportant une dépense de 100 000$ et plus, on doit procéder par appel d’offres public au moyen d’une annonce dans un journal.
                    Pour les contrats d’exécution de travaux de construction, les contrats d’approvisionnement et les contrats de services tels que définis à la loi et comportant une dépense de 100 000$ et plus, on doit procéder par appel d’offres public au moyen d’un système électronique et au moyen de la parution d’une annonce dans un journal diffusé sur le territoire de la municipalité ou dans une publication spécialisée dans le domaine et vendue principalement au Québec.
                    Les contrats pour la fourniture de services professionnels qui comportent une dépense de 100 000$ ou plus sont soumis à un système d’évaluation et de pondération des offres. Ce système prévoit une évaluation de la soumission selon une pondération de points attribués en fonction de différents critères prédéterminés par le conseil. Pour les besoins d’une évaluation objective et impartiale, la soumission doit être présentée dans une enveloppe différente de la formule de prix. Ainsi, seules les formules de prix des soumissions ayant obtenu un pointage supérieur ou égal à 70% sont ouvertes et étudiées.
                    Dans tous les cas, le conseil municipal n’est pas tenu d’adjuger le contrat au plus bas soumissionnaire et peut refuser toutes soumissions présentées dans les cas qu’il détermine.
                    Ce texte n’a aucune valeur légale. Compte tenu de la complexité des règles, il convient de référer au texte même de la Loi.`
},
];

//----------------Injection in the database-------------//

function SeedData()
{
    News.Model.remove({} , (err) => {
        if(err)
            console.log(err);
        else
        {
            newsData.forEach((element) => {
                News.Model.create(element , (err , news) => {
                    if(err)
                        console.log("~Something went wrong creating the starter data. \n ERROR : "  + err);
                });
            });
            console.log("[-News injected in the database-]");
        }
    });
    Members.Model.remove({} , (err) =>{
        if(err)
            console.log(err);
        else{
            membersData.forEach((element) =>{
                Members.Model.create(element , (err, members) =>{
                    if(err)
                        console.log("~Something went wrong creating the starter data. \n ERROR : "  + err);
                });
            });
            console.log("[-Members injected in the database-]");
        }
    });
    Pages.Model.remove({} , (err) =>{
        if(err)
            console.log(err);
        else{
            pagesData.forEach((element) =>{
                Pages.Model.create(element , (err, pages) =>{
                    if(err)
                        console.log("~Something went wrong creating the starter data. \n ERROR : "  + err);
                });
            });
            console.log("[-Pages injected in the database-]");
        }
    });
}

//----------------Module Export-------------//

module.exports = SeedData();

