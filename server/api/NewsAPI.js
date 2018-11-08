//----------------Dependencies-------------//
let News        = require("../models/NewsMD.js"),
    Api         = new Object(),
    Utility     = require("../utils/utility.js");

//--------------Model-------------//

Api.FindNews = function(req, res)
{
    let newsLimit = (req.params.number === undefined)? 24: req.params.number;
    let Query = News.find({}).sort('-DatePublished').limit(Number(newsLimit));
    Query.exec()
         .then((news) => {
            Utility.GenerateResponse(true, res, news);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

//Do the api call to sort news by specified data and year

Api.FindNewsById =function(req, res)
{
    News.findById(req.params.id)
        .then((news) => {
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err)=>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
        
}

Api.FindNewsByCategory = function(req, res)
{
    News.find({Category: req.params.category})
        .then((news) => {
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.CreateNews = function(req, res)
{
    News.create(req.body)
        .then((news) => {
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.UpdateNews = function(req, res)
{
    News.findByIdAndUpdate(req.params.id, req.body, {new : true})
        .then((news) =>{
            Utility.CheckIfObjectIsEmpty(req.body);
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.DeleteNews = function(req , res)
{
    News.findByIdAndRemove(req.params.id)
        .then((news) =>{
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//----------------Module Exports-------------//
module.exports  = Api;
