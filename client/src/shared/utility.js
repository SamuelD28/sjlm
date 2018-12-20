/*global fetch*/
/*  Auteur: Samuel Dube
    Date de creation: 2018/07/09
    Description: Fichie Utilitaire permettant de simplifier les operations repetitives
*/

//Namespace
let Utility = {};
let Forms = {};

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

//Function for verifying that a property inside a construtor comply to to the type and verfication function
Utility.VerifyProperty = function(input, type, verificationFuntion, functionArguments){
    if(input !== undefined)
    {
        if(input.constructor !== type)
            throw new TypeError("Input" + input + " does not match the type : " + type);

        if(verificationFuntion !== undefined && verificationFuntion instanceof Function)
        {
            if(!verificationFuntion(input, functionArguments))
                throw new TypeError("Verification failed for input : " + input);
        }
    }
}

//Verify that a number is between a range.
Utility.BetweenMinMaxNumber = function(num, {min = 0, max = 10})
{
    if(num > max || num < min)
        return false;

    return true;
}

//Verify that a string length is between a range
Utility.BetweenMaxMinLength = function(str, {min = 5, max = 10} ={})
{
    if(!Utility.MinimumLength(str, {min : min}) || !Utility.MaximumLength(str, {max : max}))
        return false;

    return true;
}

//Verify that a string length is of a minimum length
Utility.MinimumLength = function(str, {min = 5} = {})
{
    if(str.length < min)
        return false;

    return true;
}

//Verify that a string length is of a maximum lenght
Utility.MaximumLength = function(str , {max = 10} = {})
{
    if(str.length > max)
        return false;

    return true;
}

//Function that verify that a value is within a specified enumerations
Utility.IsWithinEnumeration = function(val, {enumeration = []} = {})
{
    if(!(enumeration instanceof Array))
        throw new TypeError("Enumration must be an array with values");

    if(enumeration.indexOf(val.toUpperCase()) === -1)
        return false;

    return true;
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
Forms.ChangeLabelText =function(target)
{
    try{
        let inputFile = target;
        let idAttribute = target.id;
        let inputs = Array.from(target.parentNode.childNodes);

        let label = inputs.find((child) =>{
                    let forAttribute = child.getAttribute("for");

                    if(forAttribute !== undefined)
                        return forAttribute === idAttribute;
                    else
                        return undefined;
                    });

        Utility.IsValuesUndefinedOrNull(label,inputFile); //break if no label is found

        label.textContent = target.files[0].name;
    }
    catch(err)
    {
        console.log(err.message);
    }
}

//Function that retrieve the proper value value from any input.
Forms.RetrieveValueFromInput = function(target, type)
{
    try{
        Utility.IsValuesUndefinedOrNull(target);
        let value;
        switch(type){
            case "checkbox":
            case "radio":
                    value = target.checked;
                    break;
            case "file":
                    Forms.ChangeLabelText(target);
                    value = target.files[0];
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

// Exports all the utility objects
export {Utility, Forms};