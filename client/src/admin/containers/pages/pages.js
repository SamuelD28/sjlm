//Initial Declaration and importation
import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';
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
    
    componentDidMount()
    {
        this.ReadInTempState("/api/pages");
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
                <div styleName="menuContainer" key={index}>
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