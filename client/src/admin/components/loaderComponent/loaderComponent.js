import React, {Component} from 'react';
import {Dimmer, Message, Icon, Loader} from 'semantic-ui-react';
import {Utility} from '../../../shared/utility.js';

class LoaderComponent extends Component{
    
    //Function called everytime the action state is changed in the parent component. Need to optimise, not sexy.
    componentDidUpdate()
    {
        if(this.props.action !== undefined && this.props.action !== null)
        {
            if(this.props.action.isOnGoing && this.state.disableLoader){
                this.HandleActions();
            }
        }
    }
    
    //Initial State declaration. Used for user interaction
    state = 
    ({
        disableLoader: true,
        displayDimmer: false,
        status : {
            isHidden: true,
            message: ""
        },
        statusType: { 
            info: false,
            warning :false,
            negative: false,
            positive: false
        }
    });
    
    //Function that display the loader when a new action is commited.
    ToggleLoader()
    {
         this.setState({
            disableLoader: !this.state.disableLoader
        });
    }
    
    //Function that toggle the display of the dimmer
    ToggleDimmer()
    {
        this.setState({
            displayDimmer: !this.state.displayDimmer
        });
    }
    
    //Function that determine what to do based on the action type passed as a props
    HandleActions()
    {
        this.ToggleDimmer();
        this.ToggleLoader();
        
        switch(this.props.action.type.toUpperCase()){
            case "POST": this.DisplayAction("Données sauvegardées", "positive");break;
            case "PUT": this.DisplayAction("Modifications sauvegardées", "info"); break;
            case "DELETE" : this.DisplayAction("Suppression effectuée", "negative"); break;
            default: throw new Error("~Error : The requested action is not handled. Action : " + this.props.action.type);
        }
    }
    
    //Function that display the action ui to the user.
    DisplayAction(actionMesage, actionType)
    {
        setTimeout(() =>{
            this.props.action.isOnGoing = false;
            this.ToggleLoader();
            this.HandleStatusDisplay(actionMesage, actionType);
            this.ResetActions();
        }, this.props.action.latency);
    }
    
    //Function that reset the state used for user interaction.
    ResetActions()
    {
        setTimeout(() => {
            this.setState({
                disableLoader: true,
                displayDimmer: false,
                status : {
                    isHidden: true,
                    message: ""
                },
                statusType: { 
                    info: false,
                    warning :false,
                    negative: false,
                    positive: false
                }
            });
        }, 1000);
    }
    
    //Function that display a status message concerning the different operation status. This function works in correlation with the Message Component inherited from semantic UI.
    HandleStatusDisplay(statusMessage, statusType)
    {
        try{
            Utility.IsValuesUndefinedOrNull(statusMessage, statusType);
            
            switch(statusType)
            {
                case "warning": this.setState({statusType: {warning: true}});break;
                case "negative": this.setState({statusType: {negative: true}});break;
                case "positive": this.setState({statusType: {positive: true}});break;
                case "info": this.setState({statusType: {info: true}});break;
                default: throw new Error("~You need to provide a status type when using the message component");
            }
            
            this.setState({
                status: {
                    message : statusMessage,
                    isHidden: false
                }
            });
        }
        catch(err){
            console.log(err.message);
        }
    }
    
    render(){
    return(
    <Dimmer active={this.state.displayDimmer} inverted>
            <Loader disabled={this.state.disableLoader} size="large"/>
            <Message 
                hidden={this.state.status.isHidden} 
                size="large"
                info={this.state.statusType.info}
                warning={this.state.statusType.warning}
                positive={this.state.statusType.positive}
                negative={this.state.statusType.negative}>
                <Message.Header>
                    <Icon name='check' />
                    {this.state.status.message}
                </Message.Header>
            </Message>
    </Dimmer>
    )}
}

export default LoaderComponent;