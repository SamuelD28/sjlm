//----------------Dependencies-------------//
let mongoose        = require("mongoose");

//----------------Model-------------//

//Schema for the news
let Schema = mongoose.Schema;
let pagesSchema = new Schema(
{
    PageCategory: {
        type: String,
        required: true,
        default: "Autres"
    },
    Template: {
        type: Number,
        required: true,
        default: 1
    },
    Banner: {
        type: String,
        required: true
    },
    PageTitle: {
        type: String,
        required: true
    },
    PageContent: {
        type: String,
        required: true
    }
}
);

//Model for the news
let Pages = mongoose.model("Pages" , pagesSchema);

//Helpers Api functions to interact with the news
let Api = new Object();

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
module.exports  = {Api: Api, Model: Pages};
