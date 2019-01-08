const   VerbalTrial     = require("../models/VerbalTrialMD.js"),
        Api             = new Object(),
        Utility         = require("../utils/utility.js");

Api.GetVerbalTrial = function(req, res)
{
    let Query = VerbalTrial.find();
    Query.exec()
         .then((verbalTrial) =>{
            Utility.GenerateResponse(true, res, verbalTrial);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreateVerbalTrial = function(req, res)
{


    VerbalTrial.create(req.body)
         .then((verbalTrial) =>{
            Utility.GenerateResponse(true, res, verbalTrial);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.UpdateVerbalTrial = function(req, res)
{
    let Query = VerbalTrial.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});
    Query.exec()
         .then((verbalTrial) => {
            Utility.GenerateResponse(true , res , verbalTrial);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

Api.DeleteVerbalTrial = function(req, res)
{
    let Query = VerbalTrial.findByIdAndRemove(req.params.id);
    Query.exec()
         .then((verbalTrial) =>{
            Utility.GenerateResponse(true, res, verbalTrial);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

//----------------Module Exports-------------//
module.exports  = Api;
