/*global gapi*/
import React, {Component} from 'react';
import {Bar, Pie, Line} from 'react-chartjs-2';
import {Divider, Placeholder, Segment, Transition} from 'semantic-ui-react';

//Css Module import
import CSSModules from 'react-css-modules';
import styles from './home.module.css';
import generalStyle from '../index.module.css';

import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
moment.locale('fr');

class Home extends Component{
    
    state = {
        CLIENT_ID  :'776742658802-pbe2o74vfh5b1c1mltpmhabar3cv1scv.apps.googleusercontent.com',
        SCOPES : ['https://www.googleapis.com/auth/analytics.readonly'],
        PROFILE_ID : 'ga:188711212'
    };
    
    Authorize = async(event) =>{
        // Handles the authorization flow.
        // `immediate` should be false when invoked from the button click.
        var useImmdiate = event ? false : true;
        var authData = {
          client_id: this.state.CLIENT_ID,
          scope: this.state.SCOPES,
          immediate: useImmdiate
        };
        
        if(gapi.auth !== undefined){
            gapi.auth.authorize(authData, () => {
                gapi.client.load('analytics', 'v3').then(async() => {
                    
                    let usersWeekQuery ={
                        'dimensions': 'ga:date',
                        'start-date': '7daysAgo',
                        'end-date': 'today',
                        'metrics': 'ga:users'
                    };
                    
                    let usersMonthQuery = {
                        'dimensions': 'ga:month',
                        'start-date': '365daysAgo',
                        'end-date': 'yesterday',
                        'metrics': 'ga:users'
                    }
                    
                    let usersBrowserQuery = {
                        'dimensions': 'ga:browser',
                        'start-date': '365daysAgo',
                        'end-date': 'yesterday',
                        'metrics': 'ga:users'
                    }
                    
                    let usersCityQuery = {
                        'dimensions': 'ga:city',
                        'start-date': '365daysAgo',
                        'end-date': 'yesterday',
                        'metrics': 'ga:users'
                    }
                    
                    let usersSourceQuery = {
                        'dimensions': 'ga:source',
                        'start-date': '365daysAgo',
                        'end-date': 'yesterday',
                        'metrics': 'ga:users'
                    }
                    
                    let usersWeek =  await this.GetChartData(usersWeekQuery, 'dayweek');
                    let usersMonth =  await this.GetChartData(usersMonthQuery, 'daymonth');
                    let usersBrowser =  await this.GetChartData(usersBrowserQuery, 'daymonth');
                    let usersCity =  await this.GetChartData(usersCityQuery, 'daymonth');
                    let usersSource =  await this.GetChartData(usersSourceQuery, 'daymonth');
                    
                    this.setState({usersWeek : usersWeek, usersMonth: usersMonth, usersBrowser: usersBrowser, usersCity: usersCity, usersSource: usersSource});
                });
            });
        }
        else{
            setTimeout(() => this.Authorize(), 1000);
        }
    }
    
    componentDidMount(){
        this.Authorize();
    }
    
    GenerateColor = (data, type) =>{
        
        let colors = ['rgba(238, 89, 139, 1)','rgba(30, 221, 183, 1)','rgba(84, 119, 153, 1)','rgba(244, 210, 75,1)','rgba(86, 165, 217,1)'];
        let colorsBg = ['rgba(238, 89, 139, .5)','rgba(30, 221, 183, .5)','rgba(84, 119, 153, .5)','rgba(244, 210, 75,.5)','rgba(86, 165, 217,.5)'];
        
        if(type === undefined){
            if(data.length >= colors.length)
                return colors;
            else
                return colors.splice(0, data.length); 
        }
        else {
            if(data.length >= colorsBg.length)
                return colorsBg;
            else
                return colorsBg.splice(0, data.length); 
        }
    }
    
    GetChartData = (query, format) =>{
        query.ids = this.state.PROFILE_ID;
        return  gapi.client.analytics.data.ga.get(query)
                    .then((response) => {
                        let data = [];
                        let labels = [];
                        response.result.rows.map(function(row) { 
                            
                            if(format === "dayweek")
                                labels.push(moment(row[0]).format('dddd'));
                            else if(format === 'month')
                                labels.push(moment(row[0]).format('MMMM'));
                            else
                                labels.push(row[0]);
                                   
                            data.push(row[1]);
                        });
                        var chartData = {
                            labels : labels,
                            datasets : [
                              {
                                label: 'Utilisateur',
                                backgroundColor : this.GenerateColor(data, 'background'),
                                borderColor : this.GenerateColor(data),
                                data : data
                              }
                            ]
                        };
                    return chartData;
                });
    }
    
    DisplayPlaceholder = () =>{
        return  <Segment raised>
                        <Placeholder fluid>
                            <Placeholder.Image rectangular />
                        </Placeholder>
                    </Segment>
    }
    
    DisplayStatsHeader = (metrics, dimensions) =>{
        return <Transition
                    animation="fade right"
                    duration={1000}
                    transitionOnMount={true}>
                    <div styleName="statsHeader">
                        <h3 styleName="statsMetrics">{metrics}</h3>
                        <h2 styleName="statsDimensions">{dimensions}</h2>
                    </div>
                </Transition>
    }
    
    DisplayUsersCity = () =>{
        if(this.state.usersCity !== undefined)
            return  <div styleName="statsCard"> 
                        {this.DisplayStatsHeader('Utilisateurs','Par Ville')}
                        <div styleName="statistic">
                            <Pie data={this.state.usersCity} />
                        </div>
                    </div>
        else 
            return  this.DisplayPlaceholder();
    }
    
    DisplayUsersBrowsers = () =>{
        if(this.state.usersBrowser !== undefined)
            return  <div styleName="statsCard">
                        {this.DisplayStatsHeader('Utilisateurs','Par Navigateurs')}
                        <div styleName="statistic">
                            <Pie data={this.state.usersBrowser} />
                        </div>
                    </div>
        else 
            return  this.DisplayPlaceholder();
    }
    
    
    DisplayUsersWeek = () =>{
        if(this.state.usersWeek !== undefined)
            return  <div styleName="statsCard">
                        {this.DisplayStatsHeader('Utilisateurs','Par Semaine')}
                        <div styleName="statistic">
                            <Line data={this.state.usersWeek} />
                        </div>
                    </div>
        else 
            return  this.DisplayPlaceholder();
    }
    
    DisplayUsersMonth = () =>{
        if(this.state.usersMonth !== undefined)
            return  <div styleName="statsCard">
                        {this.DisplayStatsHeader('Utilisateurs','Par Mois')}
                        <div styleName="statistic">
                            <Bar data={this.state.usersMonth} />
                        </div>
                    </div>
        else 
            return  this.DisplayPlaceholder();
    }
    
    DisplayUsersSource = () =>{
        if(this.state.usersSource !== undefined)
            return  <div styleName="statsCard"> 
                        {this.DisplayStatsHeader('Utilisateurs','Par Source')}
                        <div styleName="statistic">
                            <Pie data={this.state.usersSource} />
                        </div>
                    </div>
        else 
            return  this.DisplayPlaceholder();
    }
    
    render(){
        return  <div className={generalStyle.adminPage}>
                    <section styleName="usersStats">
                        <section styleName="pieCharts">
                            {this.DisplayUsersBrowsers()}
                            {this.DisplayUsersCity()}
                            {this.DisplayUsersSource()}
                        </section>
                        <section styleName="barCharts">
                            {this.DisplayUsersWeek()}
                            {this.DisplayUsersMonth()}
                        </section>
                    </section>
                </div>
    }
}

export default CSSModules(Home, styles, {allowMultiple: true, handleNotFoundStyleName: "log"});