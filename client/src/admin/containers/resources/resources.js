/*global cloudinary*/
//Initial Declaration and importation
import React, { Component } from 'react';
import Ajax from '../../../shared/ajax.js';
import {Utility} from '../../../shared/utility.js';

import {Button} from 'semantic-ui-react';

//Css Module
import adminStyles from '../index.module.css';

const defaultOptions = {
    cloud_name: "dohwohspb",
    uploadPreset: "sjlm_upload",
    api_key: 378365725116554,
    sources: [
        "local",
        "url",
        "image_search"
    ],
    inline_container: "#media-widget",
    maxFileSize : 10000000,
    maxFiles: 8,
    autoMinimize : true,
    language: "fr",
    googleApiKey: 'AIzaSyB_WKZp9us_1a_hNgUMR27fyiGtBkFdV4Y',
    searchByRights: true,
    defaultSource: "local",
    styles: {
        palette: {
            window: "#FFFFFF",
            sourceBg: "#f4f4f5",
            windowBorder: "#90a0b3",
            tabIcon: "#000000",
            inactiveTabIcon: "#555a5f",
            menuIcons: "#555a5f",
            link: "#37474F",
            action: "#339933",
            inProgress: "#0433ff",
            complete: "#339933",
            error: "#cc0000",
            textDark: "#000000",
            textLight: "#fcfffd"
        },
        fonts: {
            default: null,
            "sans-serif": {
                url: null,
                active: true
            }
        }
    }
}

const mediaOptions =
{
    cloud_name: "dohwohspb",
    api_key: 378365725116554,
    inline_container: ".media-widget",
    maxFiles: 8,
    multiple: true,
    remove_header: true,
    z_index: 1
}

//This Component is responsible for holding the state that will be modified by its crud components
class Resources extends Component {

    constructor(props)
    {
        super(props);


    }

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
        // Utility.AdjustFullHeight(document.querySelector(".media-widget"));
    }


    render() {
        return (
        <div className={adminStyles.adminPage}>
            <section className="section-row section-style">
                <div className="media-widget">
                </div>
            </section>
        </div>)
    }
}

export default Resources;
