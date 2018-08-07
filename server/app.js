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
    dataSeed        = require("./utils/dataseed.js");

//----------------Initialisation-------------//

app.use(methodOverride("_method"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/media"));

//Connection to the database
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost:27017/sjlm", {useNewUrlParser : true}); //Get rid of a deprecatino warning. Must specified mongo db port in the url now

//----------------Routing-------------//

let NewsRT      = require(__dirname + "/routes/NewsRT.js");
let MembersRT   = require(__dirname + "/routes/MembersRT.js");
let PagesRt     = require(__dirname + "/routes/PagesRT.js");

app.use("/api/pages", PagesRt);
app.use("/api/members", MembersRT);
app.use("/api/news" , NewsRT);

//----------------Listener-------------//

app.listen(process.env.PORT, process.env.IP, (err) => {
    if(err)
        console.log("[An Error occured while starting the server.] \n ERROR : " + err);
    else
        console.log(`[-Server Started Successfully PORT:${process.env.PORT} -]`);
});