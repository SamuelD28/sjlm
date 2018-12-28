let mongoose = require("mongoose");

//----------------Model-------------//

let Schema = mongoose.Schema;
let membersSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Photo: {
        type: Array,
        required: true,
        test: true,
        validate: {
            validator: function (array) {
                return array.length === 1;
            }
        }
    },
    Occupation: {
        type: String,
        required: true
    },
    PersonnalNote: {
        type: String
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        default: "450-347-5446"
    }
});
console.log(membersSchema);
let Members = mongoose.model("Members", membersSchema);

module.exports = Members;
