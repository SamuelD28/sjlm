/*global cloudinary*/
import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import {Forms} from '../../../shared/utility.js';

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
        widgetOptions.cropping = props.cropping;
        this.formData = props.formData;
        this.uploadsThumbnails = React.createRef();
        this.Images = props.formData[props.linkedInput];
        this.enableSubmit = props.enableSubmit;
        this.state = "";
        this.widget = new cloudinary.createUploadWidget(widgetOptions, (error, result)=> {
            if(result && result.event === "success"){
                console.log(result);
                this.AppendUrlToFormData(result.info.secure_url);
            }
        });
    }
    
    componentDidMount()
    {
        this.setState({Images : this.Images});
    }
    
    AppendUrlToFormData = async(url) =>{
        
        if(this.props.multiple){
            if(this.Images === undefined)
                this.Images = [];
                
            this.Images.push(url);
        }
        else
            this.Images = url;            
        
        this.UpdateFormData();
    }
    
    DisplayThumbnailImages(){
        if(this.state.Images !== undefined && this.props.multiple)
        return this.state.Images.map((element, index) => (
           <img 
           alt=""
           key={index} 
           className="uploads-thumbnails" 
           src={element} 
           onClick={() => {this.RemoveImage(element)}} /> 
        ));
        else if(this.state.Images !== undefined)
        return(
            <img 
            alt=""
            className="uploads-thumbnails" 
            src={this.state.Images}/> 
        )
    }
    
    RemoveImage = async(thumbnailUrl) => {
        
        let index = this.Images.indexOf(thumbnailUrl);
        if(index !== -1)
        {
            if(this.Images.length > 1)
                this.Images.splice(index, 1);
        }
        this.UpdateFormData();
    }
    
    UpdateFormData = async() => {
        await this.setState({Images: this.Images});
        Forms.AppendValueToObject(this.props.linkedInput, this.formData, this.state.Images);
        this.enableSubmit();
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
                {this.DisplayThumbnailImages()}
                </div>
            </Form.Field>
        </div>
    )}
}

export default CloudinaryUpload;