//----------------Dependencies-------------//

let mongoose    = require("mongoose"),
    Members     = require("../models/MembersMD.js"),
    cloudinary  = require("cloudinary");

let Api = new Object();

Api.GetMembers = function(req, res)
{
    let Query = Members.find({});
    Query.exec()
         .then((members) =>{
            res.json(members);
         })
         .catch((err) =>{
            console.log("~Something went wrong retrieving news data \n" + err); 
         });
}

Api.CreateMembers = function(req, res)
{
    console.log(req.body.Photo);
  
    Members.create(req.body)
         .then((members) =>{
            console.log("~Successfully created member"); 
            res.send(members);
         })
         .catch((err) => {
            console.log(err); 
         });
}

Api.UpdateMembers = function(req, res)
{
    let Query = Members.findByIdAndUpdate(req.params.id, req.body, {new: true});
    Query.exec()
         .then((members) =>{
            console.log("~Updated Members ID : " + req.params.id);
            res.send(members);
         })
         .catch((err) =>{
            console.log("~An Error occured while updating News. \n ERROR: " + err);
         });
}

Api.DeleteMembers = function(req, res)
{
    let Query = Members.findByIdAndRemove(req.params.id);
    Query.exec()
         .then(() =>{
            console.log("~Deleted Members Id : " + req.params.id);
         })
         .catch((err) =>{
            console.log("~An Error occured while deleting this members \n ERROR : " + err);
         });
}

//----------------Module Exports-------------//

module.exports = Api;