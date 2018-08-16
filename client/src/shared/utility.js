/*global fetch*/
/*  Auteur: Samuel Dube
    Date de creation: 2018/07/09
    Description: Fichie Utilitaire permettant de simplifier les operations repetitives
*/

//Namespace
let Utility = {};
let Forms = {};
let Ajax = {};

Utility.TranslatePageCategory = function(pageCategory)
{
    let translatedContent;
        switch(pageCategory)
        {
            case "city": translatedContent = "Découvrir la ville"; break;
            case "administration": translatedContent = "Administration"; break;
            case "services": translatedContent = "Les Services"; break;
            case "cultures": translatedContent = "Cultures et loisirs"; break;
            case "finances": translatedContent = "Finances"; break;
            case "news": translatedContent = "Actualitées"; break;
            case "others": translatedContent = "Autres"; break;
            default: translatedContent = "Oops, erreur"; break;
        }
        return translatedContent;
}

//Fonction that finds a series of elements and returns a proper array with it
Utility.FindAllAndCreateArray = function(element)
{
    return Array.prototype.slice.call(document.querySelectorAll(element));
}

//Fonction that adjust the height of an element to fill up the entire screen
Utility.AdjustFullHeight = function(elements)
{
    try{
        Utility.IsValuesUndefinedOrNull(elements);
        if(elements.constructor === Array){
            elements.forEach((element) => {
            element.style.height = window.innerHeight + "px";
        });
        }
        else{
            elements.style.height = window.innerHeight + "px";
        }
    }
    catch(err){
        console.log(err.message);
    }
}

//Fonction that disable a certain input based on a checkbox checked value
Utility.DisableInputWithCheckbox = function(checkbox, input)
{
    try{
        Utility.IsValuesUndefinedOrNull(checkbox, input);
        if(checkbox.constructor === Array)
        {
            input[0].disabled = true;
            checkbox.forEach((element) => {
                element.addEventListener("click" , function(event){
                    Utility.ToggleInput(event, input[0]);
                });      
            });
        }
        else{
            input.disabled = true;
            checkbox.addEventListener("click" , function(event){
                Utility.ToggleInput(event, input);
            });
        }
    }
    catch(err){
        console.log(err.message);
    }
}
    
//Fonction that change the value of a checkbox to be true or false instead of on and off
Utility.ChangeCheckboxValueTrueFalse = function(event)
{
    try{
        Utility.IsValuesUndefinedOrNull(event);
        event.target.value = event.target.checked;
    }
    catch(err){
        console.log(err.message);
    }
}

//Fonction that prevent the default 
Utility.PreventFormSubmission = function(submitBtns)
{
    try{
        Utility.IsValuesUndefinedOrNull(submitBtns);
        if(submitBtns.constructor === Array)
        {
            submitBtns.forEach((btn) =>{
                btn.addEventListener("click" , function(e){
                    e.preventDefault();
                }); 
            });
        }
        else
        {
            submitBtns.addEventListener("click" , function(e){
                e.preventDefault();
            });    
        }
    }
    catch(err){
        console.log(err.message);
    }
}

//Function that open up the corresponding modal box
Utility.OpenModal = function(e)
{
    try{
        let modalID =  e.target.getAttribute("modal");
        let modalNews = document.getElementById(modalID);
        
        Utility.IsValuesUndefinedOrNull(modalID, modalNews);
        
        modalNews.style.height = window.innerHeight + "px";
        modalNews.style.display = "flex";
    }
    catch(err){
        console.log(err.message);
    }
}

//Function that close the corresponding modal box
Utility.CloseModal = function(event, modalID)
{
    try{
        
        if(!event.defaultPrevented)
            event.preventDefault();
        
        let id = (modalID !== undefined)? modalID: event.target.getAttribute("modal");
        let modalBox = document.getElementById(id);
        
        Utility.IsValuesUndefinedOrNull(modalBox);
        
        modalBox.style.display = "none";
    }
    catch(err){
        console.log(err.message);
    }
}

//Function that the class was instantiated via abstraction and not directly. Otherwise throws an error that we purposely dont catch.
Utility.IsClassAbstract = function(context, classObject)
{
    if(context.constructor === classObject){
        throw new Error("~Error : This is an abstract class, you can't instantiate it directly.");
    }
}

//Function that toggle the disable on a btn element
Utility.ChangeBtnState =function(e)
{
    try{
        let form = document.getElementById("form");
        
        Utility.IsValuesUndefinedOrNull(form);
        
        let button = form.querySelector(".confirm");
        button.style.backgroundColor = "#02a9f4";  
        button.disabled = false;
    }
    catch(err){
        console.log(err.message);
    }
}

//Function that takes all the parameters passed to the function and check if any is null or undefined. Throw an error if so.
Utility.IsValuesUndefinedOrNull = function()
{
    for(let i = 0 ; i <= arguments.length - 1 ; i++)
    {
        if(arguments[i] === undefined || arguments[i] === null)
            throw new Error(`~Warning : The value you are trying to access is undefined or null`);
    }
}

// Function that gatters all the required inputs inside a form and verify that they have information in them
Forms.ValidateFormInput = function(inputs)
{
    try{
        Utility.IsValuesUndefinedOrNull(inputs);
        inputs.forEach((input) =>{
            if(!input.value && !input.disabled)
            {
                throw new Error("Input Validation Failed"); //A corriger, donner plus dinformations concernant l'erreur
            }
        });
    }
    catch(err){
        console.log(err);
    }
}

//Function that creates a json object with a form data object passed as a parameter.
Forms.CreateJsonObjectWithFormData = function(formData)
{
    try{
        let jsonObject = {};
        
        Utility.IsValuesUndefinedOrNull(formData);
        
        formData.forEach(function(value, key){
                if(key === "Image" || key === "File")
                {
                    if(value.name)
                    jsonObject[key] = value.name;  
                }
                else
                    jsonObject[key] = value;    
            });  
        return JSON.stringify(jsonObject);
    }
    catch(err){
        console.log(err);
    }
}

//Function that toggle disable on a input
Forms.ToggleInput = function(event, input)
{
    try{
        Utility.IsValuesUndefinedOrNull(event, input);
        
        let linkedInputAttribute = event.target.getAttribute("linkedto");
        let parentInput = event.target.parentNode;
        let childrens = Array.from(parentInput.childNodes);
        
        //Try to find the input based on the linkedto attribute placed on the checkbox.
        let linkedInput = childrens.find((child) => {
            if(child.name !== undefined)
                return child.name.toLowerCase() === linkedInputAttribute.toLowerCase(); //Puts everything in lower case. That way it forgives basic typos mistakes
            else
                return undefined;
        });
        
        if(linkedInput !== undefined || linkedInput !== null)
            linkedInput.disabled = !event.target.checked;
        else
            throw new Error("Oops, looks like you forgot to use the linkedto attribute to link the desired input"); // Returns an erro if nothing is found
    }
    catch(err)
    {
        console.log(err.message);
    }
}

//Function that change the file label text to match the input file it isbound to
Forms.ChangeLabelText =function(event)
{
    try{
        let inputFile = event.target;
        let idAttribute = event.target.id;
        let inputs = Array.from(event.target.parentNode.childNodes);
        
        let label = inputs.find((child) =>{
                    let forAttribute = child.getAttribute("for");
                        
                    if(forAttribute !== undefined)
                        return forAttribute === idAttribute;
                    else
                        return undefined;
                    });
        
        Utility.IsValuesUndefinedOrNull(label,inputFile); //break if no label is found
        
        label.textContent = event.target.files[0].name;
    }
    catch(err)
    {
        console.log(err.message);
    }
}

//Function that retrieve the proper value value from any input.
Forms.RetrieveValueFromInput = function(e)
{
    try{
        Utility.IsValuesUndefinedOrNull(e);
        
        let target = e.target;
        let type = target.type;
        let value;
        
        switch(type){
            case "checkbox": 
                    value = target.checked; 
                    break;
            case "file":
                    Forms.ChangeLabelText(e);
                    value = target.files[0].name;
                    break;
            default:
                    value = target.value;
        }
        return value;
    }
    catch(err){
        console.log("~An Error occured while extracting data from the form");
    }
}

//Function that creates a key to an object passed as a paraemter with the value passed as a parameter
Forms.AppendValueToObject = function(keyToAppend, objectToAppend, valueToAppend)
{
    try{
        Utility.IsValuesUndefinedOrNull(objectToAppend, valueToAppend);
        return objectToAppend[keyToAppend] =  valueToAppend;
    }
    catch(err){
        console.log(err.message);
    }
}

//Ajax Get request. Needs a url passed as a parameter otherwise it throws an error
Ajax.GetData = async function(url)
{
    try{
        Utility.IsValuesUndefinedOrNull(url);
        let requestedData;
        await   fetch(url)
                .then(res =>{
                    return CheckRequestStatus(res);
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
                    return CheckRequestStatus(res);
                })
                .then((data) =>{
                    postedData = data;
                })
                .catch((err) =>{
                    console.log(err.message);   
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
                                
        await   fetch(url + newData["_id"] , ajaxContent)
                .then((res) =>{
                    return CheckRequestStatus(res);
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
                    return CheckRequestStatus(res);
                })
                .then((data) =>{
                    console.log("Deleted Data")
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
        Utility.IsValuesUndefinedOrNull(res);
        if(!res.ok)
            throw new Error(`[-Error Proccessing the information. Status Code : ${res.status} -]`);
        else
            return res.json();
    }
    catch(err){
        console.log(err);
    }
}

// Exports all the utility objects
export {Utility, Forms, Ajax};