/*  Author: Samuel Dube
    Date of creation: 201/07/16
    Date Last Modified: ******
    Description: Utility javascript file for the admin project
*/

let Utility = {},
    server  = require("log4js").getLogger('server'),
    error   = require("log4js").getLogger('error');

//Function that returns the correct error status based on the name
Utility.HTTPStatusError = function(statusName)
{
    switch(statusName){
        case "Success": return 200;
        case "TypeError": return 400;
        case "MongoNetworkError": return 500;
        case "MongoError": return 503;
        case "CastError": return 400; 
        default: return 404;
    }
}

//Function used to write the appropriate message inside the server.log file. Used for streamlining mainly
Utility.WriteInLog = function(type, content)
{
    switch(type){
        case "error":
            //TODO send an email when the server catches an error
            error.error(content);
            break;
        case "info":
            server.info(content); 
            break;
        case "warn":
            server.warn(content);
        break;
        case "trace":
            server.trace(content);
        break;
    }
}

Utility.GenerateResponse = function(success, res, data)
{
    let statusCode;
    
    if(data === null)
        throw new TypeError('The Database returned a null document');
    
    if(success)
        statusCode = Utility.HTTPStatusError("Success");
    else
        statusCode = Utility.HTTPStatusError(data.name);
            
    return res.status(statusCode).json({success: success, statusCode: statusCode, data: data});
}

module.exports = Utility;