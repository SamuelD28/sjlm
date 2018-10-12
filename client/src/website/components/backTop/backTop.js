import React from 'react';

function NavigateToTop()
{
    let website = document.getElementById("websiteContent");
    website.scrollIntoView({block : "start", behavior : "smooth"});
}

const BackTop = () => {
    return(
    <button onClick={NavigateToTop} className="btn btn-md btn-primary back-top-btn"><i className="icon chevron up"></i></button>    
    )
}

export default BackTop;