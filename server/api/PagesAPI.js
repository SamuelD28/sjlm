const   Pages       = require("../models/PagesMD.js"),
        Api         = new Object(),
        Utility     = require("../utils/utility.js");

Api.GetOnePage = function(req, res)
{
    let Query = Pages.findById(req.params.id);
    Query.exec()
         .then((page) =>{
            Utility.GenerateResponse(true , res , page);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

Api.GetPages = function(req, res)
{
    let Query = Pages.find({});
    Query.exec()
         .then((pages) =>{
            Utility.GenerateResponse(true, res, pages);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreatePages = function(req, res)
{
    Pages.create(req.body)
         .then((page) =>{
            Utility.GenerateResponse(true, res, page);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.UpdatePages = function(req, res)
{
    let Query = Pages.findByIdAndUpdate(req.params.id, req.body, {new : true});
    Query.exec()
         .then((page) =>{
            Utility.GenerateResponse(true , res , page);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

Api.DeletePages = function(req, res)
{
    let Query = Pages.findByIdAndRemove(req.params.id);
    Query.exec()
         .then(() =>{
            Utility.GenerateResponse(true, res, null);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

//----------------Module Exports-------------//
module.exports  = Api;
