//----------------Dependencies-------------//

let mongoose    = require("mongoose"),
    Members     = require("../models/MembersMD.js"),
    Api         = new Object(),
    Utility     = require("../utils/utility.js");

Api.GetMembers = function(req, res)
{
    let Query = Members.find();
    Query.exec()
         .then((members) =>{
            Utility.GenerateResponse(true, res, members);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreateMembers = function(req, res)
{
    console.log(req.body.Photo);
  
    Members.create(req.body)
         .then((members) =>{
            Utility.GenerateResponse(true, res, members);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.UpdateMembers = function(req, res)
{
    let Query = Members.findByIdAndUpdate(req.params.id, req.body, {new: true});
    Query.exec()
         .then((members) =>{
            Utility.GenerateResponse(true, res, members);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.DeleteMembers = function(req, res)
{
    let Query = Members.findByIdAndRemove(req.params.id);
    Query.exec()
         .then(() =>{
            Utility.GenerateResponse(true, res, null);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

//----------------Module Exports-------------//

module.exports = Api;