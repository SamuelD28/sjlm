let mongoose = require("mongoose"),
    CategoryNews = require("./CategoryNewsMD.js");

//--------------Model-------------//
let newsSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100,
        validate: {
            validator: (value) => !(/[\@\#\$\%\?\&\*\(\)]/g.test(value)),
            kind: 'invalid characters',
        }
    },
    Important: {
        type: Boolean,
        required: false,
        default: false
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryNews',
        required: true
    },
    Images: {
        type: [String],
        validate: {
            validator: (value) => value.length <= 8,
            message: "The value exceeds the number of images allowed",
            kind: "maximages"
        }
    },
    Location: {
        type: String
    },
    DateFrom: {
        type: Date
    },
    DateTo: {
        type: Date
    },
    Files: {
        type: [String]
    },
    Description: {
        type: String
    }
}, {
    timestamps: true
});

let News = mongoose.model("News", newsSchema);

newsSchema.pre("save", function (next) {

    if (this.DateFrom === null) {
        this.DateFrom = this.createdAt;
    }

    next();
});

module.exports = News;
