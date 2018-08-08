/*global fetch*/
/*  Auteur: Samuel Dube
    Date de creation: 2018/07/09
    Description: Fichie Utilitaire permettant de simplifier les operations repetitives
*/

//Namespace
let Utility = {};
let Forms = {};
let Ajax = {};

//Fonction that finds a series of elements and returns a proper array with it
Utility.FindAllAndCreateArray = function(element)
{
    return Array.prototype.slice.call(document.querySelectorAll(element));
}

//Fonction that adjust the height of an element to fill up the entire screen
Utility.AdjustFullHeight = function(elements)
{
    if(elements.constructor === Array){
        elements.forEach((element) => {
        element.style.height = window.innerHeight + "px";
    });
    }
    else{
        elements.style.height = window.innerHeight + "px";
    }
}

//Fonction that disable a certain input based on a checkbox checked value
Utility.DisableInputWithCheckbox = function(checkbox, input)
{
    //Temporaire, a changer rapidement pour eviter de faire planter la fonction
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
    
//Fonction that change the value of a checkbox to be true or false instead of on and off
Utility.ChangeCheckboxValueTrueFalse = function(event)
{
    event.target.value = event.target.checked;
}

//Fonction that prevent the default 
Utility.PreventFormSubmission = function(submitBtns)
{
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

//Function that open up the corresponding modal box
Utility.OpenModal = function(e)
{
    let modalID =  e.target.getAttribute("modal");
    let modalNews = document.getElementById(modalID);
    if(modalNews !== null)
    {
        modalNews.style.height = window.innerHeight + "px";
        modalNews.style.display = "flex";
    }
}

//Function that close the corresponding modal box
Utility.CloseModal = function(event, modalID)
{
    if(!event.defaultPrevented)
        event.preventDefault();
    
    
    let id = (modalID !== undefined)? modalID: event.target.getAttribute("modal");
    let modalBox = document.getElementById(id);
    if(modalBox !== null)
        modalBox.style.display = "none";
}

//Function that toggle the disable on a btn element
Utility.ChangeBtnState =function(e)
{
    let form = document.getElementById("form-" + this.tempState.initialData._id);
    let button = form.querySelector(".confirm");
    button.style.backgroundColor = "#02a9f4";  
    button.disabled = false;
}

Utility.IsValuesUndefinedOrNull = function()
{
    for(let i = 0 ; i <= arguments.length - 1 ; i++)
    {
        if(arguments[i] === undefined || arguments[i] === null)
            throw new Error(`~An Error Occured. The value you are trying to access is undefined or null`);
    }
}

Forms.ValidateFormInput = function(inputs)
{
    inputs.forEach((input) =>{
        if(!input.value && !input.disabled)
        {
            throw new Error("Input Validation Failed"); //A corriger, donner plus dinformations concernant l'erreur
        }
    });
}

Forms.CreateJsonObjectWithFormData = function(formData)
{
    let jsonObject = {};
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

//Function that toggle disable on a input
Forms.ToggleInput = function(event, input)
{
    try{
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
        
        if(label !== undefined || label !== null)
            label.textContent = inputFile.value;
        else
            throw new Error("Oops, looks like the label attribute for or input attribute id doesn't match.");
    }
    catch(err)
    {
        console.log(err.message);
    }
}

Forms.RetrieveValueFromInput = function(e)
{
    try{
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

Forms.AppendValueToObject = function(e, objectToAppend, valueToAppend)
{
    try{
        const keyToAppend = e.target.name;
        return objectToAppend[keyToAppend] =  valueToAppend;
    }
    catch(err){
        console.log("~An Error occured while appending the value to the object");
    }
}

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

Ajax.PostData = async function(url, formData)
{
    try{
        Utility.IsValuesUndefinedOrNull(url, formData);
        
        let postedData;
        let content = JSON.stringify(formData);
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

function CheckRequestStatus(res)
{
    if(!res.ok){
        throw new Error(`[-Error Proccessing the information. Status Code : ${res.status} -]`);
    }
    else{
        return res.json();
    }
}

export {Utility, Forms, Ajax};