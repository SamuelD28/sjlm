/*global cloudinary*/
import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';

let widgetOptions = {
    cloudName: "dohwohspb",
    uploadPreset: "sjlm_upload",
    sources: [
        "local",
        "url",
        "image_search"
    ],
    googleApiKey: 'AIzaSyB_WKZp9us_1a_hNgUMR27fyiGtBkFdV4Y',
    searchByRights: true ,
    showAdvancedOptions: false,
    cropping: false,
    multiple: false,
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

class CloudinaryUpload extends Component{

    //To optimise
    constructor(props){
        super(props);

        widgetOptions.multiple = props.multiple;

        this.updateStateInputs = this.props.updateStateInputs;
        this.state = Object.assign({},this.props.input);
        this.widget = new cloudinary.createUploadWidget(widgetOptions, (error, result)=> {
            if(result && result.event === "success"){
                this.AddImageUrl(result.info.secure_url);
            }
        });
    }

    AddImageUrl = async(url) =>{
        if(this.state.value instanceof Array){
            let imagesArray = Array.from(this.state.value);
            imagesArray.push(url);
            await this.setState(Object.assign({}, this.state, {value: imagesArray}));
        }
        else{
            await this.setState(Object.assign({}, this.state, {value: url}));
        }
        this.updateState(this.state.name, {value : this.state.value});
    }

    DisplayThumbnailImages(){

        if(this.state.value.length > 0)
            return this.state.value.map((element, index) => (
                <img alt="" key={index} className="uploads-thumbnails" src={element} onClick={() => {this.RemoveImage(element)}} />
        ));
    }

    RemoveImage = async(thumbnailUrl) => {

        let index = this.state.value.indexOf(thumbnailUrl);

        if(index !== -1){
            let imagesArray = Array.from(this.state.value);
            imagesArray.splice(index, 1);
            await this.setState(Object.assign({}, this.state, {value: imagesArray}));
        }

        this.updateState(this.state.name, {value:  this.state.value});
    }

    OpenCloudinaryWidget = (e) =>{
        e.preventDefault();
        this.widget.open();
    }

    render(){
        if(this.state !== undefined)
        return(
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
    )}
}

export default CloudinaryUpload;