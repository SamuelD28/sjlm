/*global cloudinary*/
import React, { Component } from 'react';
import { Button, Popup } from 'semantic-ui-react';

//Widget options used for initiating a cloudinary upload widget
const defaultOptions = {
    cloud_name: "dohwohspb",
    api_key: 378365725116554,
    maxFiles: 8,
    remove_header: true,
    language: "fr",
    googleApiKey: 'AIzaSyB_WKZp9us_1a_hNgUMR27fyiGtBkFdV4Y',
    searchByRights: true,
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

/**
 * Component used to handle the logic for uplaodign images
 * and media to a cloudinary account.
 */
class CloudinaryUpload extends Component {

    /**
     * Constructor that initiate new widget.
     * The constructor needs a method for updating
     * the interface when uploading images and needs
     * information about the input its linked to,=.
     */
    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props.input);
        this.updateStateInputs = this.props.updateStateInputs;

        //Specify if multiple images are allowed to be uploaded
        this.widgetOptions = Object.assign({},
                            defaultOptions,
                            {
                                multiple: this.state.multiple ,
                                clientAllowedFormats : this.state.allowedExt
                            });

        this.widget = new cloudinary.createMediaLibrary(
            this.widgetOptions,{
                insertHandler: (data) => {
                data.assets.forEach(asset => {
                    this.AddImageUrl(asset.secure_url);
                })
            }
        });
    }

    componentDidUpdate(next)
    {
        // console.log("updating");
        // console.log(next);
    }

    /**
     * Method for adding the uploaded images in the state. The actual
     * uploading is handled by the cloudinary widget.
     */
    AddImageUrl = async(url) => {

        //If multiples images are allowed
        let imagesArray = Array.from(this.state.value);

        if (this.state.multiple) {
            imagesArray.push(url);
        }
        //if only one image is allowed
        else {
            imagesArray.length = 0;
            imagesArray.push(url);
        }

        //Update the interface with the new data.
        await this.setState(Object.assign({}, this.state, { value: imagesArray }));
        this.updateStateInputs(this.state.name, { value: this.state.value });
    }

    /**
     * Method that display one or multiple thumbnails of all the uploaded
     * images.
     */
    DisplayThumbnailImages() {
        return this.state.value.map((url) =>(
            this.GenerateThumbnail(url)
        ));
    }

GenerateThumbnail = (url) =>
{
    let fileSrc;
    let isImage = false;

    if(url.endsWith("jpg") || url.endsWith("png") || url.endsWith("gif")){
        fileSrc = url
        isImage = true;
    }
    else if(url.endsWith("pdf"))
        fileSrc = "/tumb_pdf.svg"
    else if(url.endsWith("docx"))
        fileSrc = "/tumb_word.svg"
    else if(url.endsWith(".xlsx"))
        fileSrc = "/tumb_excel.svg"
    else if(url.endsWith("pptx"))
        fileSrc = "/tumb_pptx.svg"
    else
        fileSrc ="/tumb_unknow.svg";

    return(
    <Popup
        key={url}
        hoverable
        trigger={
            isImage
            ?<img
                className="uploads-thumbnails"
                alt={url}
                src={fileSrc}
                onClick={() => this.RemoveImage(url)}/>
            :<div
                className="uploads-thumbnails uploads-file-extension"
                alt={url}
                style={{backgroundImage : `url('${fileSrc}')`}}
                onClick={() => this.RemoveImage(url)}>
            </div>}
        content={
            <a target="_blank" href={url}>{url}
            </a>}
    />
    )
}

/**
 * Method for removing images from the state. The action
 * is send to the database only if the user submits
 * the form.
 */
RemoveImage = async(thumbnailUrl) => {

    let imagesArray = Array.from(this.state.value);
    let index = imagesArray.indexOf(thumbnailUrl);

    if (index !== -1) {
        imagesArray.splice(index, 1);
    }

    await this.setState(Object.assign({}, this.state, { value: imagesArray }));
    this.updateStateInputs(this.state.name, { value: this.state.value });
}

/**
 * Method to opens up the created cloudinary widget in the cconstructor.
 */
OpenCloudinaryWidget = (e) => {
    e.preventDefault();
    this.widget.show();
}

render() {
    if (this.state !== undefined)
        return (
            <div>
                    <label>{this.props.input.label}</label>
                    <Button
                        style={{float: "right"}}
                        circular
                        icon="add"
                        onClick={this.OpenCloudinaryWidget}/>
                    <div className="uploads-container" ref={this.uploadsThumbnails}>
                        {this.DisplayThumbnailImages()}
                    </div>
                </div>
        )
}
}

export default CloudinaryUpload;
