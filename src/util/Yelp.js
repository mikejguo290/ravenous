
const Yelp = {
    search (term, location, sortBy){
        /* return a promise which will resolve to list of businesses. */
        const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
        return fetch(url);
    }
};

/* CORS - Cross Origin Resource Sharing 
    access of data and files across different origins. e.g. website and the api it calls. 
    the browsers implement a Same Origin Resource policy which allows sites to request 
    resources from server with the same origin but forbids cross origin resource sharing.
    details: 
    browser adds origin header to requests 
    server adds Access-Control-Allow-Origin header to its response 
    both headers needs to match
    otherwise browser will prevent response data from being shared with its client. 

    the solution is to FIRST, enable CORS on the server, SECOND, match url on the server to the client's url. 

    e.g. the spotify Jamming project avoided this because there was a requirement 
    to register app's url with spotify app account. */
