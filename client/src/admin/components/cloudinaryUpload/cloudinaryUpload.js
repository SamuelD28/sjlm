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
    googleApiKey: "<image_search_google_api_key>",
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
        widgetOptions.cropping = props.cropping;
        this.uploadsThumbnails = React.createRef();
        
        this.formData = props.formData;
        this.widget = new cloudinary.createUploadWidget(widgetOptions, (error, result)=> {
            if(result && result.event === "success"){
                console.log(result);
                this.AppendUrlToFormData(result.info.secure_url);
            }
        });
    }
    
    componentDidMount()
    {
        if(this.props.gallery !== undefined)
            this.PopulateThumbnails(this.props.gallery);
    }
    
    AppendUrlToFormData = (url) =>{
        
        if(this.props.multiple){
            if(this.formData[this.props.linkedInput] === undefined)
                this.formData[this.props.linkedInput] = [];
                
            this.formData[this.props.linkedInput].push(url);
        }
        else{
            this.formData[this.props.linkedInput] = url;            
        }
        
        console.log(this.formData);
        this.PopulateThumbnails(this.formData[this.props.linkedInput]);
    }
    
    PopulateThumbnails = (thumbnailsUrl) =>{
        
        if(thumbnailsUrl.constructor === Array)
            thumbnailsUrl.forEach((thumbnail) =>{this.GenerateThumbnails(thumbnail)});
        else
            this.GenerateThumbnails(thumbnailsUrl);
    }
    
    GenerateThumbnails = (url) => {
        let image = document.createElement("img");
        image.src = url;
        image.className = "uploads-thumbnails";
        this.uploadsThumbnails.current.append(image);
    }
    
    OpenCloudinaryWidget = (e) =>{
        e.preventDefault();
        this.widget.open();
    }
    
    render(){
        return(
        <div>
            <Form.Field>
                <button className="btn btn-outline-info" onClick={this.OpenCloudinaryWidget}>
                    <i className="icon image"></i> {this.props.buttonText}
                </button>
            </Form.Field>
            <Form.Field>
                <div className="container-thumbnails" ref={this.uploadsThumbnails}>
                    
                </div>
            </Form.Field>
        </div>
    )}
}

export default CloudinaryUpload;