let mongoose = require("mongoose"),
    Utility = require("../utils/utility.js"),
    Menu = require("./MenuMD.js");


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

navigationSchema.statics.findByIdAndCleanse = function (link) {

    NavigationLinks.findByIdAndRemove(link)
        .catch((err) => {
            Utility.WriteInLog("error", err);
        });
    Menu.find({ Link: link })
        .then((menus) => {
            menus.forEach((menu) => {
                menu.Link = null;
                menu.save();
            })
        });
}

let NavigationLinks = mongoose.model("NavigationLinks", navigationSchema);
module.exports = NavigationLinks;
