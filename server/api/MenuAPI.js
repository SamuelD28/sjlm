let mongoose    = require("mongoose"),
    Menu        = require("../models/MenuMD.js"),
    Api         = new Object();
    

Api.GetMenus = function(req, res){
    let Query = Menu.find({}).populate('Submenu');
    Query.exec()
         .then((menus)=>{
            res.json(menus);
         })
         .catch((error)=>{
            console.log(error);
         });
}

Api.CreateMenu = function(req, res)
{
    Menu.create(req.body)
         .then((menu) =>{
            console.log("~Successfully created menu"); 
            res.json(menu);
         })
         .catch((err) => {
            console.log(err); 
         });
}

Api.UpdateMenu = function(req, res)
{
    let Query = Menu.findByIdAndUpdate(req.params.id, req.body, {new: true});
    Query.exec()
         .then((members) =>{
            console.log("~Updated Menu ID : " + req.params.id);
            res.json(members);
         })
         .catch((err) =>{
            console.log("~An Error occured while updating Menu. \n ERROR: " + err);
         });
}

Api.DeleteMenu = function(req, res)
{
    let Query = Menu.findByIdAndRemove(req.params.id);
    Query.exec()
         .then(() =>{
            console.log("~Deleted Menu Id : " + req.params.id);
         })
         .catch((err) =>{
            console.log("~An Error occured while deleting this menu \n ERROR : " + err);
         });
}


Api.DeleteAllMenu = function(req, res)
{
    let Query = Menu.remove({});
    Query.exec()
         .then(() =>{
            console.log("~Deleted Menu : ");
         })
         .catch((err) =>{
            console.log("~An Error occured while deleting this menu \n ERROR : " + err);
         });
}

module.exports = Api;