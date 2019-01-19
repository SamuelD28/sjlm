//----------------Dependencies-------------//
let News = require("../models/NewsMD.js"),
    CategoryNews = require("../models/CategoryNewsMD.js"),
    Api = new Object(),
    Utility = require("../utils/utility.js"),
    NavigationLinks = require("../models/NavigationLinksMD.js");

//--------------Model-------------//

Api.FindNews = function (req, res) {
    let newsLimit = (req.params.number === undefined) ? 256 : req.params.number;
    let Query = News.find({}).sort('-DateFrom').populate('Category').limit(Number(newsLimit));
    Query.exec()
        .then((news) => {
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.FindLatestNews = function (req, res) {

    const today = new Date();

    let Query = News.find({
        DateFrom: {
            $gte: today
        }
    }).sort("DateFrom").populate("Category").limit(3);

    Query.exec()
        .then((news) => {
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
        });
}

Api.FindNewsByDate = function (req, res) {

    //We substract one to the month because javascript date range from 0 to 11
    //and not 01 to 12.
    const today = new Date(req.params.year, req.params.month - 1, 1);
    const target = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    let Query = News.find({
        DateFrom: {
            $gte: today,
            $lte: target
        }
    }).populate("Category");

    Query.exec()
        .then((news) => {
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
        });
}

Api.FindImportantNews = function (req, res) {
    let Query = News.find({ Important: true });
    Query.exec()
        .then((news) => {
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
        });
}

Api.FindNewsById = function (req, res) {
    News.findById(req.params.id).populate('Category')
        .then((news) => {
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });

}

Api.FindNewsByCategory = function (req, res) {
    News.find({ Category: req.params.category })
        .then((news) => {
            if (news) {
                Utility.GenerateResponse(true, res, news);
            }
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
        })
}

Api.FindNewsByLink = function (req, res) {
    NavigationLinks.findOne({ Link: "/news/category/" + req.params.link })
        .then((link) => {
            if (link) {
                CategoryNews.findOne({ Link: link._id })
                    .exec()
                    .then((category) => {
                        News.find({ Category: category._id })
                            .then((news) => {
                                Utility.GenerateResponse(true, res, news);
                            })
                            .catch((err) => {
                                Utility.GenerateResponse(false, res, err);
                                Utility.WriteInLog("error", err);
                            });
                    })
                    .catch((err) => {
                        Utility.GenerateResponse(false, res, err);
                        Utility.WriteInLog("error", err);
                    });
            }
            else {
                Utility.GenerateResponse(false, res, [{ message: "No link was found" }]);
            }
        })
}

Api.CreateNews = function (req, res) {
    News.create(req.body)
        .then((news) => {
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.UpdateNews = function (req, res) {
    News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then((news) => {
            Utility.CheckIfObjectIsEmpty(req.body);
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.DeleteNews = function (req, res) {
    News.findByIdAndRemove(req.params.id)
        .then((news) => {
            Utility.GenerateResponse(true, res, news);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//----------------Module Exports-------------//
module.exports = Api;
