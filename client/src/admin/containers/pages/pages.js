//Initial Declaration and importation
import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';

//Css Module
import CssModules from 'react-css-modules';
import styles from './pages.module.css';
import adminStyles from '../index.module.css';

//Components
import PagesCard from '../../components/pagesCard/pagesCard.js'

//This Component is responsible for holding the state that will be modified by its crud components
class Pages extends CrudComponent{
    
    componentDidMount()
    {
        this.ReadInTempState("/api/pages");
    }
    
    DisplayPagesCard()
    {
        if(this.tempState.db !== undefined)
        {
            let array = this.tempState.db.slice();
            
            return( 
            array.map((item , index) =>(
            <PagesCard pages={item} key={item._id}/>
            )))
        }
    }
    
    render(){
    return(
    <div className={adminStyles.adminPage}> 
        <section>
        {this.DisplayPagesCard()}
        </section>
    </div>
    )
    }
}

export default CssModules(Pages , styles, {allowMultiple: true, handleNotFoundStyleName: "log"});