//----------------Dependencies-------------//
let NavigationLinks = require("../models/NavigationLinksMD.js"),
    Api             = new Object(),
    Utility         = require("../utils/utility.js");

//--------------Model-------------//

Api.GetNavigationLinks = function(req, res)
{
    let Query = NavigationLinks.find({});
    Query.exec()
         .then((navigationLinks) => {
            Utility.GenerateResponse(true, res, navigationLinks);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreateNavigationLinks = function(req, res)
{
    NavigationLinks.create(req.body)
        .then((navigationLinks) => {
            Utility.GenerateResponse(true, res, navigationLinks);
        })
        .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.UpdateNavigationLinks = function(req, res)
{
    NavigationLinks.findByIdAndUpdate(req.params.id, req.body, {new : true})
        .then((navigationLinks) =>{
            Utility.CheckIfObjectIsEmpty(req.body);
            Utility.GenerateResponse(true, res, navigationLinks);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.DeleteNavigationLinks = function(req , res)
{
    NavigationLinks.findByIdAndRemove(req.params.id)
        .then((navigationLinks) =>{
            Utility.GenerateResponse(true, res, navigationLinks);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//----------------Module Exports-------------//
module.exports  = Api;
