let mongoose = require("mongoose"),
    Utility = require("../utils/utility.js"),
    NavigationLinks = require("./NavigationLinksMD.js");

//----------------Model-------------//
let Schema = mongoose.Schema;
let pagesSchema = new Schema({
    Template: {
        type: Number,
        default: 0,
        min: 0,
        max: 2
    },
    PageTitle: {
        type: String,
        required: true,
        maxlength: 60,
        unique: 1,
        validate: {
            validator: (value) => !(/[\@\#\$\%\?\*\(\)]/g.test(value)),
            kind: 'invalid characters',
        },
    },
    PageContent: {
        type: String,
        required: true
    },
    DisplaySocials: {
        type: Boolean,
        default: false
    },
    PageFiles: {
        type: [String],
        validate: {
            validator: (value) => value.length <= 8,
            message: "The value exceeds the number of images allowed",
            kind: "maximages"
        }
    },
    PageGallery: {
        type: [String],
        validate: {
            validator: (value) => value.length <= 8,
            message: "The value exceeds the number of images allowed",
            kind: "maximages"
        }
    },
    Link: {
        type: Schema.Types.ObjectId,
        ref: "NavigationLinks"
    }
}, {
    timestamps: true
});

pagesSchema.pre("save", function (next) {
    this.PageTitleUrl = Utility.ConvertToUrlSafe(this.PageTitle);
    next();
});

pagesSchema.pre("update", function (next) {
    this.PageTitleUrl = Utility.ConvertToUrlSafe(this.PageTitle);
    next();
});

let Pages = mongoose.model("Pages", pagesSchema);
module.exports = Pages;
