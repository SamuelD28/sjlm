//----------------Dependencies-------------//
let Occupations     = require("../models/OccupationsMD.js"),
    Api             = new Object(),
    Utility         = require("../utils/utility.js"),
    Members         = require("../models/MembersMD.js");

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
    let canDelete = true;

    Members.find({Occupation : req.params.id})
            .then((members) =>{
                if(members.length > 0){
                    canDelete = false;

                    let Poste = {
                        kind: "dependencies",
                        message: "Le poste est utilisé par un membre",
                        name: "Poste",
                        path: "Poste"
                    }

                    Utility.GenerateResponse(false, res, {errors : {Poste : Poste}});
                }
            })
            .then(() =>{
                if(canDelete)
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
            });

}

//----------------Module Exports-------------//
module.exports  = Api;
