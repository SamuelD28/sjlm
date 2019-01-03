let mongoose = require("mongoose");

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
    PageGallery: {
        type: [String],
        validate: {
            validator: (value) => value.length <= 8,
            message: "The value exceeds the number of images allowed",
            kind: "maximages"
        }
    }
}, {
    timestamps: true
});

let Pages = mongoose.model("Pages", pagesSchema);
module.exports = Pages;
