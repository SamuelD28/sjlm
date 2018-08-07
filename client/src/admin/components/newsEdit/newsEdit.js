import React, {Component} from 'react';
import {Utility} from '../../../shared/utility.js';

//Css module import
import CSSModules from 'react-css-modules';
import styles from './newsEdit.module.css';

class NewsEdit extends Component{
    
    constructor(props)
    { 
        super(props);
        let initialData = this.props.item;
        this.state = {initialData};
        this.tempState = {initialData};
        
        this.handleChange = this.handleChange.bind(this);
        this.UpdateNews = this.UpdateNews.bind(this);
    }
    
    handleChange(event)
    {
        let target = event.target;
        let type = target.type;
        let value;
        let name = target.name;
        
        switch(type){
            case "checkbox": 
                    value = target.checked; 
                    break;
            case "file":
                    value = target.files[0].name;
                    Utility.ChangeLabelText(event);
                    break;
            default:
                    value = target.value;
        }
        this.tempState.initialData[name] = value;
    }
     
    UpdateNews(event)
    {
        event.preventDefault();
        const modalID = event.target.getAttribute("modal");
        const idOfData = this.tempState.initialData._id;
        const modifiedData = this.tempState.initialData;
        
        try{
            //Create the request body to be sent to the api
            let ajaxContent      = { method: "PUT",
                                    headers: {"Content-Type" : "application/json"},
                                    body: JSON.stringify(modifiedData)}
                                    
            //Ajax Request
            fetch("/api/news/" + idOfData , ajaxContent)
            .then((res) =>{
                if(!res.ok)
                    throw new Error("An error occured while proccessing the data to the server");
                else{
                    return res;
                }
            })
            .then((data) =>{
                this.setState({data});
                Utility.CloseModal(event, modalID);
            })
            .catch((err) =>{
                console.log(err);
            })
        }
        catch(err)
        {
            console.log(err);
        }
    }
     
    render(){
    if(this.tempState.initialData !== undefined){
    return(
    <div className="modalContainer" id={this.tempState.initialData._id}>
        <div className="modalContent">
            <form onSubmit={this.UpdateNews} onChange={Utility.ChangeBtnState.bind(this)} styleName="editNews" id={`form-${this.tempState.initialData._id}`} modal={this.tempState.initialData._id}>
                <div styleName=" editNewsImg" className="img-bg" style={{backgroundImage: `url('/${this.tempState.initialData.Image}')`}}>
                </div>
                <input onChange={this.handleChange} styleName="titleInput" name="Title" required type="text" defaultValue={this.tempState.initialData.Title}/>
                <div styleName="importantGroup">
                    <input onChange={this.handleChange} styleName="importantInput" name="Important" type="checkbox"/>
                    <label>Actualitée Prioritaire</label>
                </div>
                <select onChange={this.handleChange} styleName="categoryInput" defaultValue={this.tempState.initialData.Category} name="Category" required>
                    <option>Évenement</option>
                    <option>Activité</option>
                    <option>Communiqué</option>
                    <option>Travaux Routiers</option>
                    <option>Offre Emploi</option>
                    <option>Avis Public</option>
                    <option>Séance du Conseil</option>
                    <option>Procès-Verbaux</option>
                    <option>Autres</option>
                </select>
                <div styleName="inputGroup datepublishedGroup">
                    <label>Date de Publication</label>
                    <input onChange={this.handleChange} styleName="datepublishedInput" name="DatePublihed" disabled type="date" defaultValue={`${this.tempState.initialData.DatePublished.year}-${this.tempState.initialData.DatePublished.month}-${this.tempState.initialData.DatePublished.day}`}/>
                </div>
                <div styleName="inputGroup datedueGroup">
                    <label>Date D'échéance</label>
                    <input onChange={this.handleChange} styleName="datedueInput" name="DateDue" type="date" required defaultValue={`${this.tempState.initialData.DateDue.year}-${this.tempState.initialData.DateDue.month}-${this.tempState.initialData.DateDue.day}`}/>
                </div>
                <div styleName="inputGroup imageInput">
                    <label styleName="fileLabel" htmlFor={`img${this.tempState.initialData._id}`} ><i className="far fa-image"></i>{this.tempState.initialData.Image}</label>                        
                    <input onChange={this.handleChange} styleName="fileInput" id={`img${this.tempState.initialData._id}`} name="Image" type="file"/>
                </div>
                <div styleName="inputGroup documentInput">
                    <label styleName="fileLabel" htmlFor={`document${this.tempState.initialData._id}`}><i className="far fa-file"></i>{this.tempState.initialData.Image}</label>
                    <input onChange={this.handleChange} styleName="fileInput" id={`document${this.tempState.initialData._id}`} name="File" type="file"/>
                </div>
                <textarea onChange={this.handleChange} styleName="descriptionInput" name="Description" type="textarea" required value={this.tempState.initialData.Description}></textarea>
                <button onClick={Utility.CloseModal} modal={this.tempState.initialData._id} className="cancel btn btn-red btn-md"><i className="fas fa-ban"></i> Annuler</button>
                <button className="btn btn-md confirm" disabled><i className="fas fa-save"></i> Enregistrer</button>
            </form>
        </div>
    </div>)}
    }
}

export default CSSModules(NewsEdit, styles, {allowMultiple: true, handleNotFoundStyleName: "log" });