import React from 'react';

const FileGallery = (props) =>
{
    return(
    <div>
        <h2>Fichiers joints</h2>
        <a href="http://www.saint-jacques-le-mineur.ca/assets/files/communaute/revue%20art%20et%20culture%20mrc.pdf" target="_blank" rel="noopener noreferrer">
            <button className="btn btn-outline-info btn-file">
                <span><i className="icon file"></i> Sjlm.pdf</span>
            </button>
        </a>
        <a href="http://www.saint-jacques-le-mineur.ca/assets/files/communaute/revue%20art%20et%20culture%20mrc.pdf" target="_blank" rel="noopener noreferrer">
            <button className="btn btn-outline-info btn-file">
                <span><i className="icon file"></i> Programmation.pdf</span>
            </button>
        </a>
        <a href="http://www.saint-jacques-le-mineur.ca/assets/files/communaute/revue%20art%20et%20culture%20mrc.pdf" target="_blank" rel="noopener noreferrer">
            <button className="btn btn-outline-info btn-file">
                <span><i className="icon file"></i> Horaire.pdf</span>
            </button>
        </a>
    </div>    
    )   
}

export default FileGallery;