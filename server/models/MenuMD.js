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
    Link: {
        type: Schema.Types.ObjectId,
        ref: "NavigationLinks"
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
        validate: {
            validator: (value) => !(value === null),
            kind: "ObjectID"
        }
    },
    Hide : {
        type: Boolean,
        default: false
    }
});

let Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
