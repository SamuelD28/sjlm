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
            NavigationLinks.create({Title: category.Title, Category: "Actualités", Link : "/news/category/" + category._id})
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
        .then((category) =>{
            Utility.CheckIfObjectIsEmpty(req.body);
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
            Utility.GenerateResponse(true, res, category);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//----------------Module Exports-------------//
module.exports  = Api;
