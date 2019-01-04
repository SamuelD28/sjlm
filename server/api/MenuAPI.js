let mongoose    = require("mongoose"),
    Menu        = require("../models/MenuMD.js"),
    Api         = new Object(),
    Utility     = require("../utils/utility.js");

Api.GetMenus = function(req, res){
    let Query = Menu.find({Principal: true}).populate('SubMenu');
    Query.exec()
         .then((menus)=>{
            Utility.GenerateResponse(true, res, menus);
         })
         .catch((err)=>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.CreateMenu = function(req, res)
{
    Menu.create(req.body)
         .then((menu) =>{
            if(menu.ParentMenu !== undefined)
            {
                Menu.findById(menu.ParentMenu)
                    .then((parentMenu) => {
                        if(parentMenu !== {}){
                            parentMenu.SubMenu.push(menu._id);
                            parentMenu.save();
                        }
                    })
                    .catch((err) => {
                        Utility.GenerateResponse(false, res, err);
                    });
            }
            Utility.GenerateResponse(true, res, menu);
         })
         .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.UpdateMenu = function(req, res)
{
    let Query = Menu.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});
    Query.exec()
         .then((menu) =>{

            if(menu.ParentMenu !== req.body.Parent)
            {
                Menu.findById(menu.ParentMenu)
                    .then((originalParent) =>{
                        let index = originalParent.SubMenu.indexOf(menu._id);
                        originalParent.SubMenu.splice(index, 1);
                        originalParent.save();
                    })
                    .catch((err) =>
                    {
                        Utility.GenerateResponse(false, res, err);
                    });

                Menu.findById(req.body.ParentMenu)
                    .then((newParent) =>{
                        newParent.SubMenu.push(menu);
                        newParent.save();
                    })
                    .catch((err) =>
                    {
                        Utility.GenerateResponse(false, res, err);
                    });
            }

            Utility.CheckIfObjectIsEmpty(req.body);
            Utility.GenerateResponse(true, res, menu);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

Api.DeleteMenu = function(req, res)
{
    let Query = Menu.findByIdAndRemove(req.params.id);
    Query.exec()
         .then((menu) =>{

            if(menu.SubMenu.length > 0)
            {
                menu.SubMenu.forEach((id) =>
                {
                    Menu.findByIdAndRemove(id)
                        .exec()
                        .catch((err) => {
                            Utility.GenerateResponse(false, res, err);
                        });
                });
            }

            if(menu.ParentMenu !== undefined){
                 Menu.findById(menu.ParentMenu)
                    .then((originalParent) =>{
                        let index = originalParent.SubMenu.indexOf(menu._id);
                        originalParent.SubMenu.splice(index, 1);
                        originalParent.save();
                    })
                    .catch((err) =>
                    {
                        Utility.GenerateResponse(false, res, err);
                    });
            }

            Utility.GenerateResponse(true, res, menu);
         })
         .catch((err) =>{
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
         });
}

module.exports = Api;