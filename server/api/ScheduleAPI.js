const   Schedule        = require("../models/ScheduleMD.js"),
        Api             = new Object(),
        Utility         = require("../utils/utility.js");

Api.GetSchedule = function(req, res)
{
    let Query = Schedule.find({});
    Query.exec()
         .then((schedule) =>{
            Utility.GenerateResponse(true, res, schedule);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreateSchedule = function(req, res)
{
    Schedule.create(req.body)
         .then((schedule) =>{
            Utility.GenerateResponse(true, res, schedule);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.UpdateSchedule = function(req, res)
{
    let Query = Schedule.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});
    Query.exec()
         .then((schedule) => {
            Utility.GenerateResponse(true , res , schedule);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

Api.DeleteSchedule = function(req, res)
{
    let Query = Schedule.findByIdAndRemove(req.params.id);
    Query.exec()
         .then((schedule) =>{
            Utility.GenerateResponse(true, res, schedule);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

//----------------Module Exports-------------//
module.exports  = Api;
