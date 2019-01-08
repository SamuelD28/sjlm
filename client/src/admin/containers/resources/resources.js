/*global cloudinary*/
//Initial Declaration and importation
import React, { Component } from 'react';

//Css Module
import adminStyles from '../index.module.css';
const mediaOptions =
{
    cloud_name: "dohwohspb",
    api_key: 378365725116554,
    inline_container: ".media-widget",
    multiple: true,
    remove_header: true,
}

class Resources extends Component {

    state = {}

    componentDidMount()
    {
        this.widget = new cloudinary.createMediaLibrary(
            mediaOptions,{
                insertHandler: function (data) {
                data.assets.forEach(asset => { console.log("Inserted asset:",
                JSON.stringify(asset, null, 2)) })
            }
            });
        this.widget.show();
    }

    render() {
        return (
        <div className={adminStyles.adminPage} style={{padding: "0"}}>
            <section className="section-row section-style" style={{height: "-webkit-fill-available"}}>
                <div className="media-widget">
                </div>
            </section>
        </div>)
    }
}

export default Resources;
