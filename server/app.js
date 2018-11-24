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
    dataSeed        = require("./utils/dataseed.js"), 
    cookieParser    = require("cookie-parser"),
    cloudinary      = require("cloudinary"),
    log4js          = require("log4js"),
    server          = log4js.getLogger("server"),
    Utility         = require("./utils/utility.js");

//------------Logging Initialisation-------------//

/*
    We can log different type of information using the built in api methods
    .trace()
    .debug()
    .info()
    .warn()
    .error()
    .fatal()
*/

log4js.configure({
 appenders: {
    console : {type: 'console'},
    server: { type: 'file', filename: 'server.log' },
    error: {type: 'file', filename: 'error.log'}
 },
 categories: {
    error: {appenders: ['error'], level: 'error'},
    server : {appenders: ['server'], level: 'info' },
    default: { appenders: ['console'], level: 'all' }
 }
});

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
});

//Connection to the database
mongoose.Promise = Promise;
mongoose.connect(process.env.DATABASE, {useNewUrlParser : true}); //Get rid of a deprecatino warning. Must specified mongo db port in the url now

//----------------Routing-------------//

/*
    Heres a basic list of http request status and their meaning. Use this list to give the 
    client meaningfull information concerning about the server status on the request made
    (102) : Processing request
    (200) : Success
    (201) : Request Success and creation fo document
    (301)(302) : Redirection
    (400) : Bad Request, Syntax Error
    (401) : User non authenticated
    (403) : Access denied
    (404) : Page Not Found
    (500)(503): Server Error
    (501) : Not Implemented
*/

let NewsRT              = require(__dirname + "/routes/NewsRT.js"),
    MembersRT           = require(__dirname + "/routes/MembersRT.js"),
    PagesRt             = require(__dirname + "/routes/PagesRT.js"),
    UserRT              = require(__dirname + "/routes/UserRT.js"),
    CategoryNewsRT      = require(__dirname + "/routes/CategoryNewsRT.js"),
    MenuRT              = require(__dirname + "/routes/MenuRT.js"),
    NavigationLinksRT   = require(__dirname + "/routes/NavigationLinksRT.js");

//Logs request to the server inside server.log
app.use(log4js.connectLogger(server,{
  level: 'auto',
  format: (req, res, format) => format(`:remote-addr - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"`)
}));
app.use("/api/pages", PagesRt);
app.use("/api/members", MembersRT);
app.use("/api/news" , NewsRT);
app.use("/api/user" , UserRT);
app.use("/api/menus", MenuRT);
app.use("/api/categorynews", CategoryNewsRT);
app.use("/api/navigationlinks", NavigationLinksRT);

//----------------Listener-------------//

app.listen(process.env.PORT, process.env.IP, (err) => {
    if(err){
        console.log("[An Error occured while starting the server.] \n ERROR : " + err);
        Utility.WriteInLog("info", "SERVER PROCESS STOPPED");
        Utility.WriteInLog("error", err);
        //TODO Restart the server when the process fails
    }
    else{
        console.log(`[-Server Started Successfully PORT:${process.env.PORT} -]`);
        Utility.WriteInLog("info", "SERVER PROCESS STARTED");
    }
});