let mongoose        = require("mongoose"),
    CategoryNews    = require("./CategoryNewsMD.js");

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
    DateFrom : {
        type : Date
    },
    DateTo : {
        type: Date
    },
    Files: {
        type: [String]
    },
    Description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

let News = mongoose.model("News", newsSchema);

module.exports = News;
