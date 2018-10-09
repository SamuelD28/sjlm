let Pages   = require("../models/PagesMD.js"),
    Api     = new Object();

Api.GetOnePage = function(req, res)
{
    let Query = Pages.findById(req.params.id);
    Query.exec()
         .then((page) =>{
            res.json(page);
         })
         .catch((err) =>{
            console.log(err);
         });
}

Api.GetPages = function(req, res)
{
    let Query = Pages.find({});
    Query.exec()
         .then((pages) =>{
            res.json(pages);
         })
         .catch((err) =>{
            console.log("~Something went wrong retrieving pages data \n" + err); 
         });
}

Api.CreatePages = function(req, res)
{
    Pages.create(req.body)
         .then((members) =>{
            console.log("~Successfully created pages"); 
            res.json(members);
         })
         .catch((err) => {
            console.log(err); 
         });
}

Api.UpdatePages = function(req, res)
{
    let Query = Pages.findByIdAndUpdate(req.params.id, req.body, {new : true});
    Query.exec()
         .then((members) =>{
            console.log("~Updated Page ID : " + req.params.id);
            res.send(members);
         })
         .catch((err) =>{
            console.log("~An Error occured while updating pages. \n ERROR: " + err);
         });
}

Api.DeletePages = function(req, res)
{
    let Query = Pages.findByIdAndRemove(req.params.id);
    Query.exec()
         .then(() =>{
            console.log("~Deleted Pages Id : " + req.params.id);
         })
         .catch((err) =>{
            console.log("~An Error occured while deleting this pages \n ERROR : " + err);
         });
}

//----------------Module Exports-------------//
module.exports  = Api;
