//----------------Dependencies-------------//
let CategoryNews    = require("../models/CategoryNewsMD.js"),
    Api             = new Object(),
    Utility         = require("../utils/utility.js"),
    NavigationLinks = require("../models/NavigationLinksMD.js"),
    Menus           = require("../models/MenuMD.js");

//--------------Model-------------//

Api.GetCategoryNews = function(req, res)
{
    let Query = CategoryNews.find({});
    Query.exec()
         .then((category) => {
            Utility.GenerateResponse(true, res, category);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreateCategoryNews = function(req, res)
{
    CategoryNews.create(req.body)
        .then((category) => {
            Utility.GenerateResponse(true, res, category);
            NavigationLinks.create({Title: category.Title, Category: "Actualités", Link : "/news/category/" + category.UrlValue})
                            .catch((err) => {
                                Utility.WriteInLog("error", err);
                            });
        })
        .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.UpdateCategoryNews = function(req, res)
{
    CategoryNews.findByIdAndUpdate(req.params.id, req.body, {runValidators: true})
        .then((category) =>{

            //This could be extracted into the navigationlink api
            //to simplify the operation.
            if(req.body.Title !== category.Title)
            {

                let oldUrlValue = Utility.ConvertToUrlSafe(category.Title);
                let newUrlValue = Utility.ConvertToUrlSafe(req.body.Title);
                NavigationLinks.findOne({Link : "/news/category/" + oldUrlValue})
                           .then((navlink) =>{
                               navlink.Link = "/news/category/" + newUrlValue;
                               navlink.Title = req.body.Title;
                               navlink.save();
                           })
                           .catch((err) => {
                                Utility.WriteInLog("error", err);
                           });
                Menus.find({LinkTo : "/news/category/" + oldUrlValue})
                     .exec()
                     .then((menus) =>{
                        menus.forEach((menu) =>{
                            menu.LinkTo = "/news/category/" + newUrlValue;
                            menu.save();
                        });
                     })
                     .catch((err) =>{
                        Utility.WriteInLog("error", err);
                     });
            }

            Utility.GenerateResponse(true, res, category);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.DeleteCategoryNews = function(req , res)
{
    CategoryNews.findByIdAndRemove(req.params.id)
        .then((category) =>{

            let urlValue = Utility.ConvertToUrlSafe(category.Title);
            NavigationLinks.remove({Link : "/news/category/" + urlValue})
                           .catch((err) => {
                                Utility.WriteInLog("error", err);
                           });
            Menus.find({LinkTo : "/news/category/" + urlValue})
                     .exec()
                     .then((menus) =>{
                        menus.forEach((menu) =>{
                            menu.LinkTo = null;
                            menu.save();
                        });
                     })
                     .catch((err) =>{
                        Utility.WriteInLog("error", err);
                     });

            Utility.GenerateResponse(true, res, category);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//----------------Module Exports-------------//
module.exports  = Api;
