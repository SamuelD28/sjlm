/*global fetch*/
import {Utility} from './utility.js';

let Ajax = new Object();

//Ajax Get request. Needs a url passed as a parameter otherwise it throws an error
Ajax.GetData = async function(url)
{
    try{
        Utility.IsValuesUndefinedOrNull(url);
        let requestedData;
        await   fetch(url)
                .then(res =>{
                    return res.json();
                })
                .then(data =>{
                    requestedData = data;
                })
                .catch(err =>{
                    console.log(err.message);
                });
        return requestedData;
    }
    catch(err){
        console.log(err.message);
    }
}

//Ajax Post request. Needs a url and the data to post to the server otherwise it throws an error
Ajax.PostData = async function(url, dataToPost)
{
    try{
        Utility.IsValuesUndefinedOrNull(url, dataToPost);

        let postedData;
        let content = JSON.stringify(dataToPost);
        let bodyObject = {  method: "POST",
                            headers: {"Content-Type" : "application/json"},
                            body: content};

        await   fetch(url , bodyObject)
                .then((res) =>{
                    return res.json();
                })
                .then((data) =>{
                    postedData = data;
                })
                .catch((err) =>{
                    console.error(err.message);
                });

        return postedData;
    }
    catch(err){
        console.log(err.message);
    }
}

//Ajax Put Request. Needs a url and the new data to post. The new data needs to contain an id property since the server uses this.
Ajax.PutData = async function (url, newData)
{
    try{
        Utility.IsValuesUndefinedOrNull(url, newData);
        let updatedData;
        let ajaxContent = { method: "PUT",
                            headers: {"Content-Type" : "application/json"},
                            body: JSON.stringify(newData)};

        let fullUrl= (newData["_id"] === undefined)? url : url + newData["_id"];

        await   fetch(fullUrl, ajaxContent)
                .then((res) =>{
                    return res.json();
                })
                .then((data) =>{
                    updatedData = data;
                })
                .catch((err) =>{
                    console.log(err.message);
                });

        return updatedData;
    }
    catch(err){
        console.log(err.message);
    }
}

//Ajax Delete Request. Needs a url and an id since the server uses this.
Ajax.DeleteData = async function(url, id)
{
    try{
        Utility.IsValuesUndefinedOrNull(url, id);

        let ajaxContent = {method:"DELETE"};

        await   fetch(url +  id, ajaxContent)
                .then((res) =>{
                    return res.json();
                })
                .catch((err) =>{
                    console.log(err.message);
                });
    }
    catch(err){
        console.log(err.message);
    }
}

//Ajax function used to check the response status from the request. Throws an error if the status is not 200(success)
function CheckRequestStatus(res)
{
    try{
        // console.log(res.json());
        Utility.IsValuesUndefinedOrNull(res);
        if(!res.ok)
            throw new Error(`The request failed with a status code of : ${res.status}`);
        else
            return res.json();
    }
    catch(err){
        console.error(err);
    }
}

export default Ajax;