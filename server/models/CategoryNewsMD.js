let mongoose    = require("mongoose"),
    Utility     = require("../utils/utility.js");


let Schema = mongoose.Schema;
let CategoryNewsSchema = new Schema({
    Title: {
        type: String,
        unique: 1,
        required: true,
        trim: true,
        maxLength: 25
    },
    UrlValue : {
        type: String,
        trim: true,
        maxLength: 50
    }
});

CategoryNewsSchema.pre("save", function(next){
    if(this.Title !== undefined)
    {
        this.UrlValue = this.Title.toLocaleLowerCase().replace(/[\s-]/g, "_").replace(/[éêëè]/g, "e").replace(/[àäâ]/g, "a");
        //Regex pour retirer les caracteres posant probleme dans un url
    }
    next();
});

let CategoryNews = mongoose.model("CategoryNews", CategoryNewsSchema);

module.exports = CategoryNews;
