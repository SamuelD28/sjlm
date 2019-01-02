let mongoose = require("mongoose");


let Schema = mongoose.Schema;
let menuSchema = new Schema({
    Title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    Principal: {
        type: Boolean,
        default: false
    },
    LinkTo: {
        type: String,
    },
    Icon: {
        type: String,
    },
    SubMenu: [{
        type: Schema.Types.ObjectId,
        ref: 'Menu',
   }],
    ParentMenu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
    }
});

let Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
