let mongoose = require("mongoose");

//----------------Model-------------//

let Schema = mongoose.Schema;
let membersSchema = new Schema({
    FirstName: {
        type: String,
        required: true,
        maxlength: 60,
        validate: {
            validator: (value) => !(/[\@\#\$\%\?\&\*\(\)]/g.test(value)),
            kind: 'invalid characters',
        },
    },
    LastName: {
        type: String,
        required: true,
        maxlength: 60,
        validate: {
            validator: (value) => !(/[\@\#\$\%\?\&\*\(\)]/g.test(value)),
            kind: 'invalid characters',
        },
    },
    Photo: {
        type: [String],
        validate: {
            validator: (value) => value.length === 1,
            kind: 'oneimage',
            message: 'Only one image is accepted'
        }
    },
    Occupation: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['mayor', 'mayore', 'advisor', 'advisore', 'employe', 'employee', 'director', 'directore']
    },
    PersonnalNote: {
        type: String,
        maxlength: 1000
    },
    Email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => (/^[a-zA-Z0-9_-]{1,}\@[a-zA-Z0-9]{1,}\.(com|ca|fr|gov|eu)$/g.test(value)),
            kind: 'invalid email',
            message: 'The format of the email is invalid'
        }
    },
    Phone: {
        type: String,
        validate: {
            validator: (value) => (/^[0-9]{3}\-[0-9]{3}-[0-9]{4}(\#[0-9]{1,}|)$/g.test(value)),
            kind: 'invalid phone',
            message: 'The format of the phone number is invalid'
        }
    }
});
let Members = mongoose.model("Members", membersSchema);

module.exports = Members;
