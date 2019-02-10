import React from 'react';
import {Button} from 'semantic-ui-react';

/**
 * 
 */
const DisplayFiles = (files) => {
    return files.map((file) => (
        <a href={file} target="_blank" rel="noopener noreferrer">
            <Button Basic>
                <i className="icon file"></i>{file.substring(file.lastIndexOf("/") + 1 ,file.length)} 
            </Button>
        </a>
        ))
}

const FileGallery = (props) => {
    return <div>
                <h2>Fichiers joints</h2>
                {DisplayFiles(props.files)}
            </div>
}

export default FileGallery;
