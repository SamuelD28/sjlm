//Initial Declaration and importation
import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';
import {Label} from 'semantic-ui-react';
import {Utility} from '../../../shared/utility.js';

//Css Module
import CssModules from 'react-css-modules';
import styles from './pages.module.css';
import adminStyles from '../index.module.css';

//Components
import PagesCard from '../../components/pagesCard/pagesCard.js';
import PagesCreate from '../../components/pagesCreate/pagesCreate.js';

//This Component is responsible for holding the state that will be modified by its crud components
class Pages extends CrudComponent{
    
    async componentDidMount()
    {
        await this.ReadInTempState("/api/pages");
        console.log(this.tempState.db);
    }
    
    DisplayPagesCard = () =>
    {
        let pagesCategory = new Set([]);
        if(this.tempState.db !== undefined){
            
            this.tempState.db.map((item, index)=>(
            pagesCategory.add(item.PageCategory)
            ));
            
            return(
            Array.from(pagesCategory).map((item ,index)=> (
                <div styleName="menuContainer">
                    <h1 styleName="menuTitle">{Utility.TranslatePageCategory(item)}</h1>
                    {this.InsertPagesInCategory(item)}
                </div>
            )))
        }
    }
    
    InsertPagesInCategory = (category) =>{
        
        let array = this.tempState.db.slice();
        return array.filter(element => element.PageCategory === category).map((item , index) =>(
        <PagesCard pages={item} key={item._id} UpdateTempState={this.UpdateTempState} RemoveFromTempState={this.RemoveFromTempState}/>
        ))
    }
    
    render(){
    return(
    <div className={adminStyles.adminPage}> 
        <section className="section-row">
            <div styleName="pagesLeftColumn columnContainer">
                <PagesCreate CreateInTempState={this.CreateInTempState}/>
                <button className="btn btn-primary"><i className="search icon"></i> Rechercher</button>
                <Label style={{margin: ".5vw"}} basic pointing="right" size="large">Nombres de Pages : 36</Label>
                <Label style={{margin: ".5vw"}} basic pointing="right" size="large">Nombre de Catégories : 7 </Label>
            </div>
            <div styleName="pagesRightColumn columnContainer">
            {this.DisplayPagesCard()}
            </div>
        </section>
    </div>
    )
    }
}

export default CssModules(Pages , styles, {allowMultiple: true, handleNotFoundStyleName: "log"});