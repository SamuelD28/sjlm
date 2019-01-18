//----------------Dependencies-------------//
let CategoryNews = require("../models/CategoryNewsMD.js"),
    Api = new Object(),
    Utility = require("../utils/utility.js"),
    NavigationLinks = require("../models/NavigationLinksMD.js");

//--------------Model-------------//

Api.GetCategoryNews = function (req, res) {
    let Query = CategoryNews.find({});
    Query.exec()
        .then((category) => {
            Utility.GenerateResponse(true, res, category);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.GetCategoryByUrl = function (req, res) {

    NavigationLinks.findOne({ Link: "/news/category/" + req.params.urlvalue })
        .then((link) => {
            if (link) {
                CategoryNews.findOne({ Link: link._id })
                    .then((category) => {
                        Utility.GenerateResponse(true, res, category);
                    })
                    .catch((err) => {
                        Utility.WriteInLog("error", err);
                        Utility.GenerateResponse(false, res, err);
                    });
            }
        })
}

Api.CreateCategoryNews = function (req, res) {
    CategoryNews.create(req.body)
        .then((category) => {
            Utility.GenerateResponse(true, res, category);
            NavigationLinks.create({ Title: category.Title, Category: "Actualités", Link: "/news/category/" + category.UrlValue })
                .then((link) => {
                    category.Link = link._id;
                    category.save();
                })
                .catch((err) => {
                    Utility.WriteInLog("error", err);
                });

        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.UpdateCategoryNews = function (req, res) {
    CategoryNews.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
        .then((category) => {
            if (req.body.Title !== category.Title) {
                let newLink = "/news/category/" + Utility.ConvertToUrlSafe(req.body.Title);
                NavigationLinks.findByIdAndUpdate(category.Link, { Link: newLink, Title: req.body.Title }, { runValidators: true })
                    .catch((err) => {
                        Utility.WriteInLog("error", err);
                    })
            }
            Utility.GenerateResponse(true, res, category);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.DeleteCategoryNews = function (req, res) {
    CategoryNews.findByIdAndRemove(req.params.id)
        .then((category) => {
            NavigationLinks.findByIdAndCleanse(category.Link);
            Utility.GenerateResponse(true, res, category);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//----------------Module Exports-------------//
module.exports = Api;
