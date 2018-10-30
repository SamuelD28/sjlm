import React from 'react';

const pageSocialStyle={
    alignItems: 'center',
    background: 'white',
    padding: '1vw 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '50%'
}

const pageSocialBtnStyle={
    boxSizing: 'border-box',
    margin: '1vw 0',
    textAlign: 'center',
    fontSize: '1.5em'
}

const SocialIconColumn = () =>
{
    return(
    <div style={pageSocialStyle}>
        <button className="btn btn-md btn-outline-info" style={pageSocialBtnStyle}><i className="icon facebook f"></i></button>
        <button className="btn btn-md btn-outline-info" style={pageSocialBtnStyle}><i className="icon twitter"></i></button>
        <button className="btn btn-md btn-outline-info" style={pageSocialBtnStyle}><i className="icon mail"></i></button>
    </div>    
    )
}

export default SocialIconColumn;