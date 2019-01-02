//----------------Dependencies-------------//
let Occupations     = require("../models/OccupationsMD.js"),
    Api             = new Object(),
    Utility         = require("../utils/utility.js");

//--------------Model-------------//

Api.GetOccupations = function(req, res)
{
    let Query = Occupations.find({});
    Query.exec()
         .then((occupation) => {
            Utility.GenerateResponse(true, res, occupation);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreateOccupations = function(req, res)
{
    Occupations.create(req.body)
        .then((occupation) => {
            Utility.GenerateResponse(true, res, occupation);
        })
        .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.UpdateOccupations = function(req, res)
{
    Occupations.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true})
        .then((occupation) =>{
            Utility.CheckIfObjectIsEmpty(req.body);
            Utility.GenerateResponse(true, res, occupation);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.DeleteOccupations = function(req , res)
{
    Occupations.findByIdAndRemove(req.params.id)
        .then((occupation) =>{
            Utility.GenerateResponse(true, res, occupation);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//----------------Module Exports-------------//
module.exports  = Api;
