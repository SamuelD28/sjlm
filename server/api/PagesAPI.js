const Pages = require("../models/PagesMD.js"),
    Api = new Object(),
    Utility = require("../utils/utility.js"),
    NavigationLinks = require("../models/NavigationLinksMD.js");

Api.GetOnePage = function (req, res) {
    let Query = Pages.findById(req.params.id);
    Query.exec()
        .then((page) => {
            Utility.GenerateResponse(true, res, page);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.GetPageByPageUrl = function (req, res) {

    NavigationLinks.findOne({ Link: "/pages/static/" + req.params.pageurl })
        .then((link) => {
            if (link) {
                Pages.findOne({ Link: link._id })
                    .then((page) => {
                        Utility.GenerateResponse(true, res, page);
                    })
                    .catch((err) => {
                        Utility.WriteInLog("error", err);
                    });
            }
        });

}

Api.GetPages = function (req, res) {
    let Query = Pages.find();
    Query.exec()
        .then((pages) => {
            Utility.GenerateResponse(true, res, pages);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.CreatePages = function (req, res) {

    if (req.body instanceof Array) {
        Pages.create(req.body)
            .then((pages) => {
                pages.forEach((page) => {
                    let link = Utility.ConvertToUrlSafe(page.PageTitle);
                    NavigationLinks.create({ Title: page.PageTitle, Category: "Pages", Link: "/pages/static/" + link })
                        .then((link) => {
                            page.Link = link._id;
                            page.save();
                        })
                        .catch((err) => {
                            Utility.WriteInLog("error", err);
                        });
                })
                Utility.GenerateResponse(true, res, pages);
            })
            .catch((err) => {
                Utility.GenerateResponse(false, res, err);
                Utility.WriteInLog("error", err);
            });
    }
    else {
        Pages.create(req.body)
            .then((page) => {
                let link = Utility.ConvertToUrlSafe(page.PageTitle);
                NavigationLinks.create({ Title: page.PageTitle, Category: "Pages", Link: "/pages/static/" + link })
                    .then((link) => {
                        page.Link = link._id;
                        page.save();
                    })
                    .catch((err) => {
                        Utility.WriteInLog("error", err);
                    });
                Utility.GenerateResponse(true, res, page);
            })
            .catch((err) => {
                Utility.GenerateResponse(false, res, err);
                Utility.WriteInLog("error", err);
            });
    }
}

Api.UpdatePages = function (req, res) {
    let Query = Pages.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    Query.exec()
        .then((page) => {

            //This could be extracted into the navigationlink api
            //to simplify the operation
            if (req.body.PageTitle !== page.PageTitle) {
                let newLink = "/pages/static/" + Utility.ConvertToUrlSafe(req.body.PageTitle);
                NavigationLinks.findByIdAndUpdate(page.Link, { Link: newLink, Title: req.body.PageTitle }, { runValidators: true })
                    .catch((err) => {
                        Utility.WriteInLog("error", err);
                    })
            }
            Utility.GenerateResponse(true, res, page);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.DeletePages = function (req, res) {
    let Query = Pages.findByIdAndRemove(req.params.id);
    Query.exec()
        .then((page) => {
            NavigationLinks.findByIdAndCleanse(page.Link);
            Utility.GenerateResponse(true, res, page);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//----------------Module Exports-------------//
module.exports = Api;
