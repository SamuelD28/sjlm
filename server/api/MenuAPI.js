let mongoose    = require("mongoose"),
    Menu        = require("../models/MenuMD.js"),
    Api         = new Object(),
    Utility     = require("../utils/utility.js");

Api.GetMenus = function(req, res){
    let Query = Menu.find({}).populate('Submenu');
    Query.exec()
         .then((menus)=>{
            Utility.GenerateResponse(true, res, menus);
         })
         .catch((err)=>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreateMenu = function(req, res)
{
    Menu.create(req.body)
         .then((menu) =>{
            Utility.GenerateResponse(true, res, menu);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.UpdateMenu = function(req, res)
{
    let Query = Menu.findByIdAndUpdate(req.params.id, req.body, {new: true});
    Query.exec()
         .then((menu) =>{
            Utility.CheckIfObjectIsEmpty(req.body);
            Utility.GenerateResponse(true, res, menu);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.DeleteMenu = function(req, res)
{
    let Query = Menu.findByIdAndRemove(req.params.id);
    Query.exec()
         .then((menu) =>{
            Utility.GenerateResponse(true, res, menu);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}


Api.DeleteAllMenu = function(req, res)
{
    let Query = Menu.remove({});
    Query.exec()
         .then(() =>{
            Utility.GenerateResponse(true, res);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

module.exports = Api;