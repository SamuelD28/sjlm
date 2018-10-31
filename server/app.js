/*  Auteur: Samuel Dubé
    Date de création : 2018/07/09
    Date dernière mise en ligne: ******
    Description  : Point d'entrée principale pour le server du site web de la municipalité de Saint-Jacques-le-Mineur
*/


//----------------Dependencies-------------//

let express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methodOverride  = require("method-override"),
    // dataSeed        = require("./utils/dataseed.js"),
    cookieParser    = require("cookie-parser"),
    cloudinary      = require("cloudinary");

//----------------Initialisation-------------//

app.use(methodOverride("_method"))
app.use(bodyParser.json({limit : '10mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '10mb'}));
app.use(express.static(__dirname + "/media"));
app.use(cookieParser());
require("dotenv").config();
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET 
})

//Connection to the database
mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASE, {useNewUrlParser : true}); //Get rid of a deprecatino warning. Must specified mongo db port in the url now

//----------------Routing-------------//

let NewsRT      = require(__dirname + "/routes/NewsRT.js"),
    MembersRT   = require(__dirname + "/routes/MembersRT.js"),
    PagesRt     = require(__dirname + "/routes/PagesRT.js"),
    UserRT      = require(__dirname + "/routes/UserRT.js"),
    MenuRT      = require(__dirname + "/routes/MenuRT.js");

app.use("/api/pages", PagesRt);
app.use("/api/members", MembersRT);
app.use("/api/news" , NewsRT);
app.use("/api/user" , UserRT);
app.use("/api/menu", MenuRT);

//----------------Listener-------------//

app.listen(process.env.PORT, process.env.IP, (err) => {
    if(err)
        console.log("[An Error occured while starting the server.] \n ERROR : " + err);
    else
        console.log(`[-Server Started Successfully PORT:${process.env.PORT} -]`);
});