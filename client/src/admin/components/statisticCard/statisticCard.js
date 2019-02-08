import React, {Component} from 'react';
import {Divider, Loader} from 'semantic-ui-react';
import {Bar, Pie, Line, Doughnut} from 'react-chartjs-2';

import styles from './statisticCard.module.css';
import CSSModules from 'react-css-modules';

class StatisticCard extends Component{
    
    state = {}
    
    componentDidMount(){
    }
    
    DisplayStatsHeader = () =>{
        return  <div styleName="statsHeader">
                    <h3 styleName="statsMetrics">{this.props.metrics}</h3>
                    <h2 styleName="statsDimensions">{this.props.dimensions}</h2>
                    <Divider />
                    <span><i className="icon clock outline"></i> dernière mise à jour</span>
                </div>
    }
    
    DisplayChart = () =>{
            
        if(this.props.chart === "doughnut")
            return <Doughnut data={this.props.data} />
        else if(this.props.chart === "pie")
            return <Pie data={this.props.data}/>
        else if(this.props.chart === "bar")
            return <Bar data={this.props.data} />
        else
            return <Line data={this.props.data} />
            
    }
    
    render(){
        if(this.props.data !== undefined)
            return  <div styleName="statsCard">
                        <div style={{padding: ".25vw"}}>
                            {this.DisplayChart()}
                        </div>
                        {this.DisplayStatsHeader()}
                    </div>
        else
            return <div styleName="statsCard" style={{height: '22.5vw'}}>
                        <Loader active={true} />
                    </div>
    }
    
}

export default CSSModules(StatisticCard, styles, {allowMultiple: true, handleNotFoundStyleName: 'log'});