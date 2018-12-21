//----------------Dependencies-------------//
let CategoryNews    = require("../models/CategoryNewsMD.js"),
    Api             = new Object(),
    Utility         = require("../utils/utility.js"),
    NavigationLinks = require("../models/NavigationLinksMD.js");

//--------------Model-------------//

Api.GetCategoryNews = function(req, res)
{
    let Query = CategoryNews.find({});
    Query.exec()
         .then((categories) => {
            Utility.GenerateResponse(true, res, categories);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreateCategoryNews = function(req, res)
{
    CategoryNews.create(req.body)
        .then((categories) => {
            Utility.GenerateResponse(true, res, categories);
            NavigationLinks.create({Title: categories.Title, Category: "Actualités", Link : "/news/category/" + categories.UrlValue})
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
    CategoryNews.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true})
        .then((categories) =>{
            Utility.CheckIfObjectIsEmpty(req.body);
            Utility.GenerateResponse(true, res, categories);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.DeleteCategoryNews = function(req , res)
{
    CategoryNews.findByIdAndRemove(req.params.id)
        .then((categories) =>{
            Utility.GenerateResponse(true, res, categories);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//----------------Module Exports-------------//
module.exports  = Api;
