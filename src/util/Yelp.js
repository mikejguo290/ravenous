const apiKey = process.env.REACT_APP_YELP_API_KEY;
/* client side apps like React cannot store client secrets securely. These environment variables are 
exposed at build as they become part of the React app.
secrets must be secured on the back end and front-end should make calls to the back-end which then makes calls to
third party APIs and return data to the front-end client app.
*/
console.log(process.env.REACT_APP_YELP_API_KEY);
const Yelp = {
    search (term, location, sortBy){
        /* return a promise which will resolve to list of businesses. */
        const url = `https://cors-anywhere.herokuapp.com/
        https://api.yelp.com/v3/businesses/search?
        term=${term}
        &location=${location}
        &sort_by=${sortBy}`;

        return fetch(url,{
            headers: {
                'Authorization':`Bearer ${apiKey}`
            }
        }).then((response)=>{
            if(response.ok){
                return response.json();
            }
            throw new Error('request has failed!')
        }, networkError => console.log(networkError.message));
    }
};

/*  CORS - Cross Origin Resource Sharing 
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
    to register app's url with spotify app account. 
    
    We can bypass this restriction with an API called CORS Anywhere. 
    CORS Anywhere will take requests sent to its API endpoint, make them for the requesting app with 
    the proper CORS permissions, and then return the response back to the requesting app.

    In your own browser, visit https://cors-anywhere.herokuapp.com/corsdemo and click 
    “Request temporary access to the demo server”
    Back in your code, prepend the URL path you passed to the first argument in fetch() with the following:
    https://cors-anywhere.herokuapp.com/
    */
