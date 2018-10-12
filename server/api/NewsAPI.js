//----------------Dependencies-------------//
let News            = require("../models/NewsMD.js"),
    Api             = new Object();

//--------------Model-------------//

Api.FindNews = function(req, res)
{
    let newsLimit = (req.params.number === undefined)? 24: req.params.number;
    let Query = News.find({}).sort('-DatePublished').limit(Number(newsLimit));
    Query.exec()
         .then((news) => {
            res.json(news); 
         })
         .catch((err) => {
            console.log("~Something went wrong retrieving news data \n" + err);
         });
}

Api.FindNewsById =function(req, res)
{
    News.findById(req.params.id)
        .then((news) => {
            res.json(news);
        })
        .catch((err)=>{
            console.log("~An error occured while retrieving a news by id : " + err); 
        });
        
}

Api.FindNewsByCategory = function(req, res)
{
    News.find({Category: req.params.category})
        .then((news) => {
            res.json(news);
        })
        .catch((err) => {
            if(err)
                console.log(err);
        });
}

Api.CreateNews = function(req, res)
{
    News.create(req.body)
        .then((news) => {
            console.log("~Successfully uploaded news");
            res.json(news);
        })
        .catch((err) =>{
            console.log(err);
        });
}

Api.UpdateNews = function(req, res)
{
    News.findByIdAndUpdate(req.params.id, req.body, {new : true})
        .then((news) =>{
            console.log("~Updated News ID : " + req.params.id);
            res.json(news);
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
module.exports  = Api;
