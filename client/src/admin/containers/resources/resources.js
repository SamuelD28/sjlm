/*global cloudinary*/
//Initial Declaration and importation
import React, { Component } from 'react';

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

    componentDidMount() {
        this.widget = new cloudinary.createMediaLibrary(
            mediaOptions, {
                insertHandler: function (data) {
                    data.assets.forEach(asset => {
                        console.log("Inserted asset:",
                            JSON.stringify(asset, null, 2))
                    })
                }
            });
        this.widget.show();
    }

    render() {
        return (
            <div className="admin-page fill-height" style={{ padding: "0" }}>
                <section className="section-style fill-height" style={{ display: 'flex' }}>
                    <div className="media-widget" style={{ width: "100%" }}>
                    </div>
                </section>
            </div>)
    }
}

export default Resources;
