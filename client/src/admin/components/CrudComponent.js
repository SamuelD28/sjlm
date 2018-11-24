//Initial Declaration and importation
import {Component} from 'react';
import {Utility} from '../../shared/utility.js';
import Ajax from '../../shared/ajax.js';

//This component is used on a container component. It holds the state that can be modified by its children
//components. The container only calls the ReadInTempState to initialise the data in he state. Its children holds
//the logic and receive the methods needed below as props. This component can be used in combination with form component which
//interacts with the database but its not necessary. See form component for more information.
class CrudComponent extends Component{

    //Initialise an empty state and temporary state. Apply the abstract constraits to the constructor.
    constructor(props)
    {
        super(props);
        this.state = {};
        this.tempState= {};
        Utility.IsClassAbstract(this, CrudComponent);
    }

    //Function that reads the data from the server and insert it in the temporary state.
    ReadInTempState = async (url) =>
    {
        try{
            Utility.IsValuesUndefinedOrNull(url);
            //GERER LE CAS OU AUCUNE ACTUALITER EST DANS LA BASE DE DONNER
            let request = await Ajax.GetData(url);
            this.tempState = {db: request.data.slice()};
            this.UpdateStateWithTempState();
        }
        catch(err){
            console.log(err.message);
        }
    }

    //Function that push a new object to the tempState array.
    CreateInTempState = (formData) =>
    {
        try{
            Utility.IsValuesUndefinedOrNull(formData, this.tempState.db);
            this.tempState.db.push(formData);
            this.UpdateStateWithTempState();
        }
        catch(err){
            console.log(err.message);
        }
    }

    //Function that removes an object from the tempState array.
    RemoveFromTempState = (formData) =>
    {
        try{
            Utility.IsValuesUndefinedOrNull(formData, this.tempState.db);
            let indexToRemoveAt = this.tempState.db.findIndex((element) =>(element._id === formData._id));
            this.tempState.db.splice(indexToRemoveAt, 1);
            this.UpdateStateWithTempState();
        }
        catch(err){
            console.log(err.message);
        }
    }

    //Function that updates an object in the tempstate array.
    UpdateTempState = (modifiedData) =>
    {
        try{
            Utility.IsValuesUndefinedOrNull(this.tempState.db, modifiedData);
            let oldData = this.tempState.db.findIndex((element) => {return element._id === modifiedData._id});
            this.tempState.db[oldData] = modifiedData;
            this.UpdateStateWithTempState();
        }
        catch(err){
            console.log(err.message);
        }
    }

    //Function that updates the state with the tmepstate data.
    UpdateStateWithTempState = () =>
    {
        this.setState(this.tempState);
    }
}

export default CrudComponent;