//----------------Dependencies-------------//
let mongoose        = require("mongoose"),
    DateHtmlFormat  = require("../utils/DateHtmlMD.js"),
    Utility         = require("../utils/utility.js");

//--------------Model-------------//
//Schema for the news
let newsSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true
    },
    Important:{
        type: Boolean,
        default: false
    },
    Category:{
        type: String,
        default: "Autres"
    },
    DatePublished:{
        type: Date,
        default: new Date(),
    },
    DateDue:{
        type: Date,
        default: new Date(),
    },
    Image:{
        type:  String,
        required: true,
    },
    File:{
        type: String
    },
    Description:{
        type: String,
        required: true
    }
});

//Model for the news
let News = mongoose.model("News" , newsSchema);

//Helpers Api functions to interact with the news
let Api = new Object();

Api.FindNews = function(req, res)
{
    let newsLimit = (req.params.limit === undefined)? 12: req.params.limit;
    let Query = News.find({}).sort("-Important").sort("-DatePublished").limit(Number(newsLimit));
    Query.exec()
         .then((news) => {
            res.json(news); 
         })
         .catch((err) => {
            console.log("~Something went wrong retrieving news data \n" + err);
         });
}

Api.CreateNews = function(req, res)
{
    News.create(req.body)
        .then((news) => {
            console.log("~Successfully uploaded news");
            res.send(news);
        })
        .catch((err) =>{
            console.log(err);
        });
}

Api.UpdateNews = function(req, res)
{
    News.findByIdAndUpdate(req.params.id, req.body)
        .then((news) =>{
            console.log("~Updated News ID : " + req.params.id);
           res.send(news);
        })
        .catch((err) => {
            console.log("~An Error occured while updating News. \n ERROR: " + err);
        });
}

Api.DeleteNews = function(req , res)
{
    News.findByIdAndRemove(req.params.id)
        .then(() =>{
            console.log("~Successfully deleted News Id : " + req.params.id);
        })
        .catch((err) => {
            console.log("~An Error occured while deleting this news \n ERROR : " + err);
        });
}

//----------------Module Exports-------------//
module.exports  = {Api: Api, Model: News};
