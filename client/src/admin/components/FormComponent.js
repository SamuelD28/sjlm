import {Component} from 'react';
import {Ajax, Forms, Utility} from '../../shared/utility.js';

//This Component is responsible for the interactions with the database. Put/Delete/Post.
//This Component relies on the Crud Component. You need to pass the crud component methods that you want to do (Put, Delete, Post)
//as props to the child form component. See the Crud Component for more info on how to integrate it to a component.
class FormComponent extends Component{
    
    //Initialise an empty form data object that needs to be instantiate in the children component.
    constructor(props)
    {
        super(props);
        this.formData = {};
        this.state = ({disableSubmit: true});
        Utility.IsClassAbstract(this, FormComponent);
    }
    
    //Function that handles the change made in every input except the one in hte texte editor
    HandleChange = (e) =>
    {
        try{
            //Enable the submit button
            this.setState({disableSubmit: false});
            
            //Retrieve the value from the input
            let inputValue = Forms.RetrieveValueFromInput(e);
            
             //Verify that the returmed data contains something. Otherwise trows an error.
            Utility.IsValuesUndefinedOrNull(inputValue);
            
            //Append the value and input name to the form data object.
            Forms.AppendValueToObject(e.target.name, this.formData, inputValue);
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
    
    //Function that create the requested data in the db and then add it to the temporary state
    CreateInDb = async (url) =>
    {
        try{
            //Tells the loader to change its status
            this.ChangeActionState(1000, true, "Post");
            
            //Does a post request to the server
            let postedData = await Ajax.PostData(url, this.formData);
            
            //Verify that the returmed data contains something. Otherwise trows an error.
            Utility.IsValuesUndefinedOrNull(postedData, this.props.CreateInTempState); //*Create in tempstate comes from the crud component
            
            //Create the data in the temporary state
            this.props.CreateInTempState(postedData);
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
    
    //Function that update a resquested data in the db and then updates it in the temporary state
    UpdateInDb = async (url) =>
    {
        try{
            //Tells the loader component to change its status
            this.ChangeActionState(1000, true, "Put");
            
            //Does a put request to the server
            let updatedData = await Ajax.PutData(url, this.formData);
            
            //Verify that the returmed data contains something. Otherwise trows an error.
            Utility.IsValuesUndefinedOrNull(updatedData, this.props.UpdateTempState); //*Update Tempstate comes from the crud component
            
            //Updates the data in the temporary state
            this.props.UpdateTempState(updatedData);
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
    
    //Function that delete requested data from the db and then remove it from the temporary state
    DeleteInDb = (url) =>
    {
        try{
            //Tells the laoder component to change its status
            this.ChangeActionState(1000, true, "Delete");
            
            //Does a delete request on the server
            Ajax.DeleteData(url, this.formData._id);
            
            Utility.IsValuesUndefinedOrNull(this.props.RemoveFromTempState); //*Remove tempstates comes from the crud component
            
            //Remove the data from the temporary state
            setTimeout(() =>{
                this.props.RemoveFromTempState(this.formData);
            }, 2000);
        }
        catch(err)
        {
            console.log(err.message);
        }
    }
    
    //Function that modify the action state that interacts with the action loader component. User Feedback
    ChangeActionState = (latency, isOnGoing, type) => 
    {
        //Change the action state with the parameters
        this.setState({
            action: {
                latency: latency,
                isOnGoing: isOnGoing,
                type: type
            }
        });
    }
}

export default FormComponent;