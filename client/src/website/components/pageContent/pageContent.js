import React from 'react';

const pageContentStyle = {
    margin: '3vw 0'
}

const CreateMarkup = (content) =>
{
    return {__html: content}
}

const PageContent = (props) =>
{
    return(
    <div style={pageContentStyle} dangerouslySetInnerHTML={CreateMarkup(props.content)}></div>    
    )
}

export default PageContent;