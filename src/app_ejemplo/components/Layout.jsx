import React from 'react';

const Layout = ({children}) => {
    return (<>
        <div className="m-5">
            {children}
        </div>
    </>);   
}

export default Layout;