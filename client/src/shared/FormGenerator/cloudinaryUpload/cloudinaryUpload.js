/*global cloudinary*/
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

//Widget options used for initiating a cloudinary upload widget
const defaultOptions = {
    cloudName: "dohwohspb",
    uploadPreset: "sjlm_upload",
    sources: [
        "local",
        "url",
        "image_search"
    ],
    googleApiKey: 'AIzaSyB_WKZp9us_1a_hNgUMR27fyiGtBkFdV4Y',
    searchByRights: true,
    showAdvancedOptions: false,
    cropping: false,
    defaultSource: "local",
    folder: "members_photos",
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
        this.widgetOptions = Object.assign({}, defaultOptions, { multiple: this.state.multiple });

        //Creates a new cloudinary upload widgets
        this.widget = new cloudinary.createUploadWidget(this.widgetOptions, (error, result) => {
            if (result && result.event === "success") {
                this.AddImageUrl(result.info.secure_url);
            }
        });
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
        return this.state.value.map((element, index) => (
            <img
                alt={"thumbnail " + index}
                key={index * Math.PI}
                className="uploads-thumbnails"
                src={element}
                onClick={
                    () => this.RemoveImage(element)
                }
            />
        ))
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
        this.widget.open();
    }

    render() {
        if (this.state !== undefined)
            return (
                <div>
                    <Form.Field>
                        <div className="container-thumbnails" ref={this.uploadsThumbnails}>
                            <span className="uploads-thumbnails button-thumbnails" onClick={this.OpenCloudinaryWidget}>
                                <i className="icon add"></i>
                            </span>
                            {this.DisplayThumbnailImages()}
                        </div>
                    </Form.Field>
                </div>
            )
    }
}

export default CloudinaryUpload;
