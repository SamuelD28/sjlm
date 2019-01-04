const   Pages           = require("../models/PagesMD.js"),
        Api             = new Object(),
        Utility         = require("../utils/utility.js"),
        NavigationLinks = require("../models/NavigationLinksMD.js"),
        Menus           = require("../models/MenuMD.js");

Api.GetOnePage = function(req, res)
{
    let Query = Pages.findById(req.params.id);
    Query.exec()
         .then((page) =>{
            Utility.GenerateResponse(true , res , page);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

Api.GetPages = function(req, res)
{
    let Query = Pages.find();
    Query.exec()
         .then((pages) =>{
            Utility.GenerateResponse(true, res, pages);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreatePages = function(req, res)
{
    Pages.create(req.body)
         .then((page) =>{

            if(page instanceof Array)
                req.body.map((_page) =>{
                    let urlValue = Utility.ConvertToUrlSafe(_page.PageTitle);
                    NavigationLinks.create({Title: _page.PageTitle, Category: "Pages", Link : "/pages/static/" + urlValue})
                                   .catch((err) => {
                                        Utility.WriteInLog("error", err);
                                   });
                })
            else{
                let urlValue = Utility.ConvertToUrlSafe(page.PageTitle);
                NavigationLinks.create({Title: page.PageTitle, Category: "Pages", Link : "/pages/static/" + urlValue})
                               .catch((err) => {
                                    Utility.WriteInLog("error", err);
                               });
            }

            Utility.GenerateResponse(true, res, page);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.UpdatePages = function(req, res)
{
    let Query = Pages.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});
    Query.exec()
         .then((page) => {

            //This could be extracted into the navigationlink api
            //to simplify the operation
            if(req.body.PageTitle !== page.PageTitle)
            {
                let oldUrlValue = Utility.ConvertToUrlSafe(page.PageTitle);
                let newUrlValue = Utility.ConvertToUrlSafe(req.body.PageTitle);
                NavigationLinks.findOne({Link : "/pages/static/" + oldUrlValue})
                           .then((navlink) =>{
                               navlink.Link = "/pages/static/" + newUrlValue;
                               navlink.Title = req.body.PageTitle;
                               navlink.save();
                           })
                           .catch((err) => {
                                Utility.WriteInLog("error", err);
                           });
                Menus.find({LinkTo : "/pages/static/" + oldUrlValue})
                     .exec()
                     .then((menus) =>{
                        menus.forEach((menu) =>{
                            menu.LinkTo = "/pages/static/" + newUrlValue;
                            menu.save();
                        });
                     })
                     .catch((err) =>{
                        Utility.WriteInLog("error", err);
                     });
            }

            Utility.GenerateResponse(true , res , page);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

Api.DeletePages = function(req, res)
{
    let Query = Pages.findByIdAndRemove(req.params.id);
    Query.exec()
         .then((page) =>{

            let urlValue = Utility.ConvertToUrlSafe(page.PageTitle);
            NavigationLinks.remove({Link : "/pages/static/" + urlValue})
                           .catch((err) => {
                                Utility.WriteInLog("error", err);
                           });
            Menus.find({LinkTo : "/pages/static/" + urlValue})
                     .exec()
                     .then((menus) =>{
                        menus.forEach((menu) =>{
                            menu.LinkTo = null;
                            menu.save();
                        });
                     })
                     .catch((err) =>{
                        Utility.WriteInLog("error", err);
                     });

            Utility.GenerateResponse(true, res, page);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false , res , err);
            Utility.WriteInLog("error", err);
         });
}

//----------------Module Exports-------------//
module.exports  = Api;
