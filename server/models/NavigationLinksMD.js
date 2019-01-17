let mongoose = require("mongoose"),
    Utility = require("../utils/utility.js"),
    Menus = require("./MenuMD.js");


let Schema = mongoose.Schema;
let navigationSchema = new Schema({
    Link: {
        type: String,
        required: true,
        unique: 1
    },
    Category: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        required: true
    }
});

navigationSchema.statics.findByLinkAndRemove = function (link, Category) {

    let oldPath = "";

    if (Category.toLowerCase() === "pages")
        oldPath = "/pages/static/";
    else if (Category.toLowerCase() === "actualités")
        oldPath = "/news/category/";
    else
        oldPath = link;

    NavigationLinks.remove({ Link: "/pages/static/" + link })
        .catch((err) => {
            Utility.WriteInLog("error", err);
        });
    Menus.find({ LinkTo: "/pages/static/" + link })
        .then((menus) => {
            menus.forEach((menu) => {
                menu.LinkTo = null;
                menu.save();
            });
        })
        .catch((err) => {
            Utility.WriteInLog("error", err);
        });
}

navigationSchema.statics.findByLinkAndUpdate = function (link, newdata) {

    let oldPath = "";

    if (newdata.Category.toLowerCase() === "pages")
        oldPath = "/pages/static/";
    else if (newdata.Category.toLowerCase() === "actualités")
        oldPath = "/news/category/";
    else
        oldPath = link;

    this.findOne({ Link: oldPath + link })
        .then((navlink) => {
            if (navlink) {
                navlink.Link = oldPath + newdata.Link;
                navlink.Title = newdata.Title;
                navlink.Category = newdata.Category;
                navlink.save();
            }
        })
        .catch((err) => {
            Utility.WriteInLog("error", err);
        });

    Menus.find({ LinkTo: link })
        .then((menus) => {
            menus.forEach((menu) => {
                menu.LinkTo = oldPath + newdata.Link;
                menu.save();
            });
        })
        .catch((err) => {
            Utility.WriteInLog("error", err);
        });

}

let NavigationLinks = mongoose.model("NavigationLinks", navigationSchema);

module.exports = NavigationLinks;
