//----------------Dependencies-------------//
let News            = require("../models/NewsMD.js"),
    CategoryNews    = require("../models/CategoryNewsMD.js"),
    Api             = new Object(),
    Utility         = require("../utils/utility.js");

//--------------Model-------------//

Api.FindNews = function(req, res)
{
    let newsLimit = (req.params.number === undefined)? 24: req.params.number;
    let Query = News.find({}).sort('-createdAt').populate('Category').limit(Number(newsLimit));
    Query.exec()
         .then((news) => {
            Utility.GenerateResponse(true, res, news);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}


Api.FindNewsById =function(req, res)
{
    News.findById(req.params.id).populate('Category')
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
    CategoryNews.findOne({UrlValue : req.params.category})
                .exec()
                .then((category) =>{
                    News.find({Category: category._id})
                        .then((news) => {
                            Utility.GenerateResponse(true, res, news);
                        })
                        .catch((err) => {
                            Utility.GenerateResponse(false, res, err);
                            Utility.WriteInLog("error", err);
                        });
                })
                .catch((err) =>{
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
    News.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators: true})
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
