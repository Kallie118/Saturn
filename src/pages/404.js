import React from 'react';

const NotFound = () => {
    return ( 
        <div className="container">
            <div className="row not-found-container">
                <div className="col text-center">
                    <img src="images/404.png" height="200px" alt="Error not found" /> <br />
                    <h2>Houston... we have a problem</h2>
                    <p className="text-primary">404 page not found.</p>
                </div>
            </div>
        </div>
    )
}

export default NotFound;