//----------------Dependencies-------------//

let mongoose = require("mongoose");

//----------------Model-------------//

let Schema =  mongoose.Schema;
let membersSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Photo: {
        type: String,
        required: true
    },
    Occupation: {
        type: String,
        required: true
    },
    PersonnalNote: {
        type: String
    },
    Email:{
        type: String,
        required: true
    },
    Phone: {
        type: String
    }
});
let Members = mongoose.model("Members" , membersSchema);

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
    let Query = Members.create(req.body);
    Query.exec()
         .then((members) =>{
            console.log("~Successfully created member"); 
         })
         .catch((err) => {
            console.log(err); 
         });
}

Api.UpdateMembers = function(req, res)
{
    let Query = Members.findByIdAndUpdate(req.params.id, req.body);
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
            console.log("~Successfully deleted Members Id : " + req.params.id);
         })
         .catch((err) =>{
            console.log("~An Error occured while deleting this members \n ERROR : " + err);
         });
}

//----------------Module Exports-------------//

module.exports = {Api: Api, Model: Members};