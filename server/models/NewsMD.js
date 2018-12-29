let mongoose = require("mongoose");

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
        },
    },
    Important: {
        type: Boolean,
        default: false
    },
    Category: {
        type: String,
        lowercase: true,
        enum: ['events', 'activity', 'communicate', 'roadwork', 'jobs', 'public', 'council', 'verbal', 'other']
    },
    Images: {
        type: [String],
        validate: {
            validator: (value) => value.length <= 6,
            message: "The value exceeds the number of images allowed",
            kind: "maximages"
        }
    },
    Files: {
        type: [String],
        validate: {
            validator: (value) => (/^.*\.pdf$/g.test(value)),
            message: "Invalid file type provided",
            kind: "invalid file"
        }
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
