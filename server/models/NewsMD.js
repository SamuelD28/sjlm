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
        }
    },
    Important: {
        type: Boolean,
        required: false,
        default: false
    },
    Category: {
        type: String,
        lowercase: true,
        enum: ['events', 'activity', 'communicate', 'roadwork', 'jobs', 'public', 'council', 'verbal', 'other'] //should pull from the database instead
    },
    Images: {
        type: [String],
        validate: {
            validator: (value) => value.length <= 8,
            message: "The value exceeds the number of images allowed",
            kind: "maximages"
        }
    },
    Files: {
        type: [String],
        validate: {
            validator: (value) => (/^.*\.(pdf|pptx|docx|xlsx)$/g.test(value)) || value.length === 0,
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
