
this.FormConfig = new FormConfig({url: "/api/menus/",
                                          httpRequest : "POST",
                                          modal: true,
                                          size: "small",
                                          title: "Ajouter un Menu",
                                          modalOpener : this.ModalOpener});
this.FormStatus  = new FormStatus();
//Inputs schema for the form generator
this.Inputs =   [new InputSchema({
                                name: "Principal",
                                type: "toggle",
                                label : "Menu principal",
                                value: false}),
                new InputSchema({
                                name: "Title",
                                group: 1,
                                width: 10,
                                type: "text",
                                label: "Titre du menu",
                                value : ""}),
                new InputSchema({
                                name : "Icon",
                                group: 1,
                                width: 6,
                                type: "select",
                                label: "Icon du menu",
                                disabled: (inputs) => {
                                            return !inputs[0].value;
                                },
                                value : "",
                                list : [],
                                generator : () =>  { return this.GenererateIconOptions() }}),
                new InputSchema({
                                name : "LinkTo",
                                type: "select",
                                group: 2,
                                label: "Lien de navigation",
                                value : "",
                                list : [],
                                generator : () =>  { return this.links }}),
                new InputSchema({
                                name : "ParentMenu",
                                disabled: (inputs) => {
                                    return inputs[0].value;
                                },
                                type: "select",
                                group: 2,
                                label: "Menu parent",
                                value : "",
                                list : [],
                                generator : () =>  { return this.menus }})
];


// async componentDidMount() {
//     this.ReadInTempState("/api/menus");
//     this.links = await this.GenerateLinksOptions();
//     this.menus = await this.GenererateMenuOptions();
// }

GenererateMenuOptions = async() =>
{
    let menus = await Ajax.GetData("/api/menus");
    let menusOptions = [];
    if(menus.data !== undefined)
    {
        menus.data.map((menu, index) => {
            if(menu.Principal)
            {
                let menuObject = {text: menu.Title, value: menu._id};
                menusOptions.push(menuObject);
            }

            return menusOptions;
        });
    }
    console.log(menusOptions);
    return menusOptions;
}


GenererateIconOptions = () =>
{
    let IconsArray = [
    "compass",
    "balance",
    "newspaper",
    "home",
    "mail",
    "futbol",
    "book",
    "users",
    "user"
    ];
    let IconsOptions = [];
    IconsArray.map((icon, index) => {
        let IconsObject = {text: icon, value: icon, icon: icon};
        return IconsOptions.push(IconsObject);
    });
    return IconsOptions;
}

GenerateLinksOptions = async() =>
{
    let navigationlinks =  await Ajax.GetData("/api/navigationlinks");
    let NavigationOptions = [];
    if(navigationlinks.data !== undefined)
    {
        navigationlinks.data.map((navlink, index) => {
            let NavigationObject = {text: navlink.Category + " | " +  navlink.Title, value: navlink.Link};
            return NavigationOptions.push(NavigationObject);
        });
    }
    console.log(NavigationOptions);
    return NavigationOptions;
}