//Initial Declaration and importation
import React from 'react';
import CrudComponent from '../../components/CrudComponent.js';
import {Label} from 'semantic-ui-react';

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
        <section className="section-row">
            <div styleName="pagesLeftColumn columnContainer">
                <PagesCreate />
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