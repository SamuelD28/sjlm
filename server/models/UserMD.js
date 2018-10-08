let bcrypt      = require("bcrypt"),
    mongoose    = require("mongoose"),
    jwt         = require("jsonwebtoken");


const SALT_I = 10; //Utiliser pour generer des mots de passe
require("dotenv").config(); //Utiliser pour acceder aux variables environment
    
let Schema = mongoose.Schema;
let userSchema = new Schema({
    firstName:{
        type: String,
        required: true,
        maxLength: 100,
        minLenght: 4,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        maxLength: 100,
        minLenght: 4,
        trim: true
    },
    username: {
        type: String,
        required:true,
        maxLength: 100,
        minLenght: 6,
        trim: true
    },
    password: {
        type: String,
        required:true,
        minLength: 5
    },
    email: {
        type: String,
        unique: 1,
        required: true,
        trim: true
    },
    role:{
        type: Number,
        default: 0
    },
    token:{
        type: String,
        default: ""
    }
});

//Method executed before saving the password in the database
userSchema.pre('save' , function(next){
    
    //Contient le user en cours de modification
    var user = this;
    
    //Condition qui verifie si on modifie le mot de passe, sinon ne genere pas de hash
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err)
                return next(err);
            else
                bcrypt.hash(user.password, salt, function(err, hash){
                    if(err)
                        return next(err);
                    else{
                        user.password = hash;
                        next();
                    }
                });
        });
    }
    else{
        next();
    }
});

//Extension methods
userSchema.methods.comparePassword = function(candidatePassword, cb){
    
    //Contient le user en cours de modification
    var user = this;
    
    bcrypt.compare(candidatePassword, user.password, function(err, isMatch){
        if(err){
            return cb(err);
        }
        cb(null, isMatch);
    });
};

userSchema.methods.generateToken = function(cb){
    
    //Contient le user en cours de modification
    var user = this;
    
    //Genere un token avec le user id et le SECRET
    var token = jwt.sign(user._id.toString(16), process.env.SECRET);
    user.token = token;
    
    //Sauvegarde les modifications dans la bd
    user.save(function(err, user)
    {
        if(err)
            return cb(err);
        
        cb(null, user);    
    });
};

userSchema.statics.findByToken = function(token, cb){
    
    //Contient le user en cours de modification
    var user = this;
    
    jwt.verify(token, process.env.SECRET, function(err, decode)
    {
        user.findOne({"_id": decode,"token": token}, function(err, user)
        {
            if(err)
                return cb(err);
            cb(null, user);
        });
    });
}

let User = mongoose.model("User" , userSchema);

module.exports = User;