import React from 'react';


const DisplayFiles = (files) => {

    return files.map((file) => (
        <button className="btn btn-outline-info btn-file">
            <a href={file} target="_blank" rel="noopener noreferrer">
                    <i className="icon file"></i>{file.substring(file.lastIndexOf("/") + 1 ,file.length)} 
            </a>
        </button>))
}

const FileGallery = (props) => {
    return <div>
                <h2>Fichiers joints</h2>
                {DisplayFiles(props.files)}
            </div>
}

export default FileGallery;
