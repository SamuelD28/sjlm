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
        minlength: 6,
        maxlength: 60,
        validate: {
            validator: (value) => !(/[\@\#\$\%\?\&\*\(\)]/g.test(value)),
            kind: 'invalid characters',
        },
    },
    PageContent: {
        type: String,
        required: true
    },
    PageGallery: {
        type: [String],
        default: ['https://res.cloudinary.com/dohwohspb/image/upload/v1539711446/sjlm/6872080-canada-landscape.jpg'],
        validate: {
            validator: (value) => value.length <= 6,
            message: "The value exceeds the number of images allowed",
            kind: "maximages"
        }
    }
}, {
    timestamps: true
});

let Pages = mongoose.model("Pages", pagesSchema);
module.exports = Pages;
